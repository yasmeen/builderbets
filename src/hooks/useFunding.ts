import { useState } from "react";
import { ethers } from "ethers";
import { useToast } from "@/components/ui/use-toast";

export const useFunding = (contractAddress: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFund = async (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to fund",
        variant: "destructive",
      });
      return;
    }

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

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const network = await provider.getNetwork();
      
      if (network.chainId !== 11155111n) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xaa36a7',
                  chainName: 'Sepolia Testnet',
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'SEP',
                    decimals: 18
                  },
                  rpcUrls: ['https://sepolia.infura.io/v3/'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io']
                }]
              });
            } catch (addError: any) {
              toast({
                title: "Network Error",
                description: addError.message || "Please add and switch to Sepolia testnet manually",
                variant: "destructive",
              });
              return;
            }
          } else {
            toast({
              title: "Network Error",
              description: switchError.message || "Please switch to Sepolia testnet",
              variant: "destructive",
            });
            return;
          }
        }
      }

      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const requiredAmount = ethers.parseEther(amount);
      const estimatedGas = ethers.parseEther("0.001");
      const formattedBalance = Number(ethers.formatEther(balance)).toFixed(4);
      
      if (balance < (requiredAmount + estimatedGas)) {
        toast({
          title: "Insufficient Balance",
          description: `You need ${amount} ETH plus ~0.001 ETH for gas. Your balance: ${formattedBalance} ETH`,
          variant: "destructive",
        });
        return;
      }

      const tx = {
        to: contractAddress,
        value: requiredAmount,
      };

      const transaction = await signer.sendTransaction(tx);
      
      toast({
        title: "Transaction Sent",
        description: "Please wait for confirmation...",
      });

      await transaction.wait();

      toast({
        title: "Success!",
        description: "Your contribution has been received",
      });

    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Transaction failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFund, isLoading };
};