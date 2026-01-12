import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Car,
  Trophy,
  Leaf,
  Lightbulb,
  Heart,
  Calendar,
  Video,
  Search,
  Filter,
  Clock,
  Star,
  Building2,
  TreePine,
  Recycle,
  Zap,
  Share2,
  MessageSquare
} from "lucide-react";
import CustomGoogleMap from '@/components/GoogleMap';

interface Initiative {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  participants: number;
  status: "active" | "proposed";
  image: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "virtual";
  attendees: number;
  maxCapacity: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  points: number;
  progress: number;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "product" | "service";
  rating: number;
  reviews: number;
  image: string;
}

// Mock data
const mockInitiatives: Initiative[] = [
  {
    id: "1",
    title: "Community Garden Project",
    description: "Transform unused spaces into thriving community gardens",
    location: "Central Park Area",
    category: "Urban Gardening",
    participants: 45,
    status: "active",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
  },
  {
    id: "2",
    title: "Solar Panel Installation",
    description: "Group buying program for residential solar panels",
    location: "Riverside District",
    category: "Renewable Energy",
    participants: 78,
    status: "active",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276"
  },
  {
    id: "3",
    title: "Zero Waste Initiative",
    description: "Implementing community-wide waste reduction strategies",
    location: "Downtown Area",
    category: "Waste Management",
    participants: 120,
    status: "active",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
  }
];

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Monthly Sustainability Forum",
    description: "Discuss and plan upcoming community initiatives",
    date: "2024-03-25",
    time: "18:00",
    location: "Community Center",
    type: "in-person",
    attendees: 28,
    maxCapacity: 50
  },
  {
    id: "2",
    title: "Green Building Workshop",
    description: "Learn about sustainable architecture and home improvements",
    date: "2024-03-28",
    time: "14:00",
    location: "Virtual Meeting",
    type: "virtual",
    attendees: 65,
    maxCapacity: 100
  }
];

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "30-Day Energy Challenge",
    description: "Reduce your household energy consumption",
    participants: 234,
    duration: "30 days",
    points: 500,
    progress: 75
  },
  {
    id: "2",
    title: "Tree Planting Drive",
    description: "Help plant 1000 trees in our community",
    participants: 189,
    duration: "3 months",
    points: 1000,
    progress: 45
  }
];

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Sustainable Living Guide",
    description: "Comprehensive guide to reducing your environmental impact",
    type: "guide",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
  },
  {
    id: "2",
    title: "EcoMarket",
    description: "Marketplace for local, eco-friendly products",
    type: "service",
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e"
  }
];

