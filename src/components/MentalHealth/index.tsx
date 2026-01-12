import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Brain, Smile, BookOpen, Heart, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  stress: number;
  notes: string;
}

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
}

interface MeditationSession {
  id: string;
  date: string;
  duration: number;
  type: string;
  notes: string;
}

export default function MentalHealth() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const [user, setUser] = useState<any>(null);
  const [moodHistory] = useState<MoodEntry[]>([
    {
      date: '2024-02-01',
      mood: 8,
      energy: 7,
      stress: 4,
      notes: 'Feeling productive and motivated',
    },
    {
      date: '2024-02-02',
      mood: 7,
      energy: 6,
      stress: 5,
      notes: 'Good day overall, some work stress',
    },
    {
      date: '2024-02-03',
      mood: 9,
      energy: 8,
      stress: 3,
      notes: 'Weekend vibes, feeling great',
    },
    {
      date: '2024-02-04',
      mood: 6,
      energy: 5,
      stress: 6,
      notes: 'Tired but managing well',
    },
    {
      date: '2024-02-05',
      mood: 8,
      energy: 7,
      stress: 4,
      notes: 'Back to work, feeling focused',
    },
  ]);

  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-02-05',
      title: 'Morning Reflection',
      content: 'Started the day with a peaceful meditation session. Feeling grateful for the small moments of joy.',
      mood: 'peaceful',
      tags: ['gratitude', 'meditation', 'morning'],
    },
    {
      id: '2',
      date: '2024-02-04',
      title: 'Weekend Thoughts',
      content: 'Spent quality time with family. Realized the importance of work-life balance.',
      mood: 'content',
      tags: ['family', 'reflection', 'balance'],
    },
  ]);

  const [meditationSessions] = useState<MeditationSession[]>([
    {
      id: '1',
      date: '2024-02-05',
      duration: 15,
      type: 'Mindfulness',
      notes: 'Focused on breath awareness',
    },
    {
      id: '2',
      date: '2024-02-04',
      duration: 20,
      type: 'Body Scan',
      notes: 'Helped with muscle tension',
    },
  ]);

  const [newJournalEntry, setNewJournalEntry] = useState({
    title: '',
    content: '',
    mood: '',
    tags: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const addJournalEntry = async () => {
    const { error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user?.id,
        title: newJournalEntry.title,
        content: newJournalEntry.content,
        mood: newJournalEntry.mood,
        tags: newJournalEntry.tags.split(',').map(tag => tag.trim()),
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add journal entry.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Journal entry added successfully.',
      });
      setNewJournalEntry({
        title: '',
        content: '',
        mood: '',
        tags: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {moodHistory.reduce((acc, curr) => acc + curr.mood, 0) / moodHistory.length}
            </div>
            <Progress
              value={
                (moodHistory.reduce((acc, curr) => acc + curr.mood, 0) / moodHistory.length / 10) * 100
              }
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Based on {moodHistory.length} entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meditation Streak</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meditationSessions.length} days</div>
            <p className="text-xs text-muted-foreground mt-2">
              Total minutes: {meditationSessions.reduce((acc, curr) => acc + curr.duration, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journalEntries.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Last entry: {journalEntries[0]?.date}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood & Energy Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mood"
                  stroke="#8884d8"
                  name="Mood"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="energy"
                  stroke="#ff7300"
                  name="Energy"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="stress"
                  stroke="#82ca9d"
                  name="Stress"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {entry.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Mood: {entry.mood}</div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{entry.content}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New Journal Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newJournalEntry.title}
                onChange={(e) => setNewJournalEntry({ ...newJournalEntry, title: e.target.value })}
                placeholder="Entry title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                value={newJournalEntry.content}
                onChange={(e) => setNewJournalEntry({ ...newJournalEntry, content: e.target.value })}
                placeholder="Write your thoughts..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">Mood</Label>
              <Input
                id="mood"
                value={newJournalEntry.mood}
                onChange={(e) => setNewJournalEntry({ ...newJournalEntry, mood: e.target.value })}
                placeholder="How are you feeling?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={newJournalEntry.tags}
                onChange={(e) => setNewJournalEntry({ ...newJournalEntry, tags: e.target.value })}
                placeholder="e.g., reflection, gratitude, goals"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={addJournalEntry}>Add Entry</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meditation Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meditationSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{session.type}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {session.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{session.duration} minutes</div>
                    </div>
                  </div>
                  {session.notes && (
                    <p className="mt-2 text-sm text-muted-foreground">{session.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 