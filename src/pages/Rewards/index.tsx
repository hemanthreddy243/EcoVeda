import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Star,
  Gift,
  Target,
  Users,
  Calendar,
  Clock,
  Heart,
  Sparkles,
  Crown,
  Search,
  Filter,
  ArrowRight,
  BadgeCheck,
  Rocket,
  Zap
} from "lucide-react";

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  progress: number;
  unlocked: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  deadline: string;
  participants: number;
  progress: number;
  category: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: "discount" | "exclusive" | "physical" | "donation";
  image: string;
  available: boolean;
}

// Mock data
const mockBadges: Badge[] = [
  {
    id: "1",
    title: "Earth Champion",
    description: "Complete 10 environmental challenges",
    icon: "Trophy",
    category: "Achievement",
    rarity: "rare",
    progress: 80,
    unlocked: false
  },
  {
    id: "2",
    title: "Community Leader",
    description: "Organize 5 community events",
    icon: "Users",
    category: "Leadership",
    rarity: "epic",
    progress: 100,
    unlocked: true
  },
  {
    id: "3",
    title: "Green Innovator",
    description: "Propose 3 sustainable solutions",
    icon: "Lightbulb",
    category: "Innovation",
    rarity: "legendary",
    progress: 60,
    unlocked: false
  }
];

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Zero Waste Week",
    description: "Minimize your waste production for a week",
    points: 500,
    deadline: "2024-03-30",
    participants: 156,
    progress: 75,
    category: "Environmental"
  },
  {
    id: "2",
    title: "Community Garden",
    description: "Contribute to local garden maintenance",
    points: 300,
    deadline: "2024-03-25",
    participants: 89,
    progress: 45,
    category: "Community"
  }
];

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "Eco-friendly Shopping Voucher",
    description: "20% off at participating sustainable stores",
    pointsCost: 1000,
    category: "discount",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef",
    available: true
  },
  {
    id: "2",
    title: "Tree Planting Kit",
    description: "Premium kit with seeds and tools",
    pointsCost: 750,
    category: "physical",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2",
    available: true
  },
  {
    id: "3",
    title: "Donate to Ocean Cleanup",
    description: "Support ocean conservation efforts",
    pointsCost: 500,
    category: "donation",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
    available: true
  }
];

const RewardsPage = () => {
  const [selectedTab, setSelectedTab] = useState<"badges" | "challenges" | "rewards">("badges");
  const [searchQuery, setSearchQuery] = useState("");

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      case "rare":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "epic":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "legendary":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Gamification & Rewards</h1>
          <p className="text-muted-foreground">Earn rewards and recognition for your sustainable actions</p>
        </motion.div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg border border-border bg-card"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">2,500</h3>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg border border-border bg-card"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Medal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">12</h3>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg border border-border bg-card"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">8</h3>
                <p className="text-sm text-muted-foreground">Active Challenges</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search badges, challenges, or rewards..."
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
            onClick={() => setSelectedTab("badges")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "badges"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Badges & Leaderboard
          </button>
          <button
            onClick={() => setSelectedTab("challenges")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "challenges"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Challenges & Achievements
          </button>
          <button
            onClick={() => setSelectedTab("rewards")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "rewards"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Redeemable Rewards
          </button>
        </div>

        {/* Badges & Leaderboard Section */}
        {selectedTab === "badges" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <BadgeCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{badge.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{badge.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {badge.unlocked ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Sparkles className="w-4 h-4" />
                      <span>Unlocked!</span>
                    </div>
                  ) : (
                    <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                      View Requirements
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="mt-8 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Community Leaderboard</h3>
                <button className="text-sm text-primary hover:text-primary/90 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Environmental Champion</p>
                    </div>
                  </div>
                  <span className="font-semibold">5,280 points</span>
                </div>
                {/* Add more leaderboard entries */}
              </div>
            </div>
          </motion.div>
        )}

        {/* Challenges Section */}
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
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{challenge.title}</h3>
                      <span className="text-sm text-muted-foreground">{challenge.category}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{challenge.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {challenge.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participants</span>
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
          </motion.div>
        )}

        {/* Rewards Section */}
        {selectedTab === "rewards" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRewards.map((reward) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-border bg-card overflow-hidden"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={reward.image}
                      alt={reward.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                        {reward.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                    <p className="text-muted-foreground mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{reward.pointsCost} points</span>
                      </div>
                      {reward.available ? (
                        <span className="text-green-600 text-sm">Available</span>
                      ) : (
                        <span className="text-red-600 text-sm">Out of Stock</span>
                      )}
                    </div>
                    <button
                      className={`w-full py-2 px-4 rounded-lg transition-colors ${
                        reward.available
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                      disabled={!reward.available}
                    >
                      Redeem Reward
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RewardsPage; 