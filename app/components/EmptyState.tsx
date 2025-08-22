'use client'

import { ReactNode } from 'react'
import { CTAButton } from './CTAButton'
import { FileQuestion, AlertCircle, Search } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className}`}>
      <div className="bg-surface/50 rounded-full p-4 mb-4">
        {icon || <FileQuestion className="w-10 h-10 text-textSecondary" />}
      </div>
      <h3 className="text-xl font-semibold text-textPrimary mb-2">{title}</h3>
      <p className="text-textSecondary mb-6 max-w-md">{description}</p>
      
      {action && (
        <CTAButton variant="primary" onClick={action.onClick}>
          {action.label}
        </CTAButton>
      )}
    </div>
  )
}

// Specialized empty states
export function NoProjectsEmptyState({ onCreateProject }: { onCreateProject: () => void }) {
  return (
    <EmptyState
      title="No Projects Available Yet"
      description="Be the first to launch your token on our platform and start raising funds for your project."
      icon={<Search className="w-10 h-10 text-textSecondary" />}
      action={{
        label: "Launch Your Token",
        onClick: onCreateProject
      }}
      className="py-16"
    />
  )
}

export function NoResultsEmptyState() {
  return (
    <EmptyState
      title="No Results Found"
      description="We couldn't find any projects matching your criteria. Try adjusting your filters or search terms."
      icon={<Search className="w-10 h-10 text-textSecondary" />}
      className="py-12"
    />
  )
}

