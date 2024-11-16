import { useParams } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import FundingProgress from "@/components/FundingProgress";
import TokenCalculator from "@/components/TokenCalculator";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Example project data - in a real app, this would come from your backend
  const project = {
    id: "1",
    title: "DeFi Lending Protocol",
    description: "A revolutionary lending protocol that enables instant crypto-backed loans with dynamic interest rates. Our platform leverages smart contracts to automate lending processes and provide competitive rates for both lenders and borrowers.",
    raised: 15,
    goal: 20,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    daysLeft: 7,
    contributors: 156,
    contractAddress: "0x123...", // Replace with your actual contract address
    team: [
      {
        name: "Alice Johnson",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      {
        name: "Bob Smith",
        role: "Smart Contract Engineer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    ]
  };

  const handleFund = async () => {
    try {
      setIsLoading(true);

      if (!window.ethereum) {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask to fund this project",
          variant: "destructive",
        });
        return;
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Get the current network
      const network = await provider.getNetwork();
      
      // Check if we're on the correct network (Ethereum Mainnet)
      if (network.chainId !== 1n) {
        toast({
          title: "Wrong Network",
          description: "Please switch to Ethereum Mainnet",
          variant: "destructive",
        });
        return;
      }

      // Check balance before sending
      const balance = await provider.getBalance(await signer.getAddress());
      const requiredAmount = ethers.parseEther("0.1");
      
      if (balance < requiredAmount) {
        toast({
          title: "Insufficient Balance",
          description: "You need at least 0.1 ETH plus gas to fund this project",
          variant: "destructive",
        });
        return;
      }

      // Create transaction object with the project's funding address
      // Using a regular EOA address for receiving ETH instead of the USDC contract
      const tx = {
        to: project.contractAddress, // Use the project's actual funding address
        value: ethers.parseEther("0.1"),
      };

      // Send transaction
      const transaction = await signer.sendTransaction(tx);
      
      toast({
        title: "Transaction Sent",
        description: "Please wait for confirmation...",
      });

      // Wait for transaction to be mined
      await transaction.wait();

      toast({
        title: "Success!",
        description: "Your contribution has been received",
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Transaction Failed",
        description: "Make sure you have enough ETH for the transaction and gas fees",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover rounded-xl"
              />
              
              <div className="bg-gray-800 rounded-xl p-8 space-y-6 shadow-xl">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.team.map((member) => (
                    <div key={member.name} className="flex items-center space-x-4 bg-gray-700/50 p-4 rounded-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
                      />
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <FundingProgress
                raised={project.raised}
                goal={project.goal}
                contributors={project.contributors}
                daysLeft={project.daysLeft}
              />
              
              <TokenCalculator />
              
              <Button 
                className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="lg"
                onClick={handleFund}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Fund This Project"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;