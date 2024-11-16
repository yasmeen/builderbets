// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ProjectFunding is ReentrancyGuard {
    address public owner;
    uint256 public fundingGoal;
    uint256 public totalDeposits;
    bool public tokensDistributed;
    mapping(address => uint256) public deposits;
    address[] public depositors;

    event Deposit(address indexed depositor, uint256 amount);
    event TokensDistributed(address indexed tokenAddress, uint256 totalAmount);
    event DepositWithdrawn(address indexed depositor, uint256 amount);

    constructor(uint256 _fundingGoal) {
        owner = msg.sender;
        fundingGoal = _fundingGoal;
    }

    function deposit() external payable nonReentrant {
        require(!tokensDistributed, "Tokens already distributed");
        require(msg.value > 0, "Must deposit some ETH");

        if (deposits[msg.sender] == 0) {
            depositors.push(msg.sender);
        }
        
        deposits[msg.sender] += msg.value;
        totalDeposits += msg.value;
        
        emit Deposit(msg.sender, msg.value);
    }

    function distributeTokens(address tokenAddress) external nonReentrant {
        require(msg.sender == owner, "Only owner can distribute tokens");
        require(isGoalReached(), "Funding goal not reached");
        require(!tokensDistributed, "Tokens already distributed");
        
        IERC20 token = IERC20(tokenAddress);
        uint256 tokenBalance = token.balanceOf(address(this));
        require(tokenBalance > 0, "No tokens to distribute");

        for (uint i = 0; i < depositors.length; i++) {
            address depositor = depositors[i];
            uint256 share = (deposits[depositor] * tokenBalance) / totalDeposits;
            
            require(token.transfer(depositor, share), "Token transfer failed");
        }

        tokensDistributed = true;
        emit TokensDistributed(tokenAddress, tokenBalance);
    }

    function withdrawDeposit() external nonReentrant {
        require(!isGoalReached(), "Cannot withdraw after goal is reached");
        uint256 amount = deposits[msg.sender];
        require(amount > 0, "No deposit to withdraw");

        deposits[msg.sender] = 0;
        totalDeposits -= amount;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit DepositWithdrawn(msg.sender, amount);
    }

    function getDepositorShare(address depositor) external view returns (uint256) {
        if (totalDeposits == 0) return 0;
        return (deposits[depositor] * 1e18) / totalDeposits;
    }

    function isGoalReached() public view returns (bool) {
        return totalDeposits >= fundingGoal;
    }

    function getTotalDeposits() external view returns (uint256) {
        return totalDeposits;
    }
}