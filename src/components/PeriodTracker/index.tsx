import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Calendar, Droplet, Thermometer, Activity, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PeriodData {
  cycle_day: number;
  cycle_length: number;
  period_length: number;
  next_period_date: string;
  symptoms: string[];
  mood: string;
  flow_level: number;
  temperature: number;
  notes: string;
}

interface CycleHistory {
  date: string;
  flow_level: number;
  symptoms: string[];
  mood: string;
  temperature: number;
}

export default function PeriodTracker() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const [user, setUser] = useState<any>(null);
  const [periodData, setPeriodData] = useState<PeriodData>({
    cycle_day: 0,
    cycle_length: 28,
    period_length: 5,
    next_period_date: '',
    symptoms: [],
    mood: '',
    flow_level: 0,
    temperature: 0,
    notes: '',
  });
  const [history, setHistory] = useState<CycleHistory[]>([
    {
      date: '2024-01-01',
      flow_level: 4,
      symptoms: ['cramps', 'headache', 'fatigue'],
      mood: 'tired',
      temperature: 36.5,
    },
    {
      date: '2024-01-02',
      flow_level: 3,
      symptoms: ['cramps', 'backache'],
      mood: 'irritable',
      temperature: 36.6,
    },
    {
      date: '2024-01-03',
      flow_level: 2,
      symptoms: ['backache', 'bloating'],
      mood: 'calm',
      temperature: 36.7,
    },
    {
      date: '2024-01-04',
      flow_level: 1,
      symptoms: ['bloating'],
      mood: 'energetic',
      temperature: 36.8,
    },
    {
      date: '2024-01-05',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 36.9,
    },
    {
      date: '2024-01-06',
      flow_level: 0,
      symptoms: [],
      mood: 'productive',
      temperature: 37.0,
    },
    {
      date: '2024-01-07',
      flow_level: 0,
      symptoms: [],
      mood: 'focused',
      temperature: 37.1,
    },
    {
      date: '2024-01-08',
      flow_level: 0,
      symptoms: [],
      mood: 'energetic',
      temperature: 37.2,
    },
    {
      date: '2024-01-09',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 37.3,
    },
    {
      date: '2024-01-10',
      flow_level: 0,
      symptoms: [],
      mood: 'productive',
      temperature: 37.4,
    },
    {
      date: '2024-01-11',
      flow_level: 0,
      symptoms: [],
      mood: 'focused',
      temperature: 37.5,
    },
    {
      date: '2024-01-12',
      flow_level: 0,
      symptoms: [],
      mood: 'energetic',
      temperature: 37.6,
    },
    {
      date: '2024-01-13',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 37.7,
    },
    {
      date: '2024-01-14',
      flow_level: 0,
      symptoms: [],
      mood: 'productive',
      temperature: 37.8,
    },
    {
      date: '2024-01-15',
      flow_level: 0,
      symptoms: [],
      mood: 'focused',
      temperature: 37.9,
    },
    {
      date: '2024-01-16',
      flow_level: 0,
      symptoms: [],
      mood: 'energetic',
      temperature: 38.0,
    },
    {
      date: '2024-01-17',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 38.1,
    },
    {
      date: '2024-01-18',
      flow_level: 0,
      symptoms: [],
      mood: 'productive',
      temperature: 38.2,
    },
    {
      date: '2024-01-19',
      flow_level: 0,
      symptoms: [],
      mood: 'focused',
      temperature: 38.3,
    },
    {
      date: '2024-01-20',
      flow_level: 0,
      symptoms: [],
      mood: 'energetic',
      temperature: 38.4,
    },
    {
      date: '2024-01-21',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 38.5,
    },
    {
      date: '2024-01-22',
      flow_level: 0,
      symptoms: [],
      mood: 'productive',
      temperature: 38.6,
    },
    {
      date: '2024-01-23',
      flow_level: 0,
      symptoms: [],
      mood: 'focused',
      temperature: 38.7,
    },
    {
      date: '2024-01-24',
      flow_level: 0,
      symptoms: [],
      mood: 'energetic',
      temperature: 38.8,
    },
    {
      date: '2024-01-25',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 38.9,
    },
    {
      date: '2024-01-26',
      flow_level: 0,
      symptoms: [],
      mood: 'productive',
      temperature: 39.0,
    },
    {
      date: '2024-01-27',
      flow_level: 0,
      symptoms: [],
      mood: 'focused',
      temperature: 39.1,
    },
    {
      date: '2024-01-28',
      flow_level: 0,
      symptoms: [],
      mood: 'energetic',
      temperature: 39.2,
    },
    {
      date: '2024-01-29',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 39.3,
    },
    {
      date: '2024-01-30',
      flow_level: 0,
      symptoms: [],
      mood: 'productive',
      temperature: 39.4,
    },
    {
      date: '2024-01-31',
      flow_level: 0,
      symptoms: [],
      mood: 'focused',
      temperature: 39.5,
    },
    {
      date: '2024-02-01',
      flow_level: 4,
      symptoms: ['cramps', 'headache', 'fatigue'],
      mood: 'tired',
      temperature: 36.5,
    },
    {
      date: '2024-02-02',
      flow_level: 3,
      symptoms: ['cramps', 'backache'],
      mood: 'irritable',
      temperature: 36.6,
    },
    {
      date: '2024-02-03',
      flow_level: 2,
      symptoms: ['backache', 'bloating'],
      mood: 'calm',
      temperature: 36.7,
    },
    {
      date: '2024-02-04',
      flow_level: 1,
      symptoms: ['bloating'],
      mood: 'energetic',
      temperature: 36.8,
    },
    {
      date: '2024-02-05',
      flow_level: 0,
      symptoms: [],
      mood: 'happy',
      temperature: 36.9,
    },
  ]);
  const [manualInput, setManualInput] = useState({
    flow_level: '',
    symptoms: '',
    mood: '',
    temperature: '',
    notes: '',
  });

  // Add new state for cycle analysis
  const [cycleAnalysis] = useState({
    averageCycleLength: 28,
    averagePeriodLength: 4,
    commonSymptoms: ['cramps', 'headache', 'backache', 'bloating'],
    moodPatterns: {
      'Period Start': ['tired', 'irritable'],
      'Period End': ['calm', 'energetic'],
      'Mid Cycle': ['happy', 'productive', 'focused'],
    },
    temperaturePattern: {
      preOvulation: '36.5-36.7',
      postOvulation: '37.0-37.2',
      lutealPhase: '37.3-37.5',
    },
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
      loadPeriodData();
      loadHistory();
      setupRealtimeSubscription();
    }
  }, [user]);

  const loadPeriodData = async () => {
    const { data, error } = await supabase
      .from('period_tracking')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (error) {
      console.error('Error loading period data:', error);
      return;
    }

    if (data) {
      setPeriodData(data);
    }
  };

  const loadHistory = async () => {
    const { data, error } = await supabase
      .from('period_history')
      .select('*')
      .eq('user_id', user?.id)
      .order('date', { ascending: false })
      .limit(6);

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
      .channel('period_tracking_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'period_tracking',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.new) {
            const newData = payload.new as PeriodData;
            setPeriodData(newData);
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
      .from('period_tracking')
      .upsert({
        user_id: user?.id,
        flow_level: parseInt(manualInput.flow_level) || 0,
        symptoms: manualInput.symptoms.split(',').map(s => s.trim()),
        mood: manualInput.mood,
        temperature: parseFloat(manualInput.temperature) || 0,
        notes: manualInput.notes,
      });

    if (error) {
      console.error('Error updating period data:', error);
      toast({
        title: 'Error',
        description: 'Failed to update period data. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Period data updated successfully.',
      });
      setManualInput({
        flow_level: '',
        symptoms: '',
        mood: '',
        temperature: '',
        notes: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cycle Day</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{periodData.cycle_day}</div>
            <Progress value={(periodData.cycle_day / periodData.cycle_length) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Next period: {periodData.next_period_date}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flow Level</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{periodData.flow_level}/5</div>
            <Progress value={(periodData.flow_level / 5) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Current flow intensity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{periodData.temperature}°C</div>
            <p className="text-xs text-muted-foreground mt-2">
              Basal body temperature
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{periodData.mood}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Current emotional state
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cycle Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Cycle Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Cycle Length</span>
                    <span className="font-medium">{cycleAnalysis.averageCycleLength} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Period Length</span>
                    <span className="font-medium">{cycleAnalysis.averagePeriodLength} days</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Common Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {cycleAnalysis.commonSymptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Mood Patterns</h3>
                <div className="space-y-2">
                  {Object.entries(cycleAnalysis.moodPatterns).map(([phase, moods]) => (
                    <div key={phase}>
                      <span className="text-muted-foreground">{phase}:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {moods.map((mood) => (
                          <span
                            key={mood}
                            className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                          >
                            {mood}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Temperature Pattern</h3>
                <div className="space-y-2">
                  {Object.entries(cycleAnalysis.temperaturePattern).map(([phase, range]) => (
                    <div key={phase} className="flex justify-between">
                      <span className="text-muted-foreground">{phase}</span>
                      <span className="font-medium">{range}°C</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cycle History</CardTitle>
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
                  dataKey="flow_level"
                  stroke="#8884d8"
                  name="Flow Level"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#82ca9d"
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((day) => (
              <div
                key={day.date}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{day.date}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="text-sm text-muted-foreground">
                      Flow Level: {day.flow_level}/5
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Temperature: {day.temperature}°C
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Mood: {day.mood}
                    </div>
                    {day.symptoms.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Symptoms: {day.symptoms.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
              <Label htmlFor="flow_level">Flow Level (1-5)</Label>
              <Input
                id="flow_level"
                type="number"
                min="1"
                max="5"
                value={manualInput.flow_level}
                onChange={(e) => setManualInput({ ...manualInput, flow_level: e.target.value })}
                placeholder="Enter flow level"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={manualInput.temperature}
                onChange={(e) => setManualInput({ ...manualInput, temperature: e.target.value })}
                placeholder="Enter temperature"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
              <Input
                id="symptoms"
                value={manualInput.symptoms}
                onChange={(e) => setManualInput({ ...manualInput, symptoms: e.target.value })}
                placeholder="e.g., cramps, headache"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">Mood</Label>
              <Input
                id="mood"
                value={manualInput.mood}
                onChange={(e) => setManualInput({ ...manualInput, mood: e.target.value })}
                placeholder="e.g., happy, tired"
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