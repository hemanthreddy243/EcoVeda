import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Settings, Trophy, Star, Edit2, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  email: string;
  created_at: string;
  level: number;
  points: number;
  username: string;
}

interface Achievement {
  id: string;
  achievement_type: string;
  progress: number;
  completed: boolean;
  achievement_type_details: {
    name: string;
    description: string;
    points: number;
    required_progress: number;
    icon: string;
  };
}

export function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
    fetchAchievements();
  }, []);

  async function fetchProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFullName(data.full_name || '');
      setUsername(data.username || '');
    } catch (error: any) {
      toast({
        title: 'Error loading profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchAchievements() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('achievements')
        .select(`
          *,
          achievement_type_details:achievement_types(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      setAchievements(data || []);
    } catch (error: any) {
      console.error('Error fetching achievements:', error);
    }
  }

  async function updateProfile() {
    try {
      setUpdating(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName,
          username: username
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });

      await fetchProfile();
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile?.email || ''}
              disabled
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="username">Username</Label>
              {isEditingUsername ? (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsEditingUsername(false);
                      setUsername(profile?.username || '');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      updateProfile();
                      setIsEditingUsername(false);
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingUsername(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditingUsername}
            />
          </div>

          <div className="space-y-2">
            <Label>Level & Points</Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Level {profile?.level || 1}</span>
              </div>
              <div className="flex-1">
                <Progress value={(profile?.points || 0) % 100} className="h-2" />
              </div>
              <span className="text-sm text-muted-foreground">
                {profile?.points || 0} points
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Account Created</Label>
            <p className="text-sm text-muted-foreground">
              {new Date(profile?.created_at || '').toLocaleDateString()}
            </p>
          </div>

          <Button 
            onClick={updateProfile}
            disabled={updating}
            className="w-full"
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
          <CardDescription>Track your progress and earn rewards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${
                    achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {achievement.achievement_type_details.icon === 'footprints' && <Star className="h-4 w-4" />}
                    {achievement.achievement_type_details.icon === 'shield' && <Trophy className="h-4 w-4" />}
                    {/* Add more icons as needed */}
                  </div>
                  <div>
                    <h4 className="font-medium">{achievement.achievement_type_details.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.achievement_type_details.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{achievement.progress}/{achievement.achievement_type_details.required_progress}</div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.achievement_type_details.points} points
                  </div>
                </div>
              </div>
              <Progress 
                value={(achievement.progress / achievement.achievement_type_details.required_progress) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 