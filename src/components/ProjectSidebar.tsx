import { useState } from "react";
import FundingProgress from "./FundingProgress";
import TokenCalculator from "./TokenCalculator";
import { Button } from "./ui/button";
import { useFunding } from "@/hooks/useFunding";
import { distributeTokens, checkTokenAllocation } from "@/utils/tokenDistribution";
import { useToast } from "@/components/ui/use-toast";

interface ProjectSidebarProps {
  raised: number;
  goal: number;
  contributors: number;
  daysLeft: number;
  contractAddress: string;
}

const ProjectSidebar = ({
  raised,
  goal,
  contributors,
  daysLeft,
  contractAddress,
}: ProjectSidebarProps) => {
  const [contribution, setContribution] = useState("");
  const { handleFund, isLoading } = useFunding(contractAddress);
  const { toast } = useToast();
  const [isDistributing, setIsDistributing] = useState(false);

  const handleDistributeTokens = async () => {
    try {
      setIsDistributing(true);
      // Example token address - this should be configured per project
      const tokenAddress = "0xYourTokenContractAddress";
      await distributeTokens(contractAddress, tokenAddress);
      toast({
        title: "Success",
        description: "Tokens have been distributed to contributors",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDistributing(false);
    }
  };

  const isGoalReached = raised >= goal;

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <FundingProgress
        raised={raised}
        goal={goal}
        contributors={contributors}
        daysLeft={daysLeft}
      />
      
      <TokenCalculator
        value={contribution}
        onChange={setContribution}
      />
      
      <Button 
        className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        size="lg"
        onClick={() => handleFund(contribution)}
        disabled={isLoading || !contribution || parseFloat(contribution) <= 0}
      >
        {isLoading ? "Processing..." : "Fund This Project"}
      </Button>

      {isGoalReached && (
        <Button
          className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
          size="lg"
          onClick={handleDistributeTokens}
          disabled={isDistributing}
        >
          {isDistributing ? "Distributing..." : "Distribute Tokens"}
        </Button>
      )}
    </div>
  );
};

export default ProjectSidebar;