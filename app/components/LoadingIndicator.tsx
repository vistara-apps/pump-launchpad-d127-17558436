'use client'

import { Loader2 } from 'lucide-react'

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  className?: string
  fullScreen?: boolean
}

export function LoadingIndicator({ 
  size = 'md', 
  message, 
  className = '',
  fullScreen = false
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  }

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-bg/80 z-50' 
    : 'flex flex-col items-center justify-center'

  return (
    <div className={`${containerClasses} ${className}`} role="status" aria-live="polite">
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
      {message && (
        <p className={`mt-2 text-textSecondary ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
          {message}
        </p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  )
}

// Overlay loading indicator for blocking operations
export function LoadingOverlay({ 
  message = 'Loading...',
  isLoading = true
}: { 
  message?: string;
  isLoading?: boolean;
}) {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 flex items-center justify-center" role="status">
      <div className="bg-surface border border-border rounded-lg p-6 shadow-modal max-w-md w-full text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
        <p className="mt-4 text-textPrimary font-medium">{message}</p>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  )
}

