
export interface Project {
  projectId: string
  projectName: string
  tokenName: string
  tokenSymbol: string
  fundingGoal: number
  currentFunds: number
  startDate: Date
  endDate: Date
  status: 'pending' | 'active' | 'completed' | 'failed' | 'refunded'
  ownerAddress: string
  contractAddress?: string
  tokenomicsDetails: TokenomicsDetails
  description?: string
  imageUrl?: string
  socialLinks?: SocialLinks
}

export interface TokenomicsDetails {
  totalSupply: number
  decimals: number
  stakingTiers: StakingTier[]
  gambleFiElements?: GambleFiElement[]
}

export interface StakingTier {
  tierId: string
  projectId: string
  lockPeriodDays: number
  rewardRate: number
  totalStaked: number
  minStake: number
  maxStake?: number
}

export interface GambleFiElement {
  id: string
  type: 'prediction' | 'lottery' | 'milestone_bet'
  title: string
  description: string
  targetValue?: number
  odds?: number
  participants: number
  totalPool: number
  status: 'active' | 'completed' | 'cancelled'
}

export interface Investor {
  investorId: string
  projectId: string
  walletAddress: string
  contributionAmount: number
  contributionCurrency: 'SOL' | 'USDC'
  timestamp: Date
  transactionHash?: string
}

export interface SocialLinks {
  twitter?: string
  telegram?: string
  discord?: string
  website?: string
}

export type ContributionCurrency = 'SOL' | 'USDC'
