import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Award, 
  Search, 
  Filter, 
  Code, 
  Sprout, 
  Scissors, 
  PenTool,
  ChevronRight,
  Star,
  Users,
  CheckCircle2,
  Sparkles,
  Rocket,
  Brain,
  BookMarked,
  GraduationCap
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { enrollInCourse, getUserCourses, Course } from '@/lib/courses';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { getCourseVideoUrl } from '@/lib/course-videos';

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "Coding",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 1240,
    rating: 4.8,
    instructor: "Alex Morgan",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build responsive websites. Master modern web development practices and create your first portfolio project.",
    progress: 0,
    tags: ["HTML", "CSS", "JavaScript", "Web Development"],
    icon: Code
  },
  {
    id: 2,
    title: "Python Programming Fundamentals",
    category: "Coding",
    level: "Beginner",
    duration: "10 weeks",
    enrolled: 1560,
    rating: 4.9,
    instructor: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Start your programming journey with Python. Learn syntax, data structures, functions, and object-oriented programming. Build practical projects and automate tasks.",
    progress: 0,
    tags: ["Python", "Programming", "Data Structures", "OOP"],
    icon: Code
  },
  {
    id: 3,
    title: "Data Science with Python",
    category: "Coding",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 980,
    rating: 4.7,
    instructor: "Dr. Michael Rodriguez",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    description: "Master data analysis, visualization, and machine learning with Python. Learn pandas, NumPy, Matplotlib, and scikit-learn. Work on real-world data science projects.",
    progress: 0,
    tags: ["Python", "Data Science", "Machine Learning", "Data Analysis"],
    icon: Code
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    category: "Coding",
    level: "Advanced",
    duration: "14 weeks",
    enrolled: 850,
    rating: 4.8,
    instructor: "Prof. James Wilson",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    description: "Deep dive into machine learning algorithms, neural networks, and deep learning. Implement models using TensorFlow and PyTorch. Build and deploy ML applications.",
    progress: 0,
    tags: ["Machine Learning", "Deep Learning", "AI", "Neural Networks"],
    icon: Code
  },
  {
    id: 5,
    title: "Mobile App Development",
    category: "Coding",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 1120,
    rating: 4.6,
    instructor: "Emily Thompson",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    description: "Learn to build cross-platform mobile applications using React Native. Master mobile UI/UX design, state management, and app deployment to iOS and Android.",
    progress: 0,
    tags: ["React Native", "Mobile Development", "JavaScript", "App Design"],
    icon: Code
  },
  {
    id: 6,
    title: "Full Stack Development",
    category: "Coding",
    level: "Advanced",
    duration: "16 weeks",
    enrolled: 920,
    rating: 4.7,
    instructor: "David Kumar",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description: "Become a full-stack developer by mastering both frontend and backend technologies. Learn React, Node.js, Express, and MongoDB. Build complete web applications.",
    progress: 0,
    tags: ["Full Stack", "React", "Node.js", "MongoDB"],
    icon: Code
  },
  {
    id: 7,
    title: "Sustainable Farming Techniques",
    category: "Farming",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 890,
    rating: 4.9,
    instructor: "Maria Chen",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad",
    description: "Master organic farming methods, crop rotation, and sustainable pest management. Learn to create and maintain eco-friendly farming systems.",
    progress: 35,
    tags: ["Organic", "Sustainable", "Agriculture", "Crop Management"],
    icon: Sprout
  },
  {
    id: 8,
    title: "Urban Vertical Farming",
    category: "Farming",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 720,
    rating: 4.7,
    instructor: "Dr. Lisa Wong",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
    description: "Learn to grow food in urban spaces using vertical farming techniques. Master space optimization, lighting systems, and hydroponic setups for city environments.",
    progress: 0,
    tags: ["Urban Farming", "Vertical Gardens", "Hydroponics", "Space Optimization"],
    icon: Sprout
  },
  {
    id: 9,
    title: "Traditional Handicraft Creation",
    category: "Handicrafts",
    level: "Beginner",
    duration: "6 weeks",
    enrolled: 760,
    rating: 4.7,
    instructor: "Raj Patel",
    image: "https://plus.unsplash.com/premium_photo-1679809447923-b3250fb2a0ce?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn to create beautiful handcrafted items using traditional techniques. Master various crafting methods and create unique pieces.",
    progress: 72,
    tags: ["Crafts", "Traditional", "Artisan", "Handmade"],
    icon: Scissors
  },
  {
    id: 10,
    title: "Sustainable Textile Design",
    category: "Handicrafts",
    level: "Intermediate",
    duration: "10 weeks",
    enrolled: 680,
    rating: 4.8,
    instructor: "Emma Thompson",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    description: "Create eco-friendly textiles using natural dyes and sustainable materials. Learn traditional weaving techniques and modern sustainable practices.",
    progress: 0,
    tags: ["Textile Design", "Natural Dyes", "Sustainable Fashion", "Weaving"],
    icon: Scissors
  },
  {
    id: 11,
    title: "Digital Illustration",
    category: "Design",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: 980,
    rating: 4.7,
    instructor: "Jamie Lee",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
    description: "Create stunning digital illustrations using industry-standard tools and techniques. Master digital art fundamentals and professional workflows.",
    progress: 48,
    tags: ["Design", "Digital Art", "Illustration", "Creative"],
    icon: PenTool
  },
  {
    id: 12,
    title: "Sustainable Product Design",
    category: "Design",
    level: "Advanced",
    duration: "12 weeks",
    enrolled: 590,
    rating: 4.9,
    instructor: "Carlos Rodriguez",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "Design eco-friendly products using sustainable materials and manufacturing processes. Learn circular design principles and life cycle assessment.",
    progress: 0,
    tags: ["Product Design", "Sustainability", "Circular Design", "Eco-friendly"],
    icon: PenTool
  },
  {
    id: 13,
    title: "Social Entrepreneurship",
    category: "Business",
    level: "Intermediate",
    duration: "10 weeks",
    enrolled: 850,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    description: "Learn to build and scale businesses that create positive social impact. Master sustainable business models, impact measurement, and social innovation.",
    progress: 0,
    tags: ["Entrepreneurship", "Social Impact", "Business Strategy", "Sustainability"],
    icon: Book
  },
  {
    id: 14,
    title: "Sustainable Business Management",
    category: "Business",
    level: "Advanced",
    duration: "14 weeks",
    enrolled: 720,
    rating: 4.7,
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    description: "Master sustainable business practices, green supply chain management, and corporate social responsibility. Learn to lead eco-conscious organizations.",
    progress: 0,
    tags: ["Business Management", "Sustainability", "CSR", "Green Business"],
    icon: Book
  },
  {
    id: 15,
    title: "Hydroponic Gardening",
    category: "Farming",
    level: "Advanced",
    duration: "9 weeks",
    enrolled: 640,
    rating: 4.8,
    instructor: "David Miller",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac",
    description: "Build and maintain hydroponic systems for urban farming and sustainable food production. Master advanced growing techniques and system optimization.",
    progress: 0,
    tags: ["Hydroponics", "Urban Farming", "Sustainability", "System Design"],
    icon: Sprout
  }
];

