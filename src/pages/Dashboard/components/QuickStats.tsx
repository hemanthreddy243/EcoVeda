
import { Award, Grid3X3, Gift, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <Award className="h-6 w-6 text-eco-green mx-auto mb-2" />
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-muted-foreground">Badges</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Zap className="h-6 w-6 text-eco-earth mx-auto mb-2" />
          <div className="text-2xl font-bold">7</div>
          <div className="text-sm text-muted-foreground">Challenges</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Grid3X3 className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-muted-foreground">Courses</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Gift className="h-6 w-6 text-rose-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">850</div>
          <div className="text-sm text-muted-foreground">Points</div>
        </CardContent>
      </Card>
    </div>
  );
}
