
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const recommendedCourses = [
  { id: 1, title: "Advanced Organic Farming", category: "Agriculture", progress: 0, enrolled: false },
  { id: 2, title: "Web Development Fundamentals", category: "Coding", progress: 35, enrolled: true },
  { id: 3, title: "Sustainable Fashion Design", category: "Craft", progress: 72, enrolled: true },
];

export default function RecommendedCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-eco-green" />
          Recommended for You
        </CardTitle>
        <CardDescription>Courses and skills to enhance your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-muted-foreground">{course.category}</div>
                </div>
                <Button 
                  variant={course.enrolled ? "outline" : "default"} 
                  size="sm"
                  className={course.enrolled ? "" : "bg-eco-green hover:bg-eco-green-dark"}
                >
                  {course.enrolled ? "Continue" : "Enroll"}
                </Button>
              </div>
              {course.enrolled && (
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto text-eco-green" asChild>
          <Link to="/skills">
            Browse All Courses
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