// Mock data for job recommendations
const jobRecommendations = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "EcoTech Solutions",
    location: "Remote",
    salary: "$60,000 - $80,000",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    match: 95,
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Organic Farm Manager",
    company: "Green Earth Farms",
    location: "Rural District",
    salary: "$45,000 - $65,000",
    skills: ["Agriculture", "Organic Farming", "Management"],
    match: 88,
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Handicraft Instructor",
    company: "Traditional Arts Center",
    location: "Cultural District",
    salary: "$40,000 - $55,000",
    skills: ["Weaving", "Pottery", "Teaching"],
    match: 92,
    posted: "3 days ago"
  }
];

// Mock data for certifications and rewards
const certificationsAndRewards = [
  {
    id: 1,
    title: "Web Development Certification",
    issuer: "EcoVeda Academy",
    date: "Upon completion",
    points: 1000,
    rewards: ["Digital Certificate", "LinkedIn Badge", "$100 Credit"]
  },
  {
    id: 2,
    title: "Sustainable Farming Badge",
    issuer: "EcoVeda Academy",
    date: "Upon completion",
    points: 1200,
    rewards: ["Digital Badge", "Community Recognition", "Seed Starter Kit"]
  },
  {
    id: 3,
    title: "Master Craftsperson Award",
    issuer: "EcoVeda Academy",
    date: "Upon competition of 3 courses",
    points: 1500,
    rewards: ["Physical Certificate", "Featured Profile", "Crafting Materials"]
  }
];

