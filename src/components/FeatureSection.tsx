
import React from "react";
import { motion } from "framer-motion";
import { 
  Book, 
  Briefcase, 
  Apple, 
  Heart, 
  GraduationCap, 
  Users, 
  Building, 
  Trophy,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  link: string;
}

const features: Feature[] = [
  {
    title: "Skill Development",
    description: "Access courses in coding, farming, handicrafts and more with gamified learning modules.",
    icon: Book,
    color: "bg-blue-50 text-blue-500 border-blue-100 dark:bg-blue-950 dark:border-blue-900",
    link: "/skills"
  },
  {
    title: "Job Portal",
    description: "Find opportunities with AI-driven job matching and microfinance support.",
    icon: Briefcase,
    color: "bg-amber-50 text-amber-500 border-amber-100 dark:bg-amber-950 dark:border-amber-900",
    link: "/jobs"
  },
  {
    title: "Food Waste Management",
    description: "Donate food, locate cold storage, and plan meals to reduce waste.",
    icon: Apple,
    color: "bg-green-50 text-green-500 border-green-100 dark:bg-green-950 dark:border-green-900",
    link: "/food"
  },
  {
    title: "Health & Well-being",
    description: "Track fitness, pregnancy, and engage with gamified health challenges.",
    icon: Heart,
    color: "bg-rose-50 text-rose-500 border-rose-100 dark:bg-rose-950 dark:border-rose-900",
    link: "/health"
  },
  {
    title: "Education & Workshops",
    description: "Access free educational resources and attend online/offline workshops.",
    icon: GraduationCap,
    color: "bg-purple-50 text-purple-500 border-purple-100 dark:bg-purple-950 dark:border-purple-900",
    link: "/education"
  },
  {
    title: "Women Empowerment",
    description: "Participate in awareness campaigns and entrepreneurship support programs.",
    icon: Users,
    color: "bg-pink-50 text-pink-500 border-pink-100 dark:bg-pink-950 dark:border-pink-900",
    link: "/gender-equality"
  },
  {
    title: "Sustainable Communities",
    description: "Engage with local initiatives, forums, and transportation solutions.",
    icon: Building,
    color: "bg-teal-50 text-teal-500 border-teal-100 dark:bg-teal-950 dark:border-teal-900",
    link: "/community"
  },
  {
    title: "Gamification & Rewards",
    description: "Earn badges, compete on leaderboards, and redeem valuable rewards.",
    icon: Trophy,
    color: "bg-orange-50 text-orange-500 border-orange-100 dark:bg-orange-950 dark:border-orange-900",
    link: "/rewards"
  },
];

export function FeatureSection() {
  return (
    <section className="relative py-20 bg-secondary dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Integrated Platform for
            <span className="text-eco-green dark:text-eco-green-light"> Sustainable Living</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            EcoVeda brings together all aspects of sustainable living in one seamless platform, 
            empowering you to make positive changes in your life and community.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link 
              to={feature.link} 
              key={feature.title}
              className="group focus:outline-none focus:ring-2 focus:ring-eco-green focus:ring-offset-2 rounded-xl"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-border hover:border-eco-green/30 dark:hover:border-eco-green/50 bg-card/50 backdrop-blur-sm">
                <div className="p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow mb-4">{feature.description}</p>
                  
                  {/* Action */}
                  <div className="flex items-center text-sm font-medium text-eco-green dark:text-eco-green-light opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/dashboard">
              View All Features <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
