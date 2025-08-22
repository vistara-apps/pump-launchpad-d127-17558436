'use client'

import { useMiniKit, useAddFrame, useOpenUrl } from '@coinbase/onchainkit/minikit'
import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { TokenSaleCard } from './components/TokenSaleCard'
import { ContributionForm } from './components/ContributionForm'
import { CTAButton } from './components/CTAButton'
import { ProgressMeter } from './components/ProgressMeter'
import { StakingTierCard } from './components/StakingTierCard'
import { SocialShareButton } from './components/SocialShareButton'
import { createProject, getProjects, type Project } from './lib/supabase'

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [frameAdded, setFrameAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('discover')
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const projectsData = await getProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error('Failed to load projects:', error)
    }
  }

  const handleAddFrame = async () => {
    try {
      const result = await addFrame()
      setFrameAdded(Boolean(result))
    } catch (error) {
      console.error('Failed to add frame:', error)
    }
  }

  const handleCreateProject = async (projectData: Omit<Project, 'projectId' | 'currentFunds' | 'status' | 'ownerAddress'>) => {
    try {
      setIsLoading(true)
      
      // Get wallet address from context - use a fallback if not available
      const walletAddress = context?.user?.address || '0x0'
      
      const newProject = await createProject({
        ...projectData,
        ownerAddress: walletAddress
      })
      
      setActiveTab('discover')
      await loadProjects()
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContribute = async (projectId: string, amount: number, currency: 'SOL' | 'USDC') => {
    try {
      setIsLoading(true)
      // TODO: Implement contribution logic with smart contract
      console.log('Contributing:', { projectId, amount, currency })
      
      // Refresh projects after contribution
      await loadProjects()
    } catch (error) {
      console.error('Failed to contribute:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderDiscoverTab = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-textPrimary">Discover Token Launches</h2>
        <p className="text-base text-textSecondary">Find and support the next big Solana token</p>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <TokenSaleCard
            key={project.projectId}
            project={project}
            variant={project.status === 'completed' ? 'completed' : project.status === 'failed' ? 'failed' : 'active'}
            onContribute={(amount, currency) => handleContribute(project.projectId, amount, currency)}
            onViewDetails={() => setSelectedProject(project)}
          />
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-textSecondary">No projects available yet. Be the first to launch!</p>
            <CTAButton
              variant="primary"
              onClick={() => setActiveTab('launch')}
              className="mt-4"
            >
              Launch Your Token
            </CTAButton>
          </div>
        )}
      </div>
    </div>
  )

  const renderLaunchTab = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-textPrimary">Launch Your Token</h2>
        <p className="text-base text-textSecondary">Create your Solana token with secure escrow and automated deployment</p>
      </div>

      <div className="card space-y-6">
        <CreateProjectForm onSubmit={handleCreateProject} isLoading={isLoading} />
      </div>
    </div>
  )

  const renderProjectDetails = () => {
    if (!selectedProject) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <CTAButton
            variant="outline"
            onClick={() => setSelectedProject(null)}
          >
            ← Back to Discover
          </CTAButton>
          
          <div className="flex space-x-2">
            <SocialShareButton variant="Twitter" projectName={selectedProject.projectName} />
            <SocialShareButton variant="Farcaster" projectName={selectedProject.projectName} />
          </div>
        </div>

        <TokenSaleCard
          project={selectedProject}
          variant={selectedProject.status === 'completed' ? 'completed' : selectedProject.status === 'failed' ? 'failed' : 'active'}
          onContribute={(amount, currency) => handleContribute(selectedProject.projectId, amount, currency)}
          showDetails
        />

        {selectedProject.status === 'active' && (
          <div className="grid md:grid-cols-2 gap-6">
            <ContributionForm
              variant="SOL"
              onContribute={(amount) => handleContribute(selectedProject.projectId, amount, 'SOL')}
              isLoading={isLoading}
            />
            <ContributionForm
              variant="USDC"
              onContribute={(amount) => handleContribute(selectedProject.projectId, amount, 'USDC')}
              isLoading={isLoading}
            />
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-textPrimary">Staking Tiers</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <StakingTierCard
              tier={{ tierId: '1', lockPeriodDays: 7, rewardRate: 5, totalStaked: 0, projectId: selectedProject.projectId }}
              variant="default"
            />
            <StakingTierCard
              tier={{ tierId: '2', lockPeriodDays: 30, rewardRate: 15, totalStaked: 0, projectId: selectedProject.projectId }}
              variant="default"
            />
            <StakingTierCard
              tier={{ tierId: '3', lockPeriodDays: 90, rewardRate: 35, totalStaked: 0, projectId: selectedProject.projectId }}
              variant="selected"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-textPrimary">
      <Header variant="withWalletConnect" />
      
      <div className="container mx-auto px-4 py-8">
        {!selectedProject && (
          <div className="flex justify-center mb-8">
            <div className="flex bg-surface rounded-lg p-1">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'discover'
                    ? 'bg-primary text-white'
                    : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setActiveTab('launch')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'launch'
                    ? 'bg-primary text-white'
                    : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                Launch
              </button>
            </div>
          </div>
        )}

        {selectedProject ? renderProjectDetails() : activeTab === 'discover' ? renderDiscoverTab() : renderLaunchTab()}
      </div>

      {context && !context.client.added && (
        <div className="fixed bottom-4 right-4">
          <CTAButton
            variant="primary"
            onClick={handleAddFrame}
            className="shadow-modal"
          >
            Save Frame
          </CTAButton>
        </div>
      )}

      {frameAdded && (
        <div className="fixed bottom-4 right-4 bg-surface border border-accent/20 rounded-lg p-4 animate-fade-in">
          <p className="text-accent text-sm font-medium">✓ Frame saved successfully!</p>
        </div>
      )}
    </div>
  )
}

function CreateProjectForm({ 
  onSubmit, 
  isLoading 
}: { 
  onSubmit: (data: Omit<Project, 'projectId' | 'currentFunds' | 'status' | 'ownerAddress'>) => void
  isLoading: boolean 
}) {
  const [formData, setFormData] = useState({
    projectName: '',
    tokenName: '',
    tokenSymbol: '',
    fundingGoal: 0,
    startDate: '',
    endDate: '',
    tokenomicsDetails: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            className="input-field w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Token Name
          </label>
          <input
            type="text"
            value={formData.tokenName}
            onChange={(e) => setFormData({ ...formData, tokenName: e.target.value })}
            className="input-field w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            value={formData.tokenSymbol}
            onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value })}
            className="input-field w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Funding Goal (SOL)
          </label>
          <input
            type="number"
            value={formData.fundingGoal}
            onChange={(e) => setFormData({ ...formData, fundingGoal: Number(e.target.value) })}
            className="input-field w-full"
            required
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Start Date
          </label>
          <input
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="input-field w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            End Date
          </label>
          <input
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="input-field w-full"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textPrimary mb-2">
          Tokenomics Details
        </label>
        <textarea
          value={formData.tokenomicsDetails}
          onChange={(e) => setFormData({ ...formData, tokenomicsDetails: e.target.value })}
          className="input-field w-full h-32 resize-none"
          placeholder="Describe your token's utility, distribution, and staking rewards..."
        />
      </div>
      
      <CTAButton
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Creating Project...' : 'Launch Project'}
      </CTAButton>
    </form>
  )
}
