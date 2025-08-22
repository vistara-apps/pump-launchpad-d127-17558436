
import { Project, Investor } from '../types'

export const mockProjects: Project[] = [
  {
    projectId: '1',
    projectName: 'DeFi Yield Optimizer',
    tokenName: 'Yield Optimizer Token',
    tokenSymbol: 'YOT',
    fundingGoal: 500,
    currentFunds: 342.5,
    startDate: new Date('2024-01-15T10:00:00Z'),
    endDate: new Date('2024-02-15T10:00:00Z'),
    status: 'active',
    ownerAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e20',
    description: 'Revolutionary DeFi protocol that optimizes yield across multiple chains with automated rebalancing and risk management.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    tokenomicsDetails: {
      totalSupply: 10000000,
      decimals: 18,
      stakingTiers: [
        {
          tierId: '1',
          projectId: '1',
          lockPeriodDays: 30,
          rewardRate: 15,
          totalStaked: 125000,
          minStake: 1000
        },
        {
          tierId: '2',
          projectId: '1',
          lockPeriodDays: 90,
          rewardRate: 25,
          totalStaked: 89000,
          minStake: 1000
        },
        {
          tierId: '3',
          projectId: '1',
          lockPeriodDays: 180,
          rewardRate: 40,
          totalStaked: 45000,
          minStake: 1000
        }
      ],
      gambleFiElements: [
        {
          id: '1',
          type: 'prediction',
          title: 'Will we reach 600 SOL?',
          description: 'Predict if the project will overfund by 20%',
          targetValue: 600,
          odds: 2.5,
          participants: 23,
          totalPool: 12.5,
          status: 'active'
        }
      ]
    },
    socialLinks: {
      twitter: 'https://twitter.com/yieldoptimizer',
      telegram: 'https://t.me/yieldoptimizer',
      website: 'https://yieldoptimizer.xyz'
    }
  },
  {
    projectId: '2',
    projectName: 'NFT Gaming Platform',
    tokenName: 'Game Token',
    tokenSymbol: 'GAME',
    fundingGoal: 300,
    currentFunds: 450,
    startDate: new Date('2024-01-01T10:00:00Z'),
    endDate: new Date('2024-01-31T10:00:00Z'),
    status: 'completed',
    ownerAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e21',
    contractAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e22',
    description: 'Play-to-earn gaming ecosystem with NFT rewards and cross-game compatibility.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    tokenomicsDetails: {
      totalSupply: 50000000,
      decimals: 18,
      stakingTiers: [
        {
          tierId: '1',
          projectId: '2',
          lockPeriodDays: 7,
          rewardRate: 8,
          totalStaked: 2500000,
          minStake: 500
        },
        {
          tierId: '2',
          projectId: '2',
          lockPeriodDays: 30,
          rewardRate: 18,
          totalStaked: 1800000,
          minStake: 500
        }
      ]
    }
  },
  {
    projectId: '3',
    projectName: 'Green Energy DAO',
    tokenName: 'Green Energy Token',
    tokenSymbol: 'GREEN',
    fundingGoal: 1000,
    currentFunds: 125,
    startDate: new Date('2024-01-20T10:00:00Z'),
    endDate: new Date('2024-03-20T10:00:00Z'),
    status: 'active',
    ownerAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e23',
    description: 'Decentralized funding for renewable energy projects with token-based governance.',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
    tokenomicsDetails: {
      totalSupply: 100000000,
      decimals: 18,
      stakingTiers: [
        {
          tierId: '1',
          projectId: '3',
          lockPeriodDays: 90,
          rewardRate: 20,
          totalStaked: 0,
          minStake: 2000
        },
        {
          tierId: '2',
          projectId: '3',
          lockPeriodDays: 365,
          rewardRate: 45,
          totalStaked: 0,
          minStake: 2000
        }
      ]
    }
  },
  {
    projectId: '4',
    projectName: 'Social Media Rewards',
    tokenName: 'Social Reward Token',
    tokenSymbol: 'SRT',
    fundingGoal: 200,
    currentFunds: 75,
    startDate: new Date('2024-01-10T10:00:00Z'),
    endDate: new Date('2024-01-25T10:00:00Z'),
    status: 'failed',
    ownerAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e24',
    description: 'Reward users for quality content creation and community engagement.',
    tokenomicsDetails: {
      totalSupply: 25000000,
      decimals: 18,
      stakingTiers: []
    }
  }
]

export const mockInvestors: Investor[] = [
  {
    investorId: '1',
    projectId: '1',
    walletAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e30',
    contributionAmount: 50,
    contributionCurrency: 'SOL',
    timestamp: new Date('2024-01-16T14:30:00Z'),
    transactionHash: '0xabcd1234'
  },
  {
    investorId: '2',
    projectId: '1',
    walletAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e31',
    contributionAmount: 100,
    contributionCurrency: 'SOL',
    timestamp: new Date('2024-01-17T09:15:00Z'),
    transactionHash: '0xefgh5678'
  },
  {
    investorId: '3',
    projectId: '1',
    walletAddress: '0x742d35Cc6635C0532FED30b57c9310B4c4eF0e32',
    contributionAmount: 25.5,
    contributionCurrency: 'SOL',
    timestamp: new Date('2024-01-18T16:45:00Z'),
    transactionHash: '0xijkl9012'
  }
]
