import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trophy, Target, Award, Star, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  target: number;
  completed: boolean;
  end_date: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  date_unlocked?: string;
}

export default function HealthChallenges() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const [user, setUser] = useState<any>(null);
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '10K Steps Daily',
      description: 'Walk 10,000 steps every day for a week',
      points: 100,
      progress: 6500,
      target: 10000,
      completed: false,
      end_date: '2024-02-12',
    },
    {
      id: '2',
      title: 'Hydration Hero',
      description: 'Drink 8 glasses of water daily',
      points: 50,
      progress: 6,
      target: 8,
      completed: false,
      end_date: '2024-02-12',
    },
    {
      id: '3',
      title: 'Meditation Master',
      description: 'Meditate for 10 minutes daily',
      points: 75,
      progress: 8,
      target: 10,
      completed: false,
      end_date: '2024-02-12',
    },
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first challenge',
      points: 50,
      unlocked: true,
      date_unlocked: '2024-02-01',
    },
    {
      id: '2',
      title: 'Consistency King',
      description: 'Complete 5 challenges in a row',
      points: 100,
      unlocked: false,
    },
    {
      id: '3',
      title: 'Health Warrior',
      description: 'Earn 500 total points',
      points: 200,
      unlocked: false,
    },
  ]);

  const [totalPoints] = useState(150);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const updateChallengeProgress = async (challengeId: string, progress: number) => {
    const { error } = await supabase
      .from('health_challenges')
      .update({ progress })
      .eq('id', challengeId)
      .eq('user_id', user?.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update challenge progress.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Challenge progress updated successfully.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Keep going to earn more points!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{challenges.filter(c => !c.completed).length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Challenges in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Achievements unlocked
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Star className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{challenge.points} points</div>
                      <div className="text-sm text-muted-foreground">
                        Ends: {challenge.end_date}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.target}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.target) * 100} />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => updateChallengeProgress(challenge.id, challenge.progress + 1)}
                    >
                      Update Progress
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{achievement.points} points</div>
                      {achievement.unlocked && (
                        <div className="text-sm text-muted-foreground">
                          Unlocked: {achievement.date_unlocked}
                        </div>
                      )}
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <div className="mt-2 text-sm text-green-600">
                      Achievement Unlocked! 🎉
                    </div>
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