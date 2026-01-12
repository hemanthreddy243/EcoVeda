import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Activity, Heart, Timer, MapPin, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface FitnessData {
  steps: number;
  calories_burned: number;
  active_minutes: number;
  distance_km: number;
  heart_rate?: number;
}

interface FitnessGoals {
  daily_steps_goal: number;
  daily_calories_goal: number;
  daily_active_minutes_goal: number;
}

interface FitnessHistory {
  date: string;
  steps: number;
  calories_burned: number;
  active_minutes: number;
  distance_km: number;
  heart_rate: number;
}

export default function FitnessTracker() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const [user, setUser] = useState<any>(null);
  const [fitnessData] = useState<FitnessData>({
    steps: 8457,
    calories_burned: 420,
    active_minutes: 45,
    distance_km: 6.2,
    heart_rate: 72,
  });
  const [goals] = useState<FitnessGoals>({
    daily_steps_goal: 10000,
    daily_calories_goal: 500,
    daily_active_minutes_goal: 60,
  });
  const [history] = useState<FitnessHistory[]>([
    {
      date: '2024-01-01',
      steps: 8765,
      calories_burned: 450,
      active_minutes: 50,
      distance_km: 6.5,
      heart_rate: 75,
    },
    {
      date: '2024-01-02',
      steps: 9234,
      calories_burned: 480,
      active_minutes: 55,
      distance_km: 6.8,
      heart_rate: 72,
    },
    {
      date: '2024-01-03',
      steps: 7890,
      calories_burned: 400,
      active_minutes: 45,
      distance_km: 5.9,
      heart_rate: 70,
    },
    {
      date: '2024-01-04',
      steps: 10234,
      calories_burned: 520,
      active_minutes: 60,
      distance_km: 7.5,
      heart_rate: 78,
    },
    {
      date: '2024-01-05',
      steps: 8457,
      calories_burned: 420,
      active_minutes: 45,
      distance_km: 6.2,
      heart_rate: 72,
    },
    {
      date: '2024-01-06',
      steps: 9678,
      calories_burned: 490,
      active_minutes: 58,
      distance_km: 7.1,
      heart_rate: 76,
    },
  ]);
  const [isTracking, setIsTracking] = useState(false);
  const [manualInput, setManualInput] = useState({
    steps: '',
    calories: '',
    minutes: '',
    distance: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadFitnessData();
      loadGoals();
      loadHistory();
      setupRealtimeSubscription();
    }
  }, [user]);

  const loadFitnessData = async () => {
    const { data, error } = await supabase
      .from('fitness_tracking')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (error) {
      console.error('Error loading fitness data:', error);
      return;
    }

    if (data) {
      setFitnessData({
        steps: data.steps,
        calories_burned: data.calories_burned,
        active_minutes: data.active_minutes,
        distance_km: data.distance_km,
        heart_rate: data.heart_rate,
      });
    }
  };

  const loadGoals = async () => {
    const { data, error } = await supabase
      .from('fitness_goals')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (error) {
      console.error('Error loading goals:', error);
      return;
    }

    if (data) {
      setGoals({
        daily_steps_goal: data.daily_steps_goal,
        daily_calories_goal: data.daily_calories_goal,
        daily_active_minutes_goal: data.daily_active_minutes_goal,
      });
    }
  };

  const loadHistory = async () => {
    const { data, error } = await supabase
      .from('fitness_history')
      .select('*')
      .eq('user_id', user?.id)
      .order('date', { ascending: false })
      .limit(7);

    if (error) {
      console.error('Error loading history:', error);
      return;
    }

    if (data) {
      setHistory(data);
    }
  };

  const setupRealtimeSubscription = () => {
    const subscription = supabase
      .channel('fitness_tracking_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fitness_tracking',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.new) {
            setFitnessData({
              steps: payload.new.steps,
              calories_burned: payload.new.calories_burned,
              active_minutes: payload.new.active_minutes,
              distance_km: payload.new.distance_km,
              heart_rate: payload.new.heart_rate,
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const startTracking = async () => {
    setIsTracking(true);
    // Initialize tracking data if it doesn't exist
    const { error } = await supabase
      .from('fitness_tracking')
      .upsert({
        user_id: user?.id,
        steps: 0,
        calories_burned: 0,
        active_minutes: 0,
        distance_km: 0,
      });

    if (error) {
      console.error('Error starting tracking:', error);
      toast({
        title: 'Error',
        description: 'Failed to start tracking. Please try again.',
        variant: 'destructive',
      });
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const updateManualInput = async () => {
    const steps = parseInt(manualInput.steps) || 0;
    const calories = parseInt(manualInput.calories) || 0;
    const minutes = parseInt(manualInput.minutes) || 0;
    const distance = parseFloat(manualInput.distance) || 0;

    const { error } = await supabase
      .from('fitness_tracking')
      .upsert({
        user_id: user?.id,
        steps,
        calories_burned: calories,
        active_minutes: minutes,
        distance_km: distance,
      });

    if (error) {
      console.error('Error updating fitness data:', error);
      toast({
        title: 'Error',
        description: 'Failed to update fitness data. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Fitness data updated successfully.',
      });
      setManualInput({ steps: '', calories: '', minutes: '', distance: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steps</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fitnessData.steps.toLocaleString()}</div>
            <Progress value={(fitnessData.steps / goals.daily_steps_goal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Goal: {goals.daily_steps_goal.toLocaleString()} steps
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fitnessData.calories_burned}</div>
            <Progress value={(fitnessData.calories_burned / goals.daily_calories_goal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Goal: {goals.daily_calories_goal} calories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Minutes</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fitnessData.active_minutes}</div>
            <Progress value={(fitnessData.active_minutes / goals.daily_active_minutes_goal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Goal: {goals.daily_active_minutes_goal} minutes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distance</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fitnessData.distance_km.toFixed(2)} km</div>
            <p className="text-xs text-muted-foreground mt-2">
              Total distance covered today
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="steps"
                  stroke="#8884d8"
                  name="Steps"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="calories_burned"
                  stroke="#ff7300"
                  name="Calories"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="active_minutes"
                  stroke="#82ca9d"
                  name="Active Minutes"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((day) => (
              <div
                key={day.date}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{day.date}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="text-sm text-muted-foreground">
                      Steps: {day.steps.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Calories: {day.calories_burned}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active: {day.active_minutes} min
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Distance: {day.distance_km} km
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Input</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="steps">Steps</Label>
              <Input
                id="steps"
                type="number"
                value={manualInput.steps}
                onChange={(e) => setManualInput({ ...manualInput, steps: e.target.value })}
                placeholder="Enter steps"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories Burned</Label>
              <Input
                id="calories"
                type="number"
                value={manualInput.calories}
                onChange={(e) => setManualInput({ ...manualInput, calories: e.target.value })}
                placeholder="Enter calories"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minutes">Active Minutes</Label>
              <Input
                id="minutes"
                type="number"
                value={manualInput.minutes}
                onChange={(e) => setManualInput({ ...manualInput, minutes: e.target.value })}
                placeholder="Enter minutes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                type="number"
                step="0.01"
                value={manualInput.distance}
                onChange={(e) => setManualInput({ ...manualInput, distance: e.target.value })}
                placeholder="Enter distance"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outline"
              onClick={isTracking ? stopTracking : startTracking}
            >
              {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </Button>
            <Button onClick={updateManualInput}>Update Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 