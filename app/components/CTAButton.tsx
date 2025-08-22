'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'outline'
  children: ReactNode
  loading?: boolean
  loadingText?: string
  icon?: ReactNode
  fullWidth?: boolean
}

export function CTAButton({ 
  variant, 
  children, 
  loading = false,
  loadingText,
  icon,
  fullWidth = false,
  className = '', 
  disabled,
  ...props 
}: CTAButtonProps) {
  const baseClasses = 'relative overflow-hidden transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30 focus-visible:ring-2 focus-visible:ring-primary/50'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    outline: 'btn-outline'
  }

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      <span className={`flex items-center justify-center ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          {loadingText || 'Loading...'}
        </div>
      )}
    </button>
  )
}

