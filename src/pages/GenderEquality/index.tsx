import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Megaphone, 
  Trophy, 
  Briefcase, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Heart, 
  Search, 
  Filter, 
  Share2, 
  Calendar, 
  Video, 
  Image, 
  FileText, 
  Star, 
  Target, 
  Award, 
  Building2, 
  Lightbulb, 
  Handshake,
  Clock,
  MapPin,
  MessageSquare,
  User,
  CheckCircle2,
  Sparkles,
  Rocket,
  Brain,
  BookMarked,
  GraduationCap as GraduationCapIcon
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Campaign {
  id: string;
  title: string;
  description: string;
  type: "video" | "infographic" | "story";
  startDate: string;
  endDate: string;
  participants: number;
  status: "ongoing" | "upcoming";
  image: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: string;
  points: number;
  participants: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface Business {
  id: string;
  name: string;
  owner: string;
  category: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
}

interface Program {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "training" | "mentorship";
  startDate: string;
  duration: string;
  spots: number;
  registered: number;
  price: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizState {
  currentQuestion: number;
  answers: number[];
  score: number;
  timeRemaining: number;
}

interface BusinessContact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ProgramRegistration {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "toolkit" | "research" | "case-study" | "webinar";
  category: string;
  link: string;
  icon: React.ReactNode;
  date: string;
  author?: string;
  duration?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Breaking Glass Ceilings",
    description: "A campaign celebrating women's achievements in leadership and inspiring future generations",
    type: "video",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    participants: 1234,
    status: "ongoing",
    image: "https://ui-avatars.com/api/?name=Breaking+Glass+Ceilings"
  },
  {
    id: "2",
    title: "Women in Tech",
    description: "Highlighting women's contributions to technology and encouraging more girls to pursue STEM careers",
    type: "infographic",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    participants: 856,
    status: "upcoming",
    image: "https://ui-avatars.com/api/?name=Women+in+Tech"
  },
  {
    id: "3",
    title: "Equal Pay Day",
    description: "Raising awareness about the gender pay gap and advocating for equal compensation",
    type: "story",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    participants: 2345,
    status: "ongoing",
    image: "https://ui-avatars.com/api/?name=Equal+Pay+Day"
  },
  {
    id: "4",
    title: "Women in STEM",
    description: "Promoting women's participation in Science, Technology, Engineering, and Mathematics",
    type: "video",
    startDate: "2024-04-15",
    endDate: "2024-05-15",
    participants: 1567,
    status: "upcoming",
    image: "https://ui-avatars.com/api/?name=Women+in+STEM"
  },
  {
    id: "5",
    title: "Women Entrepreneurs",
    description: "Supporting and celebrating women entrepreneurs and their business ventures",
    type: "infographic",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    participants: 987,
    status: "upcoming",
    image: "https://ui-avatars.com/api/?name=Women+Entrepreneurs"
  },
  {
    id: "6",
    title: "Women in Politics",
    description: "Encouraging women's participation in political leadership and decision-making",
    type: "story",
    startDate: "2024-05-15",
    endDate: "2024-06-15",
    participants: 1123,
    status: "upcoming",
    image: "https://ui-avatars.com/api/?name=Women+in+Politics"
  }
];

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Women's History Month",
    description: "Test your knowledge about women's contributions to history",
    questions: 10,
    duration: "15 min",
    points: 100,
    participants: 2345,
    difficulty: "intermediate"
  },
  {
    id: "2",
    title: "Gender Equality Basics",
    description: "Learn about fundamental concepts of gender equality",
    questions: 8,
    duration: "10 min",
    points: 80,
    participants: 1890,
    difficulty: "beginner"
  }
];

const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "EcoFashion Boutique",
    owner: "Sarah Chen",
    category: "Fashion",
    description: "Sustainable fashion brand promoting ethical manufacturing",
    location: "New York, NY",
    rating: 4.8,
    reviews: 156,
    image: "https://ui-avatars.com/api/?name=EcoFashion+Boutique"
  },
  {
    id: "2",
    name: "TechStart Solutions",
    owner: "Maria Rodriguez",
    category: "Technology",
    description: "Innovative tech solutions for small businesses",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 89,
    image: "https://ui-avatars.com/api/?name=TechStart+Solutions"
  }
];

