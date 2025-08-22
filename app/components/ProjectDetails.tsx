'use client'

import { useState } from 'react'
import { Project } from '../types'
import { TokenSaleCard } from './TokenSaleCard'
import { ContributionForm } from './ContributionForm'
import { StakingTierCard } from './StakingTierCard'
import { CTAButton } from './CTAButton'
import { SocialShareButton } from './SocialShareButton'
import { ArrowLeft, Users, FileText, TrendingUp, Calendar, ExternalLink } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

interface ProjectDetailsProps {
  project: Project
  onBack: () => void
  onContribute: (amount: number, currency: 'SOL' | 'USDC') => Promise<void>
  isLoading?: boolean
}

export function ProjectDetails({
  project,
  onBack,
  onContribute,
  isLoading = false
}: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tokenomics' | 'staking'>('overview')
  const [contributionCurrency, setContributionCurrency] = useState<'SOL' | 'USDC'>('SOL')
  
  const isActive = project.status === 'active'
  const variant = project.status === 'completed' ? 'completed' : project.status === 'failed' ? 'failed' : 'active'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CTAButton
          variant="outline"
          onClick={onBack}
          icon={<ArrowLeft className="w-4 h-4" />}
          aria-label="Back to discover"
        >
          Back to Discover
        </CTAButton>
        
        <div className="flex space-x-2">
          <SocialShareButton variant="Twitter" projectName={project.projectName} />
          <SocialShareButton variant="Farcaster" projectName={project.projectName} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            {project.imageUrl && (
              <div className="w-full h-48 sm:h-64 rounded-lg overflow-hidden mb-6">
                <img 
                  src={project.imageUrl} 
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-textPrimary mb-2">{project.projectName}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
                  <span className="font-medium text-lg">{project.tokenSymbol}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    variant === 'completed' ? 'text-success bg-success/10' : 
                    variant === 'failed' ? 'text-error bg-error/10' : 
                    'text-accent bg-accent/10'
                  }`}>
                    {variant === 'completed' ? 'Successfully Funded' : 
                     variant === 'failed' ? 'Funding Failed' : 
                     'Active Campaign'}
                  </span>
                </div>
                
                {project.description && (
                  <p className="text-textSecondary">{project.description}</p>
                )}
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="flex space-x-1 mb-4 border-b border-border">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'overview' 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-textSecondary hover:text-textPrimary'
                    }`}
                    aria-selected={activeTab === 'overview'}
                    role="tab"
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('tokenomics')}
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'tokenomics' 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-textSecondary hover:text-textPrimary'
                    }`}
                    aria-selected={activeTab === 'tokenomics'}
                    role="tab"
                  >
                    Tokenomics
                  </button>
                  <button
                    onClick={() => setActiveTab('staking')}
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'staking' 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-textSecondary hover:text-textPrimary'
                    }`}
                    aria-selected={activeTab === 'staking'}
                    role="tab"
                  >
                    Staking
                  </button>
                </div>
                
                <div role="tabpanel" className="py-2">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <Calendar className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium text-textPrimary">Timeline</h4>
                            <p className="text-sm text-textSecondary">
                              Start: {format(new Date(project.startDate), 'MMM d, yyyy')}
                            </p>
                            <p className="text-sm text-textSecondary">
                              End: {format(new Date(project.endDate), 'MMM d, yyyy')}
                            </p>
                            <p className="text-sm font-medium text-textPrimary mt-1">
                              {formatDistanceToNow(new Date(project.endDate), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Users className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium text-textPrimary">Team</h4>
                            <p className="text-sm text-textSecondary">
                              Created by: {project.ownerAddress.substring(0, 6)}...{project.ownerAddress.substring(project.ownerAddress.length - 4)}
                            </p>
                            {project.teamMembers && (
                              <p className="text-sm text-textSecondary">
                                Team size: {project.teamMembers.length} members
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {project.links && project.links.length > 0 && (
                        <div className="pt-2">
                          <h4 className="font-medium text-textPrimary mb-2">Links</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.links.map((link, index) => (
                              <a 
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 bg-surface hover:bg-surface/80 border border-border rounded-md px-3 py-1.5 text-sm transition-colors"
                              >
                                <span>{link.title}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'tokenomics' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-surface/50 rounded-lg p-4">
                          <h4 className="font-medium text-textPrimary mb-2">Token Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-textSecondary">Name:</span>
                              <span className="text-textPrimary font-medium">{project.tokenName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-textSecondary">Symbol:</span>
                              <span className="text-textPrimary font-medium">{project.tokenSymbol}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-textSecondary">Total Supply:</span>
                              <span className="text-textPrimary font-medium">
                                {project.tokenomicsDetails.totalSupply.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-textSecondary">Initial Price:</span>
                              <span className="text-textPrimary font-medium">
                                {project.tokenomicsDetails.initialPrice} SOL
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-surface/50 rounded-lg p-4">
                          <h4 className="font-medium text-textPrimary mb-2">Distribution</h4>
                          <div className="space-y-2 text-sm">
                            {project.tokenomicsDetails.distribution && 
                             Object.entries(project.tokenomicsDetails.distribution).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-textSecondary capitalize">{key}:</span>
                                <span className="text-textPrimary font-medium">{value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="font-medium text-textPrimary mb-2">Tokenomics Details</h4>
                        <p className="text-textSecondary text-sm whitespace-pre-line">
                          {project.tokenomicsDetails.details || "No detailed tokenomics information available."}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'staking' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-textPrimary">Staking Tiers</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {project.tokenomicsDetails.stakingTiers && 
                         project.tokenomicsDetails.stakingTiers.map((tier) => (
                          <StakingTierCard
                            key={tier.tierId}
                            tier={tier}
                            variant={tier.tierId === '3' ? 'selected' : 'default'}
                          />
                        ))}
                        
                        {(!project.tokenomicsDetails.stakingTiers || 
                          project.tokenomicsDetails.stakingTiers.length === 0) && (
                          <p className="text-textSecondary col-span-3 text-center py-8">
                            No staking tiers available for this project.
                          </p>
                        )}
                      </div>
                      
                      {project.tokenomicsDetails.stakingDetails && (
                        <div className="pt-2">
                          <h4 className="font-medium text-textPrimary mb-2">Staking Details</h4>
                          <p className="text-textSecondary text-sm whitespace-pre-line">
                            {project.tokenomicsDetails.stakingDetails}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {isActive && (
            <ContributionForm
              projectId={project.projectId}
              currency={contributionCurrency}
              onContribute={onContribute}
              onCurrencyChange={setContributionCurrency}
              isLoading={isLoading}
            />
          )}
          
          <div className="card">
            <h3 className="text-xl font-semibold text-textPrimary mb-4">Funding Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Current</span>
                <span className="text-textPrimary font-semibold">{project.currentFunds} SOL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Goal</span>
                <span className="text-textPrimary font-semibold">{project.fundingGoal} SOL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Progress</span>
                <span className="text-textPrimary font-semibold">
                  {((project.currentFunds / project.fundingGoal) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Time Remaining</span>
                <span className="text-textPrimary font-semibold">
                  {formatDistanceToNow(new Date(project.endDate), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

