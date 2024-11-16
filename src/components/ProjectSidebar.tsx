import { useState } from "react";
import FundingProgress from "./FundingProgress";
import TokenCalculator from "./TokenCalculator";
import { Button } from "./ui/button";
import { useFunding } from "@/hooks/useFunding";

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
    </div>
  );
};

export default ProjectSidebar;