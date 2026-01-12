import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Heart, Calendar, Brain, Video, Trophy, Target, Users, Phone, Mail, Clock, Search, Baby, Droplet, Dumbbell } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FitnessTracker from "@/components/FitnessTracker";
import PregnancyTracker from "@/components/PregnancyTracker";
import PeriodTracker from "@/components/PeriodTracker";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HealthChallenges from '@/components/HealthChallenges';
import MentalHealth from '@/components/MentalHealth';
import Telemedicine from '@/components/Telemedicine';

interface HealthTracker {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
}

interface HealthChallenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  reward: string;
  progress: number;
}

interface MentalHealthResource {
  id: string;
  title: string;
  type: "article" | "meditation" | "exercise";
  duration?: string;
  description: string;
}

interface TelemedicineProvider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  availability: string;
  image: string;
}

const mockHealthTrackers: HealthTracker[] = [
  {
    id: "1",
    name: "Fitness Tracker",
    icon: <Activity className="w-6 h-6" />,
    description: "Track your physical activity, steps, and workouts",
    stats: [
      { label: "Steps Today", value: "8,547" },
      { label: "Calories Burned", value: "420" },
      { label: "Active Minutes", value: "45" }
    ]
  },
  {
    id: "2",
    name: "Pregnancy Tracker",
    icon: <Baby className="w-6 h-6" />,
    description: "Monitor your pregnancy journey and milestones",
    stats: [
      { label: "Weeks Pregnant", value: "24" },
      { label: "Due Date", value: "Dec 15, 2024" },
      { label: "Next Checkup", value: "In 2 weeks" }
    ]
  },
  {
    id: "3",
    name: "Period Tracker",
    icon: <Droplet className="w-6 h-6" />,
    description: "Track your menstrual cycle and symptoms",
    stats: [
      { label: "Cycle Length", value: "28 days" },
      { label: "Next Period", value: "In 12 days" },
      { label: "Fertile Window", value: "In 5 days" }
    ]
  }
];

const mockChallenges: HealthChallenge[] = [
  {
    id: "1",
    title: "10K Steps Daily",
    description: "Walk 10,000 steps every day for 30 days",
    participants: 245,
    duration: "30 days",
    reward: "500 points",
    progress: 75
  },
  {
    id: "2",
    title: "Hydration Challenge",
    description: "Drink 8 glasses of water daily",
    participants: 189,
    duration: "14 days",
    reward: "300 points",
    progress: 45
  },
  {
    id: "3",
    title: "Mindfulness Streak",
    description: "Complete 10 minutes of meditation daily",
    participants: 156,
    duration: "21 days",
    reward: "400 points",
    progress: 60
  }
];

const mockMentalHealthResources: MentalHealthResource[] = [
  {
    id: "1",
    title: "Understanding Anxiety",
    type: "article",
    description: "Learn about common anxiety triggers and coping strategies",
  },
  {
    id: "2",
    title: "Guided Meditation",
    type: "meditation",
    duration: "10 min",
    description: "Calm your mind with this guided meditation session",
  },
  {
    id: "3",
    title: "Breathing Exercise",
    type: "exercise",
    duration: "5 min",
    description: "Simple breathing techniques for stress relief",
  }
];

const mockTelemedicineProviders: TelemedicineProvider[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    rating: 4.8,
    experience: "12 years",
    availability: "Available Today",
    image: "https://ui-avatars.com/api/?name=Sarah+Johnson"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Nutritionist",
    rating: 4.9,
    experience: "8 years",
    availability: "Next: 2 PM",
    image: "https://ui-avatars.com/api/?name=Michael+Chen"
  },
  {
    id: "3",
    name: "Dr. Emily Brown",
    specialty: "Mental Health",
    rating: 4.7,
    experience: "15 years",
    availability: "Available Tomorrow",
    image: "https://ui-avatars.com/api/?name=Emily+Brown"
  }
];

const healthFeatures = [
  {
    id: 'fitness',
    title: 'Fitness Tracker',
    description: 'Track your workouts, set goals, and monitor your progress',
    icon: Dumbbell,
    component: FitnessTracker,
  },
  {
    id: 'pregnancy',
    title: 'Pregnancy Tracker',
    description: 'Monitor your pregnancy journey with detailed tracking',
    icon: Heart,
    component: PregnancyTracker,
  },
  {
    id: 'period',
    title: 'Period Tracker',
    description: 'Track your cycle, symptoms, and mood patterns',
    icon: Activity,
    component: PeriodTracker,
  },
  {
    id: 'challenges',
    title: 'Health Challenges',
    description: 'Join challenges, earn points, and stay motivated',
    icon: Trophy,
    component: HealthChallenges,
  },
  {
    id: 'mental',
    title: 'Mental Health',
    description: 'Track mood, journal thoughts, and practice meditation',
    icon: Brain,
    component: MentalHealth,
  },
  {
    id: 'telemedicine',
    title: 'Telemedicine',
    description: 'Connect with doctors and manage prescriptions',
    icon: Video,
    component: Telemedicine,
  },
];

const HealthPage = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
  };

  const handleBack = () => {
    setSelectedFeature(null);
  };

  const selectedFeatureData = healthFeatures.find(f => f.id === selectedFeature);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Health & Wellness</h1>
        {selectedFeature && (
          <button
            onClick={handleBack}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <span className="mr-2">←</span> Back to all features
          </button>
        )}
      </div>

      {selectedFeature ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {selectedFeatureData && <selectedFeatureData.component />}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="p-6 rounded-lg border border-border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">{feature.title}</h2>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthPage; 