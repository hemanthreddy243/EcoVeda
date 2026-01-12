
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

interface ProgressTrackerProps {
  userProfile: UserProfile;
}

export default function ProgressTracker({ userProfile }: ProgressTrackerProps) {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">Progress to Level {userProfile.level + 1}</div>
          <div className="text-sm text-muted-foreground">
            {userProfile.points} / {userProfile.nextLevel} XP
          </div>
        </div>
        <Progress value={(userProfile.points / userProfile.nextLevel) * 100} className="h-2" />
      </CardContent>
    </Card>
  );
}