const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Leadership Development",
    description: "Comprehensive training program for women in leadership positions",
    type: "training",
    startDate: "2024-04-15",
    duration: "8 weeks",
    spots: 30,
    registered: 25,
    price: "$299"
  },
  {
    id: "2",
    title: "Digital Skills Workshop",
    description: "Learn essential digital skills for the modern workplace",
    type: "workshop",
    startDate: "2024-04-20",
    duration: "2 days",
    spots: 20,
    registered: 15,
    price: "$149"
  }
];

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Gender Equality Guide",
    description: "Comprehensive guide to understanding gender equality in the workplace",
    type: "toolkit",
    category: "toolkits",
    link: "https://www.unwomen.org/en/digital-library/publications/2020/06/gender-equality-in-the-workplace",
    icon: <FileText className="w-6 h-6" />,
    date: "2024-03-15",
    author: "UN Women"
  },
  {
    id: "2",
    title: "Women in Leadership",
    description: "Video series featuring successful women leaders sharing their experiences",
    type: "video",
    category: "videos",
    link: "https://www.youtube.com/playlist?list=PLxV9sWI37OndXgGXgQzqQzQzQzQzQzQzQ",
    icon: <Video className="w-6 h-6" />,
    date: "2024-03-10",
    duration: "45 min"
  },
  {
    id: "3",
    title: "Breaking the Glass Ceiling",
    description: "Research paper on women's advancement in corporate leadership",
    type: "research",
    category: "research",
    link: "https://hbr.org/2020/03/breaking-the-glass-ceiling",
    icon: <BookOpen className="w-6 h-6" />,
    date: "2024-03-05",
    author: "Harvard Business Review"
  },
  {
    id: "4",
    title: "Women Entrepreneurs Toolkit",
    description: "Essential resources for women starting their own businesses",
    type: "toolkit",
    category: "toolkits",
    link: "https://www.womenentrepreneurs.org/toolkit",
    icon: <Briefcase className="w-6 h-6" />,
    date: "2024-03-01",
    author: "Women Entrepreneurs Association"
  },
  {
    id: "5",
    title: "Gender Pay Gap Analysis",
    description: "Interactive data visualization of the gender pay gap across industries",
    type: "case-study",
    category: "case-studies",
    link: "https://www.genderpaygap.com/analysis",
    icon: <Target className="w-6 h-6" />,
    date: "2024-02-28",
    author: "Gender Equality Institute"
  },
  {
    id: "6",
    title: "Women in Tech Webinar",
    description: "Live discussion on challenges and opportunities for women in technology",
    type: "webinar",
    category: "videos",
    link: "https://www.womenintech.com/webinar",
    icon: <Video className="w-6 h-6" />,
    date: "2024-02-25",
    duration: "60 min"
  }
];

