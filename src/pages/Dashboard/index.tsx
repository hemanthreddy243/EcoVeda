import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { UserProfile } from '@/components/UserProfile';
import DashboardHeader from './components/DashboardHeader';
import ProgressTracker from './components/ProgressTracker';
import RecentAchievements from './components/RecentAchievements';
import RecommendedCourses from './components/RecommendedCourses';
import QuickStats from './components/QuickStats';
import UpcomingEvents from './components/UpcomingEvents';
import QuickActions from './components/QuickActions';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MyCourses from './components/MyCourses';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    avatar: null,
    role: "Community Member",
    joinDate: "",
    level: 1,
    points: 0,
    nextLevel: 100,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // First try to get the user's profile
      let profileData;
      let profileError;
      
      const profileResponse = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      profileData = profileResponse.data;
      profileError = profileResponse.error;

      // If profile doesn't exist, create one
      if (profileError && profileError.code === 'PGRST116') {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              full_name: user.email?.split('@')[0] || 'User',
              email: user.email,
              level: 1,
              points: 0,
              created_at: new Date().toISOString(),
            }
          ])
          .select()
          .single();

        if (createError) throw createError;
        profileData = newProfile;
      } else if (profileError) {
        throw profileError;
      }

      // Set the user profile with the data
      setUserProfile({
        name: profileData?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        avatar: profileData?.avatar_url || null,
        role: "Community Member",
        joinDate: `Member since ${new Date(profileData?.created_at || new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
        level: profileData?.level || 1,
        points: profileData?.points || 0,
        nextLevel: ((profileData?.level || 1) * 100),
      });

    } catch (error: any) {
      console.error('Error in fetchUserProfile:', error);
      toast({
        title: 'Error loading profile',
        description: 'Unable to load your profile. Please try refreshing the page.',
        variant: 'destructive',
      });
      
      // Set fallback values if there's an error
      setUserProfile(prev => ({
        ...prev,
        name: user?.email?.split('@')[0] || 'User',
        email: user?.email || '',
        joinDate: 'Member since ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAuth = () => {
    setIsAuthOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar onOpenAuth={handleOpenAuth} />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-eco-green"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onOpenAuth={handleOpenAuth} />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader userProfile={userProfile} />
          <ProgressTracker userProfile={userProfile} />

          {/* Dashboard tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content - 2 columns on large screens */}
                <div className="lg:col-span-2 space-y-6">
                  <RecentAchievements />
                  <RecommendedCourses />
                </div>

                {/* Sidebar - 1 column on large screens */}
                <div className="space-y-6">
                  <QuickStats />
                  <UpcomingEvents />
                  <QuickActions />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <UserProfile />
            </TabsContent>

            <TabsContent value="rewards">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold">Rewards Coming Soon</h2>
                <p className="text-muted-foreground">Stay tuned for exciting rewards and achievements!</p>
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <MyCourses />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
