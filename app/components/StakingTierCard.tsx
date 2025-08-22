
'use client'

import { StakingTier } from '../types'
import { Clock, TrendingUp, Users } from 'lucide-react'

interface StakingTierCardProps {
  tier: StakingTier
  variant?: 'default' | 'selected'
  onSelect?: (tierId: string) => void
}

export function StakingTierCard({ 
  tier, 
  variant = 'default',
  onSelect 
}: StakingTierCardProps) {
  const isSelected = variant === 'selected'
  
  return (
    <div 
      className={`card transition-all cursor-pointer ${
        isSelected 
          ? 'border-primary shadow-glow bg-primary/5' 
          : 'hover:border-primary/50'
      }`}
      onClick={() => onSelect?.(tier.tierId)}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-heading2">{tier.lockPeriodDays} Days</span>
          </div>
          {isSelected && (
            <div className="bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
              Selected
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-textSecondary">APR</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success font-bold text-lg">{tier.rewardRate}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-textSecondary">Min Stake</span>
            <span className="text-textPrimary font-semibold">
              {tier.minStake.toLocaleString()} tokens
            </span>
          </div>

          {tier.maxStake && (
            <div className="flex items-center justify-between">
              <span className="text-textSecondary">Max Stake</span>
              <span className="text-textPrimary font-semibold">
                {tier.maxStake.toLocaleString()} tokens
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-textSecondary">Total Staked</span>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-textSecondary" />
              <span className="text-textPrimary font-semibold">
                {tier.totalStaked.toLocaleString()} tokens
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="text-center">
            <p className="text-caption">
              Lock for {tier.lockPeriodDays} days • Earn {tier.rewardRate}% APR
            </p>
            <p className="text-primary text-sm font-semibold mt-1">
              Compound rewards automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
