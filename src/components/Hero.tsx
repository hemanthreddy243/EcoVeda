import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, User, Heart, Briefcase, Book } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  { name: 'Eco-Friendly Living', icon: Leaf, color: 'text-eco-green' },
  { name: 'Personal Growth', icon: User, color: 'text-eco-earth' },
  { name: 'Health & Wellness', icon: Heart, color: 'text-rose-500' },
  { name: 'Career Advancement', icon: Briefcase, color: 'text-blue-500' },
  { name: 'Education & Skills', icon: Book, color: 'text-amber-500' },
];

export function Hero({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-noise">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-eco-cream to-transparent opacity-40 dark:opacity-10"></div>
      
      {/* Green leaf pattern (decorative) */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none opacity-10 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843')] bg-no-repeat bg-cover bg-right-top"></div>
      
      <div className="container relative mx-auto px-4 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Hero content */}
        <div className="flex-1 max-w-2xl opacity-0 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-eco-green text-eco-green text-xs font-medium uppercase tracking-wider bg-eco-green/10 animate-slide-up">
            Sustainable Living Platform
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-balance mb-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
            Harmonize Your Life With 
            <span className="text-eco-green dark:text-eco-green-light"> EcoVeda</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-slide-up" style={{animationDelay: '0.4s'}}>
            Join a thriving community that empowers sustainable living, skill development, and meaningful progress for a better tomorrow.
          </p>
          
          {/* Feature rotation */}
          <div className="h-10 mb-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={cn(
                  "absolute transition-all duration-500 flex items-center gap-2",
                  currentFeature === index 
                    ? "opacity-100 transform-none" 
                    : "opacity-0 translate-y-4"
                )}
              >
                <feature.icon className={cn("h-6 w-6", feature.color)} />
                <span className="font-medium">{feature.name}</span>
              </div>
            ))}
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Button 
              onClick={onOpenAuth} 
              size="lg" 
              className="bg-eco-green hover:bg-eco-green-dark text-white"
            >
              Join EcoVeda <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-eco-green text-eco-green hover:bg-eco-green/10 dark:border-eco-green-light dark:text-eco-green-light"
            >
              Explore Features
            </Button>
          </div>
        </div>
        
        {/* Hero image */}
        <div className="flex-1 w-full max-w-lg lg:max-w-md xl:max-w-lg opacity-0 animate-slide-in-right" style={{animationDelay: '0.7s', animationFillMode: 'forwards'}}>
          <div className="relative">
            {/* Main image with glass effect */}
            <div className="glass-card dark:glass-card-dark rounded-[2rem] overflow-hidden shadow-xl bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-white/10 p-8">
              <img 
                src={`${window.location.origin}/ecoveda-logo.png`}
                alt="EcoVeda - A Holistic Solution for Sustainable Development Goals" 
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl bg-eco-earth/10 backdrop-blur-md border border-eco-earth/20 animate-pulse-slow"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-eco-green/10 backdrop-blur-md border border-eco-green/20"></div>
            
            {/* Stats badge */}
            <div className="absolute -bottom-4 right-8 glass-card dark:glass-card-dark rounded-lg p-3 shadow-lg">
              <div className="text-xs text-muted-foreground">Growing Community</div>
              <div className="text-xl font-bold">10,000<span className="text-eco-green">+</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