const CommunityPage = () => {
  const [selectedTab, setSelectedTab] = useState<
    "initiatives" | "events" | "transport" | "challenges" | "resources" | "innovations" | "volunteer"
  >("initiatives");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Sustainable Communities</h1>
          <p className="text-muted-foreground">Building a greener future together through local action and innovation</p>
        </motion.div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search initiatives, events, or resources..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 rounded-lg border border-input bg-background flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setSelectedTab("initiatives")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "initiatives"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Local Initiatives
          </button>
          <button
            onClick={() => setSelectedTab("events")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "events"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Forums & Events
          </button>
          <button
            onClick={() => setSelectedTab("transport")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "transport"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Transport
          </button>
          <button
            onClick={() => setSelectedTab("challenges")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "challenges"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Green Challenges
          </button>
          <button
            onClick={() => setSelectedTab("resources")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "resources"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setSelectedTab("innovations")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "innovations"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Smart City
          </button>
          <button
            onClick={() => setSelectedTab("volunteer")}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              selectedTab === "volunteer"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Volunteer
          </button>
        </div>

        {/* Local Initiatives Section */}
        {selectedTab === "initiatives" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockInitiatives.map((initiative) => (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-border bg-card overflow-hidden"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={initiative.image}
                      alt={initiative.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        initiative.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      }`}>
                        {initiative.status === "active" ? "Active" : "Proposed"}
                      </span>
                      <span className="text-sm text-muted-foreground">{initiative.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                    <p className="text-muted-foreground mb-4">{initiative.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{initiative.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{initiative.participants} participants</span>
                      </div>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                      Join Initiative
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map View Toggle */}
            <div className="mt-8 p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-4">Explore Initiatives Map</h3>
              <CustomGoogleMap />
            </div>
          </motion.div>
        )}

        {/* Forums & Events Section */}
        {selectedTab === "events" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {event.type === "virtual" ? (
                        <Video className="w-6 h-6" />
                      ) : (
                        <Users className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {event.type === "virtual" ? "Virtual Event" : "In-person Event"}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees}/{event.maxCapacity} attending</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                      RSVP Now
                    </button>
                    <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Community Forum */}
            <div className="mt-8 p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>Join the conversation and connect with other community members</span>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  View Forum
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Transport Section */}
        {selectedTab === "transport" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Carpooling */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Carpooling</h3>
              </div>
              <p className="text-muted-foreground mb-4">Find or offer rides to reduce carbon emissions</p>
              <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                Find a Ride
              </button>
            </div>

            {/* Public Transport */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-4">Real-time Transport Info</h3>
              <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center mb-4">
                <p className="text-muted-foreground">Transport map integration coming soon</p>
              </div>
            </div>

            {/* Carbon Footprint */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-4">Carbon Footprint Tracker</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <span>Your monthly savings</span>
                  <span className="text-green-600 font-semibold">-125 kg CO2</span>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Green Challenges Section */}
        {selectedTab === "challenges" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{challenge.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{challenge.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.duration}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-primary">{challenge.points} points</span>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                    Join Challenge
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="mt-8 p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-4">Community Leaderboard</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold">#1</span>
                    <span>Green Warriors Team</span>
                  </div>
                  <span className="font-semibold">2,500 points</span>
                </div>
                {/* Add more leaderboard entries */}
              </div>
            </div>
          </motion.div>
        )}

        {/* Resources Section */}
        {selectedTab === "resources" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-border bg-card overflow-hidden"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{resource.rating}</span>
                      <span className="text-muted-foreground">({resource.reviews} reviews)</span>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Marketplace */}
            <div className="mt-8 p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-4">Eco-friendly Marketplace</h3>
              <p className="text-muted-foreground mb-4">Discover and support sustainable local businesses</p>
              <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                Visit Marketplace
              </button>
            </div>
          </motion.div>
        )}

        {/* Smart City Section */}
        {selectedTab === "innovations" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Smart Waste Management */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Recycle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Smart Waste Management</h3>
              </div>
              <p className="text-muted-foreground mb-4">Real-time monitoring and optimization of waste collection</p>
              <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center mb-4">
                <p className="text-muted-foreground">Smart waste monitoring dashboard coming soon</p>
              </div>
            </div>

            {/* Smart Grid */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Smart Grid Integration</h3>
              </div>
              <p className="text-muted-foreground mb-4">Community-wide renewable energy management</p>
              <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                View Energy Dashboard
              </button>
            </div>

            {/* Green Building */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Green Building Showcase</h3>
              </div>
              <p className="text-muted-foreground mb-4">Explore sustainable architecture and design</p>
              <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                View Case Studies
              </button>
            </div>
          </motion.div>
        )}

        {/* Volunteer Section */}
        {selectedTab === "volunteer" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Volunteer Opportunities */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-4">Available Opportunities</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-3 mb-2">
                    <TreePine className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Tree Planting Coordinator</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Help organize and coordinate community tree planting events</p>
                  <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                    Apply Now
                  </button>
                </div>
                {/* Add more opportunities */}
              </div>
            </div>

            {/* Organize Event */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-4">Organize an Event</h3>
              <p className="text-muted-foreground mb-4">Create your own sustainability initiative or event</p>
              <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                Start Planning
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage; 