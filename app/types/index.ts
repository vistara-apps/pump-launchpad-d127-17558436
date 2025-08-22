export interface Project {
  projectId: string
  projectName: string
  tokenName: string
  tokenSymbol: string
  fundingGoal: number
  currentFunds: number
  startDate: Date | string
  endDate: Date | string
  status: 'pending' | 'active' | 'completed' | 'failed' | 'refunded'
  ownerAddress: string
  contractAddress?: string
  tokenomicsDetails: TokenomicsDetails
  description?: string
  imageUrl?: string
  socialLinks?: SocialLinks
  teamMembers?: TeamMember[]
  links?: ProjectLink[]
}

export interface TokenomicsDetails {
  totalSupply: number
  decimals: number
  initialPrice: number
  stakingTiers: StakingTier[]
  gambleFiElements?: GambleFiElement[]
  distribution?: Record<string, number>
  details?: string
  stakingDetails?: string
}

export interface StakingTier {
  tierId: string
  projectId: string
  lockPeriodDays: number
  rewardRate: number
  totalStaked: number
  minStake?: number
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
  contributionCurrency: ContributionCurrency
  timestamp: Date | string
  transactionHash?: string
}

export interface SocialLinks {
  twitter?: string
  telegram?: string
  discord?: string
  website?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  walletAddress: string
  avatarUrl?: string
  bio?: string
}

export interface ProjectLink {
  title: string
  url: string
  type?: 'website' | 'whitepaper' | 'github' | 'social' | 'other'
}

export type ContributionCurrency = 'SOL' | 'USDC'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

export interface FormValidationResult {
  valid: boolean
  errors: { field: string; message: string }[]
}

