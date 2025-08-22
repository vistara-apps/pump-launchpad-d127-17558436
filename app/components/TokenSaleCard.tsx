
'use client'

import { Project, ContributionCurrency } from '../types'
import { Calendar, Target, TrendingUp, Users } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ProgressMeter } from './ProgressMeter'
import { CTAButton } from './CTAButton'

interface TokenSaleCardProps {
  project: Project
  variant?: 'active' | 'completed' | 'failed'
  onContribute?: (projectId: string) => void
  onView?: (projectId: string) => void
}

export function TokenSaleCard({ 
  project, 
  variant = 'active',
  onContribute,
  onView 
}: TokenSaleCardProps) {
  const progressPercentage = (project.currentFunds / project.fundingGoal) * 100
  const isActive = variant === 'active' && project.status === 'active'
  const timeRemaining = formatDistanceToNow(project.endDate, { addSuffix: true })

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
    <div className={`card-hover ${isActive ? 'glow-effect' : ''}`}>
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
            <h3 className="text-heading2 mb-1">{project.projectName}</h3>
            <div className="flex items-center space-x-2 text-caption">
              <span>{project.tokenSymbol}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()} bg-current/10`}>
                {getStatusText()}
              </span>
            </div>
          </div>
          {isActive && (
            <div className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              LIVE
            </div>
          )}
        </div>

        {project.description && (
          <p className="text-body line-clamp-2">{project.description}</p>
        )}

        <ProgressMeter
          variant="funding"
          current={project.currentFunds}
          target={project.fundingGoal}
          currency="SOL"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-primary" />
            <div>
              <p className="text-caption">Goal</p>
              <p className="text-textPrimary font-semibold">{project.fundingGoal} SOL</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <p className="text-caption">Ends</p>
              <p className="text-textPrimary font-semibold">{timeRemaining}</p>
            </div>
          </div>
        </div>

        {project.tokenomicsDetails.stakingTiers.length > 0 && (
          <div className="border-t border-border pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-caption">Staking Rewards</span>
            </div>
            <div className="flex space-x-2">
              {project.tokenomicsDetails.stakingTiers.slice(0, 3).map((tier) => (
                <div key={tier.tierId} className="bg-bg px-2 py-1 rounded text-xs">
                  {tier.lockPeriodDays}d: {tier.rewardRate}%
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          {isActive && onContribute && (
            <CTAButton
              variant="primary"
              onClick={() => onContribute(project.projectId)}
              className="flex-1"
            >
              Contribute
            </CTAButton>
          )}
          {onView && (
            <CTAButton
              variant={isActive ? "outline" : "secondary"}
              onClick={() => onView(project.projectId)}
              className={isActive ? "" : "flex-1"}
            >
              View Details
            </CTAButton>
          )}
        </div>
      </div>
    </div>
  )
}
