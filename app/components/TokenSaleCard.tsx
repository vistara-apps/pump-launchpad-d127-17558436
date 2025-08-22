'use client'

import { Project } from '../types'
import { Calendar, Target, TrendingUp, Users, ExternalLink, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ProgressMeter } from './ProgressMeter'
import { CTAButton } from './CTAButton'

interface TokenSaleCardProps {
  project: Project
  variant?: 'active' | 'completed' | 'failed'
  onContribute?: (amount: number, currency: 'SOL' | 'USDC') => Promise<void>
  onViewDetails?: () => void
  showDetails?: boolean
}

export function TokenSaleCard({ 
  project, 
  variant = 'active',
  onContribute,
  onViewDetails,
  showDetails = false
}: TokenSaleCardProps) {
  const progressPercentage = (project.currentFunds / project.fundingGoal) * 100
  const isActive = variant === 'active' && project.status === 'active'
  const timeRemaining = formatDistanceToNow(new Date(project.endDate), { addSuffix: true })

  const getStatusColor = () => {
    switch (variant) {
      case 'completed': return 'text-success'
      case 'failed': return 'text-error'
      default: return 'text-accent'
    }
  }

  const getStatusText = () => {
    switch (variant) {
      case 'completed': return 'Successfully Funded'
      case 'failed': return 'Funding Failed'
      default: return isActive ? 'Live Now' : 'Coming Soon'
    }
  }

  return (
    <div 
      className={`card-hover ${isActive ? 'glow-effect' : ''}`}
      tabIndex={0}
      role="article"
      aria-label={`${project.projectName} token sale, ${getStatusText()}`}
    >
      {project.imageUrl && (
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
          <img 
            src={project.imageUrl} 
            alt={project.projectName}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-textPrimary mb-1">{project.projectName}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">{project.tokenSymbol}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()} bg-current/10 flex items-center`}>
                {isActive && <Clock className="w-3 h-3 mr-1" />}
                {getStatusText()}
              </span>
            </div>
          </div>
          {isActive && (
            <div className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-bold animate-pulse flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-1"></span>
              LIVE
            </div>
          )}
        </div>

        {project.description && (
          <p className={`text-textSecondary ${showDetails ? '' : 'line-clamp-2'}`}>
            {project.description}
          </p>
        )}

        <ProgressMeter
          variant="funding"
          current={project.currentFunds}
          target={project.fundingGoal}
          currency="SOL"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-primary" />
            <div>
              <p className="text-textSecondary text-xs">Goal</p>
              <p className="text-textPrimary font-semibold">{project.fundingGoal} SOL</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <p className="text-textSecondary text-xs">Ends</p>
              <p className="text-textPrimary font-semibold">{timeRemaining}</p>
            </div>
          </div>
        </div>

        {showDetails && project.tokenomicsDetails && (
          <div className="border-t border-border pt-4 mt-2">
            <h4 className="text-lg font-medium text-textPrimary mb-2">Tokenomics</h4>
            <p className="text-textSecondary mb-4">{project.tokenomicsDetails}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-textSecondary text-xs">Total Supply</p>
                  <p className="text-textPrimary font-semibold">
                    {project.tokenomicsDetails.totalSupply.toLocaleString()} {project.tokenSymbol}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-textSecondary text-xs">Initial Price</p>
                  <p className="text-textPrimary font-semibold">
                    {project.tokenomicsDetails.initialPrice} SOL
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.tokenomicsDetails?.stakingTiers?.length > 0 && (
          <div className="border-t border-border pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-textSecondary">Staking Rewards</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tokenomicsDetails.stakingTiers.slice(0, 3).map((tier) => (
                <div 
                  key={tier.tierId} 
                  className="bg-bg px-3 py-1.5 rounded text-xs font-medium"
                  title={`${tier.lockPeriodDays} days lock period with ${tier.rewardRate}% APY`}
                >
                  {tier.lockPeriodDays}d: {tier.rewardRate}%
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          {isActive && onContribute && (
            <CTAButton
              variant="primary"
              onClick={() => onViewDetails && onViewDetails()}
              className="flex-1"
              fullWidth
            >
              Contribute
            </CTAButton>
          )}
          {onViewDetails && !showDetails && (
            <CTAButton
              variant={isActive ? "outline" : "secondary"}
              onClick={onViewDetails}
              className={isActive ? "sm:flex-initial" : "flex-1"}
              icon={<ExternalLink className="w-4 h-4" />}
              fullWidth={!isActive}
            >
              View Details
            </CTAButton>
          )}
        </div>
      </div>
    </div>
  )
}

