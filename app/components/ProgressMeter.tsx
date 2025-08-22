'use client'

interface ProgressMeterProps {
  variant: 'funding' | 'staking'
  current: number
  target: number
  currency?: string
  className?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressMeter({ 
  variant, 
  current, 
  target, 
  currency = 'SOL',
  className = '',
  showPercentage = true,
  size = 'md'
}: ProgressMeterProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const isOverfunded = current > target
  
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const textSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`space-y-2 ${className}`} aria-label={`${variant === 'funding' ? 'Funding' : 'Staking'} progress: ${percentage.toFixed(1)}%`}>
      <div className="flex justify-between items-center">
        <span className={`text-textSecondary ${textSizeClass[size]}`}>
          {variant === 'funding' ? 'Funding Progress' : 'Staking Progress'}
        </span>
        {showPercentage && (
          <span className={`text-textPrimary font-semibold ${textSizeClass[size]}`}>
            {percentage.toFixed(1)}%
          </span>
        )}
      </div>
      
      <div className={`progress-bar ${heightClass[size]} rounded-full overflow-hidden`} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className={`progress-fill ${isOverfunded ? 'bg-gradient-to-r from-accent to-success' : ''} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`text-textPrimary font-medium ${textSizeClass[size]}`}>
          {current.toLocaleString()} {currency}
        </span>
        <span className={`text-textSecondary ${textSizeClass[size]}`}>
          {target.toLocaleString()} {currency}
        </span>
      </div>
      
      {isOverfunded && (
        <div className="text-center animate-pulse">
          <span className="text-success text-sm font-semibold inline-flex items-center">
            🎉 Overfunded by {((current - target) / target * 100).toFixed(1)}%!
          </span>
        </div>
      )}
    </div>
  )
}