const CourseEnrollmentAnimation = ({ onComplete, courseTitle }: { onComplete: () => void, courseTitle: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full mx-4 relative overflow-hidden"
      >
        <motion.div
          initial={{ y: -100, rotate: -180 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <GraduationCap className="w-16 h-16 text-eco-green" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-center mb-4"
        >
          Welcome to {courseTitle}!
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span>Enrollment Successful</span>
          </div>
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-blue-500" />
            <span>Your learning journey begins</span>
          </div>
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-500" />
            <span>Access to course materials unlocked</span>
          </div>
          <div className="flex items-center gap-3">
            <BookMarked className="w-6 h-6 text-orange-500" />
            <span>Start learning at your own pace</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={onComplete}
            className="bg-eco-green text-white hover:bg-eco-green-dark"
          >
            Start Learning
          </Button>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-4 -right-4"
        >
          <Sparkles className="w-24 h-24 text-eco-green/20" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute -top-4 -left-4"
        >
          <Book className="w-24 h-24 text-eco-green/20" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function SkillsHub() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const [showEnrollmentAnimation, setShowEnrollmentAnimation] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  
  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('enrolled', { ascending: false });

      if (error) throw error;

      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    if (!user) return;
    
    const { success, courses } = await getUserCourses(user.id);
    if (success && courses) {
      setEnrolledCourses(courses.map(c => c.course_id));
    }
  };

  const handleOpenAuth = () => {
    setIsAuthOpen(true);
  };

  const handleEnrollCourse = async (courseId: number, courseTitle: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    const { success, message } = await enrollInCourse(user.id, courseId);
    
    if (success) {
      setEnrolledCourses(prev => [...prev, courseId]);
      setSelectedCourseTitle(courseTitle);
      setShowEnrollmentAnimation(true);
    } else {
      toast({
        title: "Enrollment Failed",
        description: message || "An error occurred while enrolling in the course.",
        variant: "destructive",
      });
    }
  };

  const handleAnimationComplete = () => {
    setShowEnrollmentAnimation(false);
    toast({
      title: "Success",
      description: "You have successfully enrolled in the course!",
    });
  };

  const handleContinueCourse = (courseId: number, courseTitle: string) => {
    const videoUrl = getCourseVideoUrl(courseTitle);
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    } else {
      toast({
        title: "Video Not Available",
        description: "The course video is not available at the moment.",
        variant: "destructive",
      });
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || course.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onOpenAuth={handleOpenAuth} />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Skill Development <span className="text-eco-green">Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover courses in coding, farming, handicrafts, and more. Learn new skills, 
              earn certifications, and connect with job opportunities.
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search courses by name, category, or keyword..." 
                className="pl-10 w-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Options
            </Button>
          </div>

          {/* Category tabs */}
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="Coding">Coding</TabsTrigger>
              <TabsTrigger value="Farming">Farming</TabsTrigger>
              <TabsTrigger value="Handicrafts">Handicrafts</TabsTrigger>
              <TabsTrigger value="Design">Design</TabsTrigger>
              <TabsTrigger value="Business">Business</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course listings - 2 columns on large screens */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Book className="mr-2 h-5 w-5 text-eco-green" />
                Available Courses
              </h2>

              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-secondary">
                            {course.category}
                          </Badge>
                          <div className="flex items-center text-amber-500">
                            <Star className="fill-amber-500 h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2">{course.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Users className="h-3 w-3 mr-1" />
                          {course.enrolled} enrolled • {course.level} • {course.duration}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {course.progress > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-1.5" />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-eco-green hover:bg-eco-green-dark"
                          onClick={() => {
                            if (enrolledCourses.includes(course.id)) {
                              handleContinueCourse(course.id, course.title);
                            } else {
                              handleEnrollCourse(course.id, course.title);
                            }
                          }}
                        >
                          {enrolledCourses.includes(course.id) ? 'Continue Learning' : 'Enroll Now'}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No courses found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>

            {/* Sidebar - 1 column on large screens */}
            <div className="space-y-6">
              {/* Job Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Award className="mr-2 h-5 w-5 text-eco-green" />
                    AI Job Recommendations
                  </CardTitle>
                  <CardDescription>Based on your skills and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobRecommendations.map((job) => (
                    <div key={job.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{job.title}</h3>
                        <Badge className="bg-eco-green text-white">{job.match}% Match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      <p className="text-sm">{job.salary}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{job.posted}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto text-eco-green" asChild>
                    <Link to="/jobs">
                      View All Job Matches
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Certifications and Rewards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Award className="mr-2 h-5 w-5 text-eco-green" />
                    Certifications & Rewards
                  </CardTitle>
                  <CardDescription>Complete courses to earn these rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certificationsAndRewards.map((cert) => (
                    <div key={cert.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                      <p className="text-sm text-muted-foreground">{cert.date}</p>
                      <div className="bg-muted p-2 rounded-md mt-2">
                        <p className="text-sm font-medium">Rewards:</p>
                        <ul className="text-xs list-disc pl-4 mt-1">
                          {cert.rewards.map((reward, idx) => (
                            <li key={idx}>{reward}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-eco-green font-medium">{cert.points} XP</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="ml-auto text-eco-green" asChild>
                    <Link to="/rewards">
                      View All Rewards
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Add the animation component */}
      <AnimatePresence>
        {showEnrollmentAnimation && (
          <CourseEnrollmentAnimation 
            onComplete={handleAnimationComplete}
            courseTitle={selectedCourseTitle}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
