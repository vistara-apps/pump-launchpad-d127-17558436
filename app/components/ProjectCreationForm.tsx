
'use client'

import { useState } from 'react'
import { Project, StakingTier, TokenomicsDetails } from '../types'
import { CTAButton } from './CTAButton'
import { Plus, Trash2, Calendar, Target, Coins } from 'lucide-react'

interface ProjectCreationFormProps {
  onSubmit: (project: Omit<Project, 'projectId' | 'currentFunds' | 'status'>) => Promise<void>
}

export function ProjectCreationForm({ onSubmit }: ProjectCreationFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Basic project details
  const [projectName, setProjectName] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [description, setDescription] = useState('')
  const [fundingGoal, setFundingGoal] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  // Tokenomics
  const [totalSupply, setTotalSupply] = useState('')
  const [decimals, setDecimals] = useState('18')
  const [stakingTiers, setStakingTiers] = useState<Omit<StakingTier, 'projectId' | 'totalStaked'>[]>([
    { tierId: '1', lockPeriodDays: 30, rewardRate: 15, minStake: 1000 },
    { tierId: '2', lockPeriodDays: 90, rewardRate: 25, minStake: 1000 },
    { tierId: '3', lockPeriodDays: 180, rewardRate: 40, minStake: 1000 }
  ])

  const addStakingTier = () => {
    const newTier = {
      tierId: (stakingTiers.length + 1).toString(),
      lockPeriodDays: 30,
      rewardRate: 10,
      minStake: 1000
    }
    setStakingTiers([...stakingTiers, newTier])
  }

  const removeStakingTier = (index: number) => {
    setStakingTiers(stakingTiers.filter((_, i) => i !== index))
  }

  const updateStakingTier = (index: number, field: string, value: number) => {
    const updated = [...stakingTiers]
    updated[index] = { ...updated[index], [field]: value }
    setStakingTiers(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      const tokenomicsDetails: TokenomicsDetails = {
        totalSupply: parseInt(totalSupply),
        decimals: parseInt(decimals),
        stakingTiers: stakingTiers.map(tier => ({
          ...tier,
          projectId: '', // Will be set by parent
          totalStaked: 0
        }))
      }

      const projectData: Omit<Project, 'projectId' | 'currentFunds' | 'status'> = {
        projectName,
        tokenName,
        tokenSymbol: tokenSymbol.toUpperCase(),
        description,
        fundingGoal: parseFloat(fundingGoal),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        ownerAddress: '', // Will be set from connected wallet
        tokenomicsDetails
      }

      await onSubmit(projectData)
    } catch (err) {
      setError('Failed to create project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-heading1 mb-6">Create New Token Launch</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="text-heading2">Project Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="input-field w-full"
                  placeholder="My Awesome Project"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Funding Goal (SOL)</label>
                <input
                  type="number"
                  value={fundingGoal}
                  onChange={(e) => setFundingGoal(e.target.value)}
                  className="input-field w-full"
                  placeholder="100"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field w-full h-24 resize-none"
                placeholder="Describe your project..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Token Details */}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="text-heading2">Token Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Token Name</label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="input-field w-full"
                  placeholder="My Token"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Symbol</label>
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                  className="input-field w-full"
                  placeholder="MTK"
                  maxLength={10}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Decimals</label>
                <input
                  type="number"
                  value={decimals}
                  onChange={(e) => setDecimals(e.target.value)}
                  className="input-field w-full"
                  min="0"
                  max="18"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Supply</label>
              <input
                type="number"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                className="input-field w-full"
                placeholder="1000000"
                min="1"
                required
              />
            </div>
          </div>

          {/* Staking Tiers */}
          <div className="space-y-4 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-heading2">Staking Tiers</h3>
              <button
                type="button"
                onClick={addStakingTier}
                className="btn-outline text-sm px-3 py-1"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Tier
              </button>
            </div>
            
            <div className="space-y-3">
              {stakingTiers.map((tier, index) => (
                <div key={tier.tierId} className="bg-bg p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-textPrimary font-semibold">Tier {index + 1}</span>
                    {stakingTiers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStakingTier(index)}
                        className="text-error hover:text-error/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Lock Period (Days)</label>
                      <input
                        type="number"
                        value={tier.lockPeriodDays}
                        onChange={(e) => updateStakingTier(index, 'lockPeriodDays', parseInt(e.target.value))}
                        className="input-field w-full text-sm"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Reward Rate (%)</label>
                      <input
                        type="number"
                        value={tier.rewardRate}
                        onChange={(e) => updateStakingTier(index, 'rewardRate', parseFloat(e.target.value))}
                        className="input-field w-full text-sm"
                        min="0"
                        step="0.1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Min Stake</label>
                      <input
                        type="number"
                        value={tier.minStake}
                        onChange={(e) => updateStakingTier(index, 'minStake', parseInt(e.target.value))}
                        className="input-field w-full text-sm"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 rounded-md p-3">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          <div className="border-t border-border pt-6">
            <CTAButton
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full"
            >
              Create Token Launch
            </CTAButton>
            <p className="text-caption text-center mt-2">
              Platform fee: 2% of successfully raised funds
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