const RegistrationAnimation = ({ onComplete }: { onComplete: () => void }) => {
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
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex justify-center mb-6"
        >
          <Sparkles className="w-16 h-16 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-center mb-4"
        >
          Welcome to the Campaign!
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span>Registration Successful</span>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>You're now part of the movement</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-blue-500" />
            <span>Get ready for exclusive updates</span>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500" />
            <span>Thank you for your support!</span>
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
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue
          </Button>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-4 -right-4"
        >
          <Award className="w-24 h-24 text-primary/20" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProgramRegistrationAnimation = ({ onComplete }: { onComplete: () => void }) => {
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
          <GraduationCapIcon className="w-16 h-16 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-center mb-4"
        >
          Welcome to the Program!
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span>Registration Successful</span>
          </div>
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-blue-500" />
            <span>Your learning journey begins</span>
          </div>
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-500" />
            <span>Access to exclusive resources</span>
          </div>
          <div className="flex items-center gap-3">
            <BookMarked className="w-6 h-6 text-orange-500" />
            <span>Course materials unlocked</span>
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
            className="bg-primary text-primary-foreground hover:bg-primary/90"
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
          <Lightbulb className="w-24 h-24 text-primary/20" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute -top-4 -left-4"
        >
          <BookOpen className="w-24 h-24 text-primary/20" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const GenderEqualityPage = () => {
  const [selectedTab, setSelectedTab] = useState<"campaigns" | "quizzes" | "business" | "programs" | "community" | "resources" | "mentorship">("campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Dialog states
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showStoryDialog, setShowStoryDialog] = useState(false);
  const [showDiscussionDialog, setShowDiscussionDialog] = useState(false);
  const [showMentorDialog, setShowMentorDialog] = useState(false);
  const [showBusinessContactDialog, setShowBusinessContactDialog] = useState(false);
  const [showProgramRegistrationDialog, setShowProgramRegistrationDialog] = useState(false);
  
  // Form states
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    type: "video",
  });
  
  const [storyForm, setStoryForm] = useState({
    title: "",
    content: "",
    category: "",
  });
  
  const [discussionForm, setDiscussionForm] = useState({
    title: "",
    content: "",
    tags: "",
  });
  
  const [mentorForm, setMentorForm] = useState({
    name: "",
    expertise: "",
    experience: "",
    availability: "",
  });

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    timeRemaining: 600, // 10 minutes in seconds
  });

  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const [businessContactForm, setBusinessContactForm] = useState<BusinessContact>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [programRegistrationForm, setProgramRegistrationForm] = useState<ProgramRegistration>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    goals: "",
  });

  // Sample quiz questions
  const quizQuestions: Record<string, QuizQuestion[]> = {
    "1": [
      {
        id: "1",
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Mother Teresa", "Jane Addams", "Pearl S. Buck"],
        correctAnswer: 0,
      },
      {
        id: "2",
        question: "Which country was the first to grant women the right to vote?",
        options: ["United States", "United Kingdom", "New Zealand", "France"],
        correctAnswer: 2,
      },
      // Add more questions...
    ],
    "2": [
      {
        id: "1",
        question: "What is the gender pay gap?",
        options: [
          "The difference in average earnings between men and women",
          "The difference in working hours between men and women",
          "The difference in job opportunities between men and women",
          "The difference in education levels between men and women"
        ],
        correctAnswer: 0,
      },
      // Add more questions...
    ],
  };

  const [showRegistrationAnimation, setShowRegistrationAnimation] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [showProgramRegistrationAnimation, setShowProgramRegistrationAnimation] = useState(false);

  // Handlers for campaign participation
  const handleCampaignParticipate = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setShowRegistrationAnimation(true);
  };

  const handleCampaignShare = (campaignId: string) => {
    toast({
      title: "Share Campaign",
      description: "Campaign link copied to clipboard!",
    });
  };

  // Handlers for quiz participation
  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId);
    setShowQuizDialog(true);
    setQuizState({
      currentQuestion: 0,
      answers: [],
      score: 0,
      timeRemaining: 600,
    });
  };

  // Handlers for business interaction
  const handleBusinessContact = (businessId: string) => {
    setSelectedBusiness(businessId);
    setShowBusinessContactDialog(true);
  };

  // Handlers for program registration
  const handleProgramRegister = (programId: string) => {
    setSelectedProgram(programId);
    setShowProgramRegistrationAnimation(true);
  };

  // Handlers for community features
  const handleStartDiscussion = () => {
    setShowDiscussionDialog(true);
  };

  const handleShareStory = () => {
    setShowStoryDialog(true);
  };

  // Handlers for resource interaction
  const handleResourceDownload = (resourceId: string) => {
    toast({
      title: "Download Started",
      description: "Your resource is being downloaded.",
    });
  };

  const handleResourceWatch = (resourceId: string) => {
    toast({
      title: "Video Started",
      description: "Opening video player...",
    });
  };

  // Handlers for mentorship
  const handleApplyMentor = () => {
    setShowMentorDialog(true);
  };

  const handleSearchMentors = () => {
    toast({
      title: "Search Initiated",
      description: "Finding mentors in your field...",
    });
  };

  // Form submission handlers
  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Campaign Created",
      description: "Your campaign has been successfully created.",
    });
    setShowCampaignDialog(false);
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Story Shared",
      description: "Your story has been successfully shared with the community.",
    });
    setShowStoryDialog(false);
  };

  const handleDiscussionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Discussion Started",
      description: "Your discussion has been successfully created.",
    });
    setShowDiscussionDialog(false);
  };

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Your mentor application has been submitted successfully.",
    });
    setShowMentorDialog(false);
  };

  // Business contact handlers
  const handleBusinessContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Contact Request Sent",
      description: "The business owner will contact you soon.",
    });
    setShowBusinessContactDialog(false);
    setBusinessContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  // Program registration handlers
  const handleProgramRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful",
      description: "You have been registered for the program. Check your email for details.",
    });
    setShowProgramRegistrationDialog(false);
    setProgramRegistrationForm({
      name: "",
      email: "",
      phone: "",
      experience: "",
      goals: "",
    });
  };

  // Quiz handlers
  const handleAnswerQuestion = (answerIndex: number) => {
    if (!selectedQuiz) return;

    const newAnswers = [...quizState.answers, answerIndex];
    const isCorrect = answerIndex === quizQuestions[selectedQuiz][quizState.currentQuestion].correctAnswer;
    const newScore = isCorrect ? quizState.score + 10 : quizState.score;

    setQuizState({
      ...quizState,
      answers: newAnswers,
      score: newScore,
    });

    if (quizState.currentQuestion < quizQuestions[selectedQuiz].length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      // Quiz completed
      toast({
        title: "Quiz Completed!",
        description: `Your score: ${newScore}/${quizQuestions[selectedQuiz].length * 10}`,
      });
      setShowQuizDialog(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (showQuizDialog && quizState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    } else if (quizState.timeRemaining === 0) {
      toast({
        title: "Time's Up!",
        description: "The quiz has ended. Your score has been recorded.",
      });
      setShowQuizDialog(false);
    }
  }, [showQuizDialog, quizState.timeRemaining]);

  const handleAnimationComplete = () => {
    setShowRegistrationAnimation(false);
    toast({
      title: "Success",
      description: "You have successfully joined the campaign!",
    });
  };

  const handleProgramAnimationComplete = () => {
    setShowProgramRegistrationAnimation(false);
    setShowProgramRegistrationDialog(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Women Empowerment</h1>
          <p className="text-muted-foreground">Empowering women through education, support, and community</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setSelectedTab("campaigns")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "campaigns"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Awareness Campaigns
          </button>
          <button
            onClick={() => setSelectedTab("quizzes")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "quizzes"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Quizzes & Challenges
          </button>
          <button
            onClick={() => setSelectedTab("business")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "business"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Women Entrepreneurs
          </button>
          <button
            onClick={() => setSelectedTab("programs")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "programs"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Skill Development
          </button>
          <button
            onClick={() => setSelectedTab("community")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "community"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Community Support
          </button>
          <button
            onClick={() => setSelectedTab("resources")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "resources"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Resource Library
          </button>
          <button
            onClick={() => setSelectedTab("mentorship")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "mentorship"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mentorship
          </button>
        </div>

        {/* Awareness Campaigns Section */}
        {selectedTab === "campaigns" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCampaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{campaign.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{campaign.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === "ongoing" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}>
                      {campaign.status === "ongoing" ? "Ongoing" : "Upcoming"}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {campaign.type}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{campaign.participants} participants</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleCampaignParticipate(campaign.id)}
                      className="flex-1"
                    >
                      Participate
                    </Button>
                    <Button 
                      onClick={() => handleCampaignShare(campaign.id)}
                      variant="outline"
                      size="icon"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quizzes & Challenges Section */}
        {selectedTab === "quizzes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockQuizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Target className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{quiz.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{quiz.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{quiz.participants} participants</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-primary">{quiz.points} points</span>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Quiz
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Women Entrepreneurs Section */}
        {selectedTab === "business" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockBusinesses.map((business) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{business.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Owner: {business.owner}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{business.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {business.category}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4" />
                      <span>{business.rating} ({business.reviews} reviews)</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBusinessContact(business.id)}
                    className="w-full"
                  >
                    Contact Business
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skill Development Programs Section */}
        {selectedTab === "programs" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{program.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {program.type}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Starts: {program.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{program.registered}/{program.spots} spots filled</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-primary">{program.price}</span>
                  </div>
                  <Button
                    onClick={() => handleProgramRegister(program.id)}
                    className="w-full"
                  >
                    Register Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Community Support Section */}
        {selectedTab === "community" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Discussion Board */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Discussion Board</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>Share your thoughts and connect with others</span>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Start a Discussion
                </button>
              </div>
            </div>

            {/* Success Stories */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Success Stories</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Share your journey and inspire others
                </p>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Share Your Story
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resource Library Section */}
        {selectedTab === "resources" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="p-2 rounded-lg border border-input bg-background"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="articles">Articles</option>
                  <option value="videos">Videos</option>
                  <option value="toolkits">Toolkits</option>
                  <option value="research">Research</option>
                  <option value="case-studies">Case Studies</option>
                  <option value="webinars">Webinars</option>
                </select>
              </div>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResources
                .filter(resource => 
                  (selectedCategory === "all" || resource.category === selectedCategory) &&
                  (searchQuery === "" || 
                   resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {resource.icon}
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">{resource.title}</h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                        {resource.type}
                      </span>
                      {resource.duration && (
                        <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                          {resource.duration}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{resource.date}</span>
                      </div>
                      {resource.author && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{resource.author}</span>
                        </div>
                      )}
                    </div>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-center"
                    >
                      {resource.type === "video" || resource.type === "webinar" ? "Watch Now" : "View Resource"}
                    </a>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Mentorship Section */}
        {selectedTab === "mentorship" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Become a Mentor */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Become a Mentor</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Share your expertise and help others grow
                </p>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Apply as Mentor
                </button>
              </div>
            </div>

            {/* Find a Mentor */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Find a Mentor</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Connect with experienced professionals in your field
                </p>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Search Mentors
                </button>
              </div>
            </div>

            {/* Mentorship Programs */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Mentorship Programs</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Join structured mentorship programs for specific industries
                </p>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  View Programs
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Campaign Participation Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Campaign</DialogTitle>
            <DialogDescription>
              Fill out the form below to participate in this campaign.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCampaignSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Title</label>
              <Input
                value={campaignForm.title}
                onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                placeholder="Enter campaign title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={campaignForm.description}
                onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                placeholder="Describe your campaign"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Story Sharing Dialog */}
      <Dialog open={showStoryDialog} onOpenChange={setShowStoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Story</DialogTitle>
            <DialogDescription>
              Inspire others by sharing your journey.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStorySubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={storyForm.title}
                onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                placeholder="Enter story title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={storyForm.content}
                onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                placeholder="Share your story"
              />
            </div>
            <Button type="submit">Share Story</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Discussion Dialog */}
      <Dialog open={showDiscussionDialog} onOpenChange={setShowDiscussionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start a Discussion</DialogTitle>
            <DialogDescription>
              Create a new discussion topic.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDiscussionSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Topic</label>
              <Input
                value={discussionForm.title}
                onChange={(e) => setDiscussionForm({ ...discussionForm, title: e.target.value })}
                placeholder="Enter discussion topic"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={discussionForm.content}
                onChange={(e) => setDiscussionForm({ ...discussionForm, content: e.target.value })}
                placeholder="Write your discussion"
              />
            </div>
            <Button type="submit">Start Discussion</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mentor Application Dialog */}
      <Dialog open={showMentorDialog} onOpenChange={setShowMentorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply as Mentor</DialogTitle>
            <DialogDescription>
              Share your expertise and help others grow.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMentorSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={mentorForm.name}
                onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Expertise</label>
              <Input
                value={mentorForm.expertise}
                onChange={(e) => setMentorForm({ ...mentorForm, expertise: e.target.value })}
                placeholder="Enter your expertise"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Experience</label>
              <Textarea
                value={mentorForm.experience}
                onChange={(e) => setMentorForm({ ...mentorForm, experience: e.target.value })}
                placeholder="Describe your experience"
              />
            </div>
            <Button type="submit">Submit Application</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Business Contact Dialog */}
      <Dialog open={showBusinessContactDialog} onOpenChange={setShowBusinessContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Business</DialogTitle>
            <DialogDescription>
              Fill out the form below to get in touch with the business owner.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBusinessContactSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={businessContactForm.name}
                onChange={(e) => setBusinessContactForm({ ...businessContactForm, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={businessContactForm.email}
                onChange={(e) => setBusinessContactForm({ ...businessContactForm, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={businessContactForm.phone}
                onChange={(e) => setBusinessContactForm({ ...businessContactForm, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={businessContactForm.message}
                onChange={(e) => setBusinessContactForm({ ...businessContactForm, message: e.target.value })}
                placeholder="Enter your message"
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Program Registration Dialog */}
      <Dialog open={showProgramRegistrationDialog} onOpenChange={setShowProgramRegistrationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Program Registration</DialogTitle>
            <DialogDescription>
              Fill out the form below to register for the program.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProgramRegistrationSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={programRegistrationForm.name}
                onChange={(e) => setProgramRegistrationForm({ ...programRegistrationForm, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={programRegistrationForm.email}
                onChange={(e) => setProgramRegistrationForm({ ...programRegistrationForm, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={programRegistrationForm.phone}
                onChange={(e) => setProgramRegistrationForm({ ...programRegistrationForm, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Experience</label>
              <Textarea
                value={programRegistrationForm.experience}
                onChange={(e) => setProgramRegistrationForm({ ...programRegistrationForm, experience: e.target.value })}
                placeholder="Describe your relevant experience"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Goals</label>
              <Textarea
                value={programRegistrationForm.goals}
                onChange={(e) => setProgramRegistrationForm({ ...programRegistrationForm, goals: e.target.value })}
                placeholder="What do you hope to achieve from this program?"
                required
              />
            </div>
            <Button type="submit">Register</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quiz in Progress</DialogTitle>
            <DialogDescription>
              Time Remaining: {Math.floor(quizState.timeRemaining / 60)}:{(quizState.timeRemaining % 60).toString().padStart(2, '0')}
            </DialogDescription>
          </DialogHeader>
          {selectedQuiz && quizQuestions[selectedQuiz] && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  Question {quizState.currentQuestion + 1} of {quizQuestions[selectedQuiz].length}
                </h3>
                <p className="text-lg">
                  {quizQuestions[selectedQuiz][quizState.currentQuestion].question}
                </p>
              </div>
              <div className="grid gap-4">
                {quizQuestions[selectedQuiz][quizState.currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left"
                    onClick={() => handleAnswerQuestion(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Score: {quizState.score}
                </span>
                <span className="text-sm text-muted-foreground">
                  Progress: {quizState.currentQuestion + 1}/{quizQuestions[selectedQuiz].length}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Registration Animation */}
      <AnimatePresence>
        {showRegistrationAnimation && (
          <RegistrationAnimation onComplete={handleAnimationComplete} />
        )}
      </AnimatePresence>

      {/* Program Registration Animation */}
      <AnimatePresence>
        {showProgramRegistrationAnimation && (
          <ProgramRegistrationAnimation onComplete={handleProgramAnimationComplete} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenderEqualityPage; 