
'use client'

interface ProgressMeterProps {
  variant: 'funding' | 'staking'
  current: number
  target: number
  currency?: string
  className?: string
}

export function ProgressMeter({ 
  variant, 
  current, 
  target, 
  currency = 'SOL',
  className = '' 
}: ProgressMeterProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const isOverfunded = current > target

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-caption">
          {variant === 'funding' ? 'Funding Progress' : 'Staking Progress'}
        </span>
        <span className="text-textPrimary font-semibold">
          {percentage.toFixed(1)}%
        </span>
      </div>
      
      <div className="progress-bar h-3">
        <div 
          className={`progress-fill ${isOverfunded ? 'bg-gradient-to-r from-accent to-success' : ''}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-textPrimary font-medium">
          {current.toLocaleString()} {currency}
        </span>
        <span className="text-textSecondary">
          {target.toLocaleString()} {currency}
        </span>
      </div>
      
      {isOverfunded && (
        <div className="text-center">
          <span className="text-success text-sm font-semibold">
            🎉 Overfunded by {((current - target) / target * 100).toFixed(1)}%!
          </span>
        </div>
      )}
    </div>
  )
}
