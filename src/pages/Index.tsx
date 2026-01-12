import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeatureSection } from '@/components/FeatureSection';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { useToast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Users, Target, Heart, Lightbulb, Globe, Sparkles } from "lucide-react";
import ChatBot from "@/components/ChatBot";

export default function Index() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { toast } = useToast();
  
  const handleOpenAuth = () => {
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onOpenAuth={handleOpenAuth} />
      
      {/* Marquee Text */}
      {/* <div className="bg-eco-green text-white py-2 mt-16">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda • 
            Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda
          </div>
          <div className="animate-marquee2 inline-block">
            Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda • 
            Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda • Welcome to EcoVeda
          </div>
        </div>
      </div> */}

      <main className="flex-grow">
        <Hero onOpenAuth={handleOpenAuth} />
        <FeatureSection />
        <ChatBot />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

const features = [
  {
    title: "Sustainable Living",
    description: "Learn practical tips and strategies for reducing your environmental footprint.",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    title: "Community Support",
    description: "Connect with like-minded individuals and share your sustainability journey.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Goal Tracking",
    description: "Set and track your sustainability goals with our interactive tools.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "Health & Wellness",
    description: "Discover how sustainable living contributes to your overall well-being.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Innovation Hub",
    description: "Stay updated with the latest sustainable technologies and practices.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "Global Impact",
    description: "Join a worldwide movement dedicated to environmental conservation.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Rewards Program",
    description: "Earn points and rewards for your sustainable actions and achievements.",
    icon: <Sparkles className="w-6 h-6" />,
  },
];
