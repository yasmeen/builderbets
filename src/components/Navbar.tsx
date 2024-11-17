import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Wallet, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const categories = [
  "DeFi", "NFT", "GameFi", "DAO", "Infrastructure", "Social", "DeSci", "Public Goods",
  "Gaming", "Metaverse", "AI", "Privacy", "Layer 2", "Tools", "Education"
];

const Navbar = () => {
  const { toast } = useToast();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAddress(accounts[0] || null);
      }
    };

    checkWallet();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts[0] || null);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const handleConnect = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect your wallet",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully",
    });
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                CryptoHacks
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/projects" className="text-gray-700 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link to="/submit" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                Submit Project
              </Link>
              {!address ? (
                <Button
                  onClick={handleConnect}
                  className="flex items-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{shortenAddress(address)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDisconnect}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/projects?category=${category}`}
                className="text-sm text-gray-600 whitespace-nowrap hover:text-primary transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;