import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Coins, Users, Timer } from "lucide-react";

interface TokenCalculatorProps {
  value: string;
  onChange: (value: string) => void;
}

const TokenCalculator = ({ value, onChange }: TokenCalculatorProps) => {
  const tokenAllocation = Number(value) * 1000;
  const projectTokens = 1000000; // Example: 1M total tokens
  const percentageOwnership = (tokenAllocation / projectTokens) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-xl">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Coins className="w-5 h-5" />
        Token Economics
      </h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm text-gray-300">Your Contribution (ETH)</label>
            <Input
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="0.0"
              step="0.001"
              min="0"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2 bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-300">Estimated Token Allocation:</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {tokenAllocation.toLocaleString()} Tokens
            </p>
            <p className="text-sm text-gray-400">
              ({percentageOwnership.toFixed(4)}% ownership)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Coins className="w-4 h-4" />
              <span className="text-sm">Total Supply</span>
            </div>
            <p className="text-lg font-semibold">{projectTokens.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Contributors</span>
            </div>
            <p className="text-lg font-semibold">156</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Timer className="w-4 h-4" />
              <span className="text-sm">Vesting Period</span>
            </div>
            <p className="text-lg font-semibold">6 months</p>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <h4 className="text-sm font-medium text-gray-300">Token Distribution</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Contributors</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2 bg-gray-700" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Team</span>
                <span>20%</span>
              </div>
              <Progress value={20} className="h-2 bg-gray-700" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Treasury</span>
                <span>20%</span>
              </div>
              <Progress value={20} className="h-2 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TokenCalculator;