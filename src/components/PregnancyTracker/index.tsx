import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Heart, Calendar, Baby, Stethoscope, Bell, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PregnancyData {
  weeks_pregnant: number;
  due_date: string;
  next_checkup: string;
  weight: number;
  blood_pressure: string;
  baby_heart_rate: number;
  symptoms: string[];
  notes: string;
}

interface Milestone {
  week: number;
  title: string;
  description: string;
  completed: boolean;
}

interface WeightHistory {
  date: string;
  weight: number;
}

interface HeartRateHistory {
  date: string;
  heart_rate: number;
}

export default function PregnancyTracker() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const [user, setUser] = useState<any>(null);
  const [pregnancyData, setPregnancyData] = useState<PregnancyData>({
    weeks_pregnant: 0,
    due_date: '',
    next_checkup: '',
    weight: 0,
    blood_pressure: '',
    baby_heart_rate: 0,
    symptoms: [],
    notes: '',
  });
  const [weightHistory, setWeightHistory] = useState<WeightHistory[]>([
    { date: '2024-01-01', weight: 65 },
    { date: '2024-01-08', weight: 65.5 },
    { date: '2024-01-15', weight: 66 },
    { date: '2024-01-22', weight: 66.8 },
    { date: '2024-01-29', weight: 67.2 },
    { date: '2024-02-05', weight: 68 },
  ]);
  const [heartRateHistory, setHeartRateHistory] = useState<HeartRateHistory[]>([
    { date: '2024-01-01', heart_rate: 140 },
    { date: '2024-01-08', heart_rate: 142 },
    { date: '2024-01-15', heart_rate: 145 },
    { date: '2024-01-22', heart_rate: 148 },
    { date: '2024-01-29', heart_rate: 150 },
    { date: '2024-02-05', heart_rate: 152 },
  ]);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      week: 12,
      title: 'First Trimester Complete',
      description: 'Baby is fully formed and all major organs are developing',
      completed: true,
    },
    {
      week: 20,
      title: 'Anatomy Scan',
      description: 'Detailed ultrasound to check baby\'s development',
      completed: true,
    },
    {
      week: 24,
      title: 'Viability Milestone',
      description: 'Baby has a chance of survival if born early',
      completed: true,
    },
    {
      week: 28,
      title: 'Third Trimester Begins',
      description: 'Final stage of pregnancy',
      completed: false,
    },
    {
      week: 32,
      title: 'Growth Scan',
      description: 'Check baby\'s growth and position',
      completed: false,
    },
  ]);
  const [manualInput, setManualInput] = useState({
    weight: '',
    blood_pressure: '',
    baby_heart_rate: '',
    symptoms: '',
    notes: '',
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
      loadPregnancyData();
      loadMilestones();
      setupRealtimeSubscription();
    }
  }, [user]);

  const loadPregnancyData = async () => {
    const { data, error } = await supabase
      .from('pregnancy_tracking')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (error) {
      console.error('Error loading pregnancy data:', error);
      return;
    }

    if (data) {
      setPregnancyData(data);
    }
  };

  const loadMilestones = async () => {
    const { data, error } = await supabase
      .from('pregnancy_milestones')
      .select('*')
      .eq('user_id', user?.id)
      .order('week', { ascending: true });

    if (error) {
      console.error('Error loading milestones:', error);
      return;
    }

    if (data) {
      setMilestones(data);
    }
  };

  const setupRealtimeSubscription = () => {
    const subscription = supabase
      .channel('pregnancy_tracking_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pregnancy_tracking',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.new) {
            const newData = payload.new as PregnancyData;
            setPregnancyData(newData);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const updateManualInput = async () => {
    const { error } = await supabase
      .from('pregnancy_tracking')
      .upsert({
        user_id: user?.id,
        weight: parseFloat(manualInput.weight) || 0,
        blood_pressure: manualInput.blood_pressure,
        baby_heart_rate: parseInt(manualInput.baby_heart_rate) || 0,
        symptoms: manualInput.symptoms.split(',').map(s => s.trim()),
        notes: manualInput.notes,
      });

    if (error) {
      console.error('Error updating pregnancy data:', error);
      toast({
        title: 'Error',
        description: 'Failed to update pregnancy data. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Pregnancy data updated successfully.',
      });
      setManualInput({
        weight: '',
        blood_pressure: '',
        baby_heart_rate: '',
        symptoms: '',
        notes: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weeks Pregnant</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pregnancyData.weeks_pregnant}</div>
            <Progress value={(pregnancyData.weeks_pregnant / 40) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Due Date: {pregnancyData.due_date}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Checkup</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pregnancyData.next_checkup}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Regular checkups are important
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Baby's Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pregnancyData.baby_heart_rate} bpm</div>
            <p className="text-xs text-muted-foreground mt-2">
              Normal range: 120-160 bpm
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pregnancyData.weight} kg</div>
            <p className="text-xs text-muted-foreground mt-2">
              Track your weight gain
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pregnancy Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.week}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Week {milestone.week}: {milestone.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={milestone.completed}
                    onChange={() => {
                      // Handle milestone completion
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pregnancy Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="weight"
                  stroke="#8884d8"
                  name="Weight (kg)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="heart_rate"
                  stroke="#82ca9d"
                  name="Heart Rate (bpm)"
                  data={heartRateHistory}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={manualInput.weight}
                onChange={(e) => setManualInput({ ...manualInput, weight: e.target.value })}
                placeholder="Enter weight"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blood_pressure">Blood Pressure</Label>
              <Input
                id="blood_pressure"
                value={manualInput.blood_pressure}
                onChange={(e) => setManualInput({ ...manualInput, blood_pressure: e.target.value })}
                placeholder="e.g., 120/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baby_heart_rate">Baby's Heart Rate</Label>
              <Input
                id="baby_heart_rate"
                type="number"
                value={manualInput.baby_heart_rate}
                onChange={(e) => setManualInput({ ...manualInput, baby_heart_rate: e.target.value })}
                placeholder="Enter heart rate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
              <Input
                id="symptoms"
                value={manualInput.symptoms}
                onChange={(e) => setManualInput({ ...manualInput, symptoms: e.target.value })}
                placeholder="e.g., nausea, fatigue"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={manualInput.notes}
                onChange={(e) => setManualInput({ ...manualInput, notes: e.target.value })}
                placeholder="Add any additional notes"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={updateManualInput}>Update Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 