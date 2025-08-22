'use client'

import { ReactNode } from 'react'
import { CTAButton } from './CTAButton'
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react'

interface ErrorStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function ErrorState({
  title,
  description,
  icon,
  action,
  className = ''
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className}`} role="alert">
      <div className="bg-error/10 rounded-full p-4 mb-4">
        {icon || <AlertTriangle className="w-10 h-10 text-error" />}
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

// Specialized error states
export function NetworkErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Network Error"
      description="We're having trouble connecting to our servers. Please check your internet connection and try again."
      icon={<WifiOff className="w-10 h-10 text-error" />}
      action={{
        label: "Try Again",
        onClick: onRetry
      }}
      className="py-12"
    />
  )
}

export function LoadingErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Failed to Load Data"
      description="We couldn't load the requested data. This might be a temporary issue. Please try again."
      action={{
        label: "Retry",
        onClick: onRetry
      }}
      className="py-12"
    />
  )
}

