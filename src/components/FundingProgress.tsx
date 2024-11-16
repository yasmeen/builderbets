import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Coins, Users, Timer } from "lucide-react";

interface FundingProgressProps {
  raised: number;
  goal: number;
  contributors: number;
  daysLeft: number;
}

const FundingProgress = ({ raised, goal, contributors, daysLeft }: FundingProgressProps) => {
  const progress = (raised / goal) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {raised} ETH
          </h3>
          <p className="text-gray-400">raised of {goal} ETH goal</p>
        </div>
        
        <Progress value={progress} className="h-3 bg-gray-700" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <p className="text-sm">Contributors</p>
            </div>
            <p className="text-2xl font-bold">{contributors}</p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Timer className="w-4 h-4 text-blue-400" />
              <p className="text-sm">Days Left</p>
            </div>
            <p className="text-2xl font-bold">{daysLeft}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FundingProgress;