import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getUserCourses } from '@/lib/courses';
import { useAuth } from '@/hooks/use-auth';
import { getCourseVideoUrl } from '@/lib/course-videos';
import { toast } from '@/components/ui/use-toast';

interface EnrolledCourse {
  course_id: number;
  progress: number;
  course: {
    id: number;
    title: string;
    category: string;
    level: string;
    duration: string;
    image: string;
    description: string;
  };
}

export default function MyCourses() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    if (!user) return;

    const { success, courses } = await getUserCourses(user.id);
    if (success && courses) {
      setCourses(courses);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Book className="mr-2 h-5 w-5 text-eco-green" />
            My Courses
          </CardTitle>
          <CardDescription>Loading your courses...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-eco-green" />
        </CardContent>
      </Card>
    );
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Book className="mr-2 h-5 w-5 text-eco-green" />
            My Courses
          </CardTitle>
          <CardDescription>You haven't enrolled in any courses yet</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Button asChild className="bg-eco-green hover:bg-eco-green-dark">
            <Link to="/skills">
              Browse Courses
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Book className="mr-2 h-5 w-5 text-eco-green" />
          My Courses
        </CardTitle>
        <CardDescription>Continue your learning journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((enrolledCourse) => (
          <div key={enrolledCourse.course_id} className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={enrolledCourse.course.image}
                  alt={enrolledCourse.course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{enrolledCourse.course.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {enrolledCourse.course.category} • {enrolledCourse.course.level} • {enrolledCourse.course.duration}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{enrolledCourse.progress}%</span>
                  </div>
                  <Progress value={enrolledCourse.progress} className="h-2" />
                </div>
              </div>
            </div>
            <Button 
              className="w-full bg-eco-green hover:bg-eco-green-dark"
              onClick={() => {
                const videoUrl = getCourseVideoUrl(enrolledCourse.course.title);
                if (videoUrl) {
                  window.open(videoUrl, '_blank');
                } else {
                  toast({
                    title: "Video Not Available",
                    description: "The course video is not available at the moment.",
                    variant: "destructive",
                  });
                }
              }}
            >
              Continue Learning
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 