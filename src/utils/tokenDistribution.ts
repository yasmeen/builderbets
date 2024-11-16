import { ethers } from "ethers";

// ABI for the ERC20 token interface
const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

// ABI for the project funding contract
const PROJECT_ABI = [
  "function deposit() payable",
  "function getDepositorShare(address depositor) view returns (uint256)",
  "function distributeTokens(address tokenAddress) external",
  "function withdrawDeposit() external",
  "function getTotalDeposits() view returns (uint256)",
  "function isGoalReached() view returns (bool)",
];

export const distributeTokens = async (
  projectAddress: string,
  tokenAddress: string
) => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const projectContract = new ethers.Contract(
      projectAddress,
      PROJECT_ABI,
      signer
    );

    // Check if funding goal is reached
    const goalReached = await projectContract.isGoalReached();
    if (!goalReached) {
      throw new Error("Funding goal not reached yet");
    }

    // Call the distributeTokens function
    const tx = await projectContract.distributeTokens(tokenAddress);
    await tx.wait();

    return true;
  } catch (error: any) {
    console.error("Token distribution error:", error.message);
    throw error;
  }
};

export const checkTokenAllocation = async (
  projectAddress: string,
  userAddress: string
) => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const projectContract = new ethers.Contract(
      projectAddress,
      PROJECT_ABI,
      provider
    );

    const share = await projectContract.getDepositorShare(userAddress);
    return share;
  } catch (error: any) {
    console.error("Error checking token allocation:", error.message);
    throw error;
  }
};