import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Utensils, Leaf, Trophy, Calendar, Share2, Phone, Mail } from "lucide-react";

interface ColdStorage {
  id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  hours: string;
  distance: string;
}

interface DonationPartner {
  id: string;
  name: string;
  description: string;
  contact: string;
  email: string;
  type: "restaurant" | "ngo";
}

const mockColdStorages: ColdStorage[] = [
  {
    id: "1",
    name: "Green Storage Solutions",
    address: "123 Eco Street, New York, NY",
    contact: "+1 (555) 123-4567",
    email: "info@greenstorage.com",
    hours: "24/7",
    distance: "2.5 km"
  },
  {
    id: "2",
    name: "Sustainable Cold Storage",
    address: "456 Nature Ave, Brooklyn, NY",
    contact: "+1 (555) 987-6543",
    email: "contact@sustainablecold.com",
    hours: "6 AM - 10 PM",
    distance: "4.1 km"
  }
];

const mockDonationPartners: DonationPartner[] = [
  {
    id: "1",
    name: "Fresh Food Bank",
    description: "Leading NGO dedicated to food rescue and distribution",
    contact: "+1 (555) 111-2222",
    email: "donate@freshfoodbank.org",
    type: "ngo"
  },
  {
    id: "2",
    name: "Eco Restaurant",
    description: "Sustainable restaurant committed to zero food waste",
    contact: "+1 (555) 333-4444",
    email: "info@ecorestaurant.com",
    type: "restaurant"
  }
];

const FoodWastePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"donation" | "storage" | "planning">("donation");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Food Waste Management</h1>
          <p className="text-muted-foreground">Join us in reducing food waste and making a positive impact on our environment</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-border">
          <button
            onClick={() => setSelectedTab("donation")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "donation"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Food Donation Network
          </button>
          <button
            onClick={() => setSelectedTab("storage")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "storage"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cold Storage Locator
          </button>
          <button
            onClick={() => setSelectedTab("planning")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "planning"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Meal Planning Tool
          </button>
        </div>

        {/* Food Donation Network Section */}
        {selectedTab === "donation" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Donation Partners */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Our Partners</h2>
                {mockDonationPartners.map((partner) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-lg border border-border bg-card"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
                        <p className="text-muted-foreground">{partner.description}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                        {partner.type === "ngo" ? "NGO" : "Restaurant"}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {partner.contact}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {partner.email}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Donation Form */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Donate Food</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Organization Type
                    </label>
                    <select className="w-full p-2 rounded-lg border border-input bg-background">
                      <option>Restaurant</option>
                      <option>Household</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Food Type
                    </label>
                    <select className="w-full p-2 rounded-lg border border-input bg-background">
                      <option>Fresh Produce</option>
                      <option>Prepared Food</option>
                      <option>Non-perishable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Quantity
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-lg border border-input bg-background"
                      placeholder="e.g., 5 kg, 10 servings"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Pickup Address
                    </label>
                    <textarea
                      className="w-full p-2 rounded-lg border border-input bg-background"
                      rows={3}
                    />
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                    Submit Donation
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cold Storage Locator Section */}
        {selectedTab === "storage" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for cold storage facilities..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Storage Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockColdStorages.map((storage) => (
                <motion.div
                  key={storage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <h3 className="text-lg font-semibold text-foreground">{storage.name}</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {storage.address}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {storage.hours}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {storage.contact}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {storage.email}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-primary">Distance: {storage.distance}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Meal Planning Tool Section */}
        {selectedTab === "planning" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meal Planner */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Meal Planner</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Number of People
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 rounded-lg border border-input bg-background"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Meal Type
                    </label>
                    <select className="w-full p-2 rounded-lg border border-input bg-background">
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Snack</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Dietary Preferences
                    </label>
                    <select className="w-full p-2 rounded-lg border border-input bg-background">
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Omnivore</option>
                    </select>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                    Generate Meal Plan
                  </button>
                </div>
              </div>

              {/* Waste Reduction Tracker */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Waste Reduction Tracker</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Weekly Goal</span>
                    <span className="text-primary">75%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Meals Planned</div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <div className="text-2xl font-bold text-primary">2.5kg</div>
                      <div className="text-sm text-muted-foreground">Waste Reduced</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span>You've earned 3 badges this week!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips and Recipes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">Storage Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Store fruits and vegetables separately</li>
                  <li>• Keep herbs in water</li>
                  <li>• Use airtight containers</li>
                  <li>• Label and date leftovers</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">Quick Recipes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Leftover vegetable soup</li>
                  <li>• Rice and bean bowls</li>
                  <li>• Fruit smoothies</li>
                  <li>• Vegetable stir-fry</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">Portion Control</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use smaller plates</li>
                  <li>• Measure portions</li>
                  <li>• Start with less</li>
                  <li>• Save leftovers</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodWastePage; 