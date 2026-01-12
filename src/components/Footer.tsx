
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail,
  MapPin,
  Phone,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-border">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-eco-green flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold">EcoVeda</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Empowering sustainable living through integrated solutions for personal growth, community development, and environmental stewardship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco-green transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/skills" className="text-muted-foreground hover:text-foreground transition-colors">Skill Development</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">Job Portal</Link>
              </li>
              <li>
                <Link to="/food" className="text-muted-foreground hover:text-foreground transition-colors">Food Waste Management</Link>
              </li>
              <li>
                <Link to="/health" className="text-muted-foreground hover:text-foreground transition-colors">Health & Well-being</Link>
              </li>
              <li>
                <Link to="/education" className="text-muted-foreground hover:text-foreground transition-colors">Education & Workshops</Link>
              </li>
              <li>
                <Link to="/rewards" className="text-muted-foreground hover:text-foreground transition-colors">Rewards System</Link>
              </li>
            </ul>
          </div>

          {/* Policy links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/partners" className="text-muted-foreground hover:text-foreground transition-colors">Our Partners</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog & Articles</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest sustainable living tips and resources.
            </p>
            <div className="flex gap-2 mb-6">
              <Input type="email" placeholder="Your email" className="bg-muted/50" />
              <Button variant="default" className="bg-eco-green hover:bg-eco-green-dark">
                Subscribe
              </Button>
            </div>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@ecoveda.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 9848022331</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-border py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} EcoVeda. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            <Link to="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
