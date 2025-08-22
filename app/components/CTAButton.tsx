
'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'outline'
  children: ReactNode
  loading?: boolean
}

export function CTAButton({ 
  variant, 
  children, 
  loading = false, 
  className = '', 
  disabled,
  ...props 
}: CTAButtonProps) {
  const baseClasses = 'relative overflow-hidden transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    outline: 'btn-outline'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-current/20">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}
