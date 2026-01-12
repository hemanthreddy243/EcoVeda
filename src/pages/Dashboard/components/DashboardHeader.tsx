
import { Bell, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  joinDate: string;
  level: number;
  points: number;
  nextLevel: number;
}

interface DashboardHeaderProps {
  userProfile: UserProfile;
}

export default function DashboardHeader({ userProfile }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={userProfile.avatar || ""} alt={userProfile.name} />
          <AvatarFallback className="bg-eco-green-light text-white text-xl">
            {userProfile.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-2xl font-bold">Welcome, {userProfile.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Badge variant="outline" className="text-xs font-normal">
              Level {userProfile.level}
            </Badge>
            <span className="text-sm">{userProfile.joinDate}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full lg:w-auto">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="outline" className="flex-grow lg:flex-grow-0">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
