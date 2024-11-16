import { useState } from "react";
import { Input } from "@/components/ui/input";

const TokenCalculator = () => {
  const [contribution, setContribution] = useState("");
  const tokenAllocation = Number(contribution) * 1000; // Example: 1 ETH = 1000 tokens

  return (
    <div className="p-6 rounded-xl bg-white border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Token Allocation Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Your Contribution (ETH)</label>
          <Input
            type="number"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
            placeholder="0.0"
            className="w-full"
          />
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Estimated Token Allocation:</p>
          <p className="text-2xl font-bold text-primary">
            {tokenAllocation.toLocaleString()} Tokens
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenCalculator;