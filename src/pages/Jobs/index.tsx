import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ChevronRight,
  Building2,
  Code,
  Leaf,
  Palette,
  Store,
  GraduationCap,
  Heart,
  Globe
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthModal } from '@/components/AuthModal';

// Job categories with icons
const jobCategories = [
  { id: 'all', name: 'All Jobs', icon: Briefcase },
  { id: 'tech', name: 'Technology', icon: Code },
  { id: 'sustainability', name: 'Sustainability', icon: Leaf },
  { id: 'design', name: 'Design & Creative', icon: Palette },
  { id: 'business', name: 'Business', icon: Store },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'healthcare', name: 'Healthcare', icon: Heart },
  { id: 'remote', name: 'Remote', icon: Globe }
];

// Job listings data
const jobs = [
  // Technology Jobs
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "EcoTech Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    category: "tech",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    match: 95,
    posted: "2 days ago",
    description: "Join our mission to build sustainable technology solutions. Lead frontend development for our eco-friendly products.",
    applyUrl: "https://www.linkedin.com/jobs/view/4230263746/?alternateChannel=search&refId=B9f3LZnoA7V%2BYCPrtgeKjw%3D%3D&trackingId=jHgVrujKh1UZ1RLHFSF0tw%3D%3D",
    remote: true
  },
  {
    id: 2,
    title: "Python Data Scientist",
    company: "Green Analytics",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    category: "tech",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
    match: 92,
    posted: "1 week ago",
    description: "Work on environmental data analysis and predictive modeling for climate change solutions.",
    applyUrl: "https://www.linkedin.com/jobs/search/?currentJobId=4234636807&keywords=python%20data%20scientist&origin=SWITCH_SEARCH_VERTICAL",
    remote: true
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Sustainable Cloud",
    location: "New York, NY",
    type: "Full-time",
    salary: "$140,000 - $170,000",
    category: "tech",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    match: 88,
    posted: "3 days ago",
    description: "Build and maintain green cloud infrastructure for sustainable applications.",
    applyUrl: "https://www.linkedin.com/jobs/view/4227655398/?alternateChannel=search&refId=01deedee-58da-49f9-814c-a46f161a0c03&trackingId=9V%2FyYNHpTsy1Y1tZYJ8jRQ%3D%3D",
    remote: false
  },

  // Sustainability Jobs
  {
    id: 4,
    title: "Sustainability Manager",
    company: "Green Earth Corp",
    location: "Portland, OR",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    category: "sustainability",
    skills: ["Environmental Science", "Project Management", "ESG"],
    match: 90,
    posted: "1 day ago",
    description: "Lead sustainability initiatives and implement eco-friendly practices across the organization.",
    applyUrl: "https://www.linkedin.com/jobs/view/sustainability-manager-at-green-earth-corp",
    remote: false
  },
  {
    id: 5,
    title: "Renewable Energy Analyst",
    company: "Solar Future",
    location: "Remote",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    category: "sustainability",
    skills: ["Energy Analysis", "Data Modeling", "Renewable Energy"],
    match: 87,
    posted: "4 days ago",
    description: "Analyze renewable energy projects and optimize solar power systems.",
    applyUrl: "https://www.linkedin.com/jobs/view/renewable-energy-analyst-at-solar-future",
    remote: true
  },

  // Design Jobs
  {
    id: 6,
    title: "Sustainable Product Designer",
    company: "EcoDesign Studio",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    category: "design",
    skills: ["Product Design", "Sustainability", "3D Modeling"],
    match: 93,
    posted: "2 days ago",
    description: "Design eco-friendly products using sustainable materials and circular design principles.",
    applyUrl: "https://www.linkedin.com/jobs/view/sustainable-product-designer-at-ecodesign-studio",
    remote: false
  },
  {
    id: 7,
    title: "UX/UI Designer",
    company: "Green Digital",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    category: "design",
    skills: ["UI/UX", "Figma", "User Research", "Design Systems"],
    match: 91,
    posted: "5 days ago",
    description: "Create user-centered designs for sustainable digital products.",
    applyUrl: "https://www.linkedin.com/jobs/view/ux-ui-designer-at-green-digital",
    remote: true
  },

  // Business Jobs
  {
    id: 8,
    title: "Social Impact Manager",
    company: "Community First",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85,000 - $115,000",
    category: "business",
    skills: ["Social Impact", "Project Management", "Community Engagement"],
    match: 89,
    posted: "3 days ago",
    description: "Lead social impact initiatives and community development programs.",
    applyUrl: "https://www.linkedin.com/jobs/view/social-impact-manager-at-community-first",
    remote: false
  },
  {
    id: 9,
    title: "Sustainable Business Analyst",
    company: "Green Finance",
    location: "Remote",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    category: "business",
    skills: ["Business Analysis", "Sustainability", "Financial Modeling"],
    match: 86,
    posted: "1 week ago",
    description: "Analyze and optimize sustainable business practices and green investments.",
    applyUrl: "https://www.linkedin.com/jobs/view/sustainable-business-analyst-at-green-finance",
    remote: true
  },

  // Education Jobs
  {
    id: 10,
    title: "Environmental Education Coordinator",
    company: "EcoLearn",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    category: "education",
    skills: ["Education", "Environmental Science", "Curriculum Development"],
    match: 94,
    posted: "2 days ago",
    description: "Develop and coordinate environmental education programs for schools and communities.",
    applyUrl: "https://www.linkedin.com/jobs/view/environmental-education-coordinator-at-ecolearn",
    remote: false
  },
  {
    id: 11,
    title: "Online Course Developer",
    company: "Green Academy",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $100,000",
    category: "education",
    skills: ["Instructional Design", "E-learning", "Content Creation"],
    match: 88,
    posted: "4 days ago",
    description: "Create engaging online courses focused on sustainability and environmental education.",
    applyUrl: "https://www.linkedin.com/jobs/view/online-course-developer-at-green-academy",
    remote: true
  },

  // Healthcare Jobs
  {
    id: 12,
    title: "Environmental Health Specialist",
    company: "Health & Environment",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    category: "healthcare",
    skills: ["Public Health", "Environmental Science", "Research"],
    match: 92,
    posted: "1 day ago",
    description: "Research and address environmental factors affecting public health.",
    applyUrl: "https://www.linkedin.com/jobs/view/environmental-health-specialist-at-health-environment",
    remote: false
  },
  {
    id: 13,
    title: "Sustainable Healthcare Consultant",
    company: "Green Health",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    category: "healthcare",
    skills: ["Healthcare", "Sustainability", "Consulting"],
    match: 87,
    posted: "3 days ago",
    description: "Advise healthcare organizations on implementing sustainable practices.",
    applyUrl: "https://www.linkedin.com/jobs/view/sustainable-healthcare-consultant-at-green-health",
    remote: true
  }
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleOpenAuth = () => {
    setIsAuthOpen(true);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
    const matchesRemote = !showRemoteOnly || job.remote;

    return matchesSearch && matchesCategory && matchesRemote;
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
              Find Your <span className="text-eco-green">Dream Job</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover opportunities in sustainability, technology, and more. 
              Connect with companies making a positive impact.
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search jobs by title, company, or skills..." 
                className="pl-10 w-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant={showRemoteOnly ? "default" : "outline"} 
              className="flex items-center gap-2"
              onClick={() => setShowRemoteOnly(!showRemoteOnly)}
            >
              <Globe className="h-4 w-4" />
              {showRemoteOnly ? "Remote Only" : "All Jobs"}
            </Button>
          </div>

          {/* Category tabs */}
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full">
              {jobCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Job listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl line-clamp-2">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge className="bg-eco-green text-white">{job.match}% Match</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      {/* Job Details */}
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.remote ? 'Remote' : job.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          {job.type} • Posted {job.posted}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="text-sm font-semibold mb-1">Description</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                      </div>

                      {/* Eligibility Criteria */}
                      <div>
                        <h4 className="text-sm font-semibold mb-1">Eligibility</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Bachelor's degree in related field</li>
                          <li>3+ years of relevant experience</li>
                          <li>Strong communication skills</li>
                          <li>Passion for sustainability</li>
                        </ul>
                      </div>

                      {/* Required Skills */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      className="w-full bg-eco-green hover:bg-eco-green-dark"
                      onClick={() => window.open(job.applyUrl, '_blank')}
                    >
                      Apply Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full">
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No jobs found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                      setShowRemoteOnly(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
} 