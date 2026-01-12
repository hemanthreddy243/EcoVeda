
import { User, TrendingUp, Award, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export default function QuickActions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Update",
      description: "Profile update feature will be available soon.",
    });
  };

  const handleFindOpportunities = () => {
    navigate('/skills');
    toast({
      description: "Navigating to skills and opportunities...",
    });
  };

  const handleClaimRewards = () => {
    toast({
      title: "Rewards",
      description: "Claim rewards feature will be available soon.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          className="w-full justify-start bg-eco-green hover:bg-eco-green-dark text-white"
          onClick={handleUpdateProfile}
        >
          <User className="mr-2 h-4 w-4" />
          Update Profile
          <ExternalLink className="ml-auto h-3 w-3 opacity-70" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:text-eco-green hover:border-eco-green"
          onClick={handleFindOpportunities}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Find Opportunities
          <ExternalLink className="ml-auto h-3 w-3 opacity-70" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:text-eco-green hover:border-eco-green"
          onClick={handleClaimRewards}
        >
          <Award className="mr-2 h-4 w-4" />
          Claim Rewards
          <ExternalLink className="ml-auto h-3 w-3 opacity-70" />
        </Button>
      </CardContent>
    </Card>
  );
}
