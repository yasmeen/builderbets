import { Progress } from "@/components/ui/progress";

interface FundingProgressProps {
  raised: number;
  goal: number;
  contributors: number;
  daysLeft: number;
}

const FundingProgress = ({ raised, goal, contributors, daysLeft }: FundingProgressProps) => {
  const progress = (raised / goal) * 100;

  return (
    <div className="p-6 rounded-xl bg-white border border-gray-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">{raised} ETH</h3>
          <p className="text-gray-600">raised of {goal} ETH goal</p>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold">{contributors}</p>
            <p className="text-gray-600">Contributors</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{daysLeft}</p>
            <p className="text-gray-600">Days Left</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingProgress;