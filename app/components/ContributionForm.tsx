
'use client'

import { useState } from 'react'
import { ContributionCurrency } from '../types'
import { CTAButton } from './CTAButton'
import { DollarSign, Coins } from 'lucide-react'

interface ContributionFormProps {
  projectId: string
  currency: ContributionCurrency
  onContribute: (amount: number, currency: ContributionCurrency) => Promise<void>
  onCurrencyChange?: (currency: ContributionCurrency) => void
  minContribution?: number
  maxContribution?: number
}

export function ContributionForm({
  projectId,
  currency,
  onContribute,
  onCurrencyChange,
  minContribution = 0.1,
  maxContribution = 1000
}: ContributionFormProps) {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const numAmount = parseFloat(amount)
    
    if (!numAmount || numAmount < minContribution || numAmount > maxContribution) {
      setError(`Amount must be between ${minContribution} and ${maxContribution} ${currency}`)
      return
    }

    try {
      setLoading(true)
      await onContribute(numAmount, currency)
      setAmount('')
    } catch (err) {
      setError('Failed to process contribution. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const quickAmounts = currency === 'SOL' ? [0.5, 1, 5, 10] : [50, 100, 500, 1000]

  return (
    <div className="card">
      <div className="space-y-4">
        <h3 className="text-heading2">Make a Contribution</h3>
        
        {onCurrencyChange && (
          <div className="flex space-x-2">
            <button
              onClick={() => onCurrencyChange('SOL')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                currency === 'SOL' ? 'bg-primary text-white' : 'bg-surface border border-border'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>SOL</span>
            </button>
            <button
              onClick={() => onCurrencyChange('USDC')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                currency === 'USDC' ? 'bg-primary text-white' : 'bg-surface border border-border'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>USDC</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Amount ({currency})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount in ${currency}`}
              min={minContribution}
              max={maxContribution}
              step={currency === 'SOL' ? '0.1' : '1'}
              className="input-field w-full"
              required
            />
            <p className="text-caption mt-1">
              Min: {minContribution} {currency} • Max: {maxContribution} {currency}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Quick amounts:</p>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="bg-surface hover:bg-border border border-border rounded px-3 py-2 text-sm transition-all"
                >
                  {quickAmount} {currency}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 rounded-md p-3">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          <CTAButton
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full"
          >
            Contribute {amount && `${amount} ${currency}`}
          </CTAButton>
        </form>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-textSecondary">Platform fee:</span>
            <span className="text-textPrimary">2%</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-textSecondary">You'll receive tokens:</span>
            <span className="text-textPrimary font-semibold">
              {amount ? `~${(parseFloat(amount) * 1000).toLocaleString()}` : '0'} tokens
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
