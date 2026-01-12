
import { Award, ChevronRight, Users, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data
const recentAchievements = [
  { id: 1, title: "Eco Warrior", description: "Completed 5 sustainability challenges", date: "2 days ago", icon: Award, color: "text-green-500 bg-green-100 dark:bg-green-900" },
  { id: 2, title: "Community Leader", description: "Organized a local cleanup event", date: "1 week ago", icon: Users, color: "text-blue-500 bg-blue-100 dark:bg-blue-900" },
  { id: 3, title: "Learning Pioneer", description: "Completed 3 courses in sustainable farming", date: "2 weeks ago", icon: TrendingUp, color: "text-purple-500 bg-purple-100 dark:bg-purple-900" },
];

export default function RecentAchievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Award className="mr-2 h-5 w-5 text-eco-green" />
          Recent Achievements
        </CardTitle>
        <CardDescription>Your latest accomplishments and badges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${achievement.color}`}>
                <achievement.icon className="h-5 w-5" />
              </div>
              <div className="flex-grow">
                <div className="font-medium">{achievement.title}</div>
                <div className="text-sm text-muted-foreground">{achievement.description}</div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {achievement.date}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto text-eco-green">
          View All Achievements
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
