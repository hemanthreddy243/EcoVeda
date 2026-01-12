import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SkillsHub from "./pages/SkillsHub";
import JobsPage from "./pages/Jobs";
import FoodWastePage from "./pages/Food";
import HealthPage from "./pages/Health";
import EducationPage from "./pages/Education";
import GenderEqualityPage from "./pages/GenderEquality";
import CommunityPage from "./pages/Community";
import RewardsPage from "./pages/Rewards";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// For framer-motion animations
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  // Install required dependencies if they're not already installed
  useEffect(() => {
    // This is where we'd normally initialize app-wide settings
    console.log("EcoVeda application initialized");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skills" element={<SkillsHub />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/food" element={<FoodWastePage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/gender-equality" element={<GenderEqualityPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
