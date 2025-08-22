'use client'

import { useState, useEffect } from 'react'
import { ContributionCurrency } from '../types'
import { CTAButton } from './CTAButton'
import { DollarSign, Coins, AlertCircle, CheckCircle } from 'lucide-react'
import { validateContribution } from '../utils/validation'

interface ContributionFormProps {
  projectId: string
  currency: ContributionCurrency
  onContribute: (amount: number, currency: ContributionCurrency) => Promise<void>
  onCurrencyChange?: (currency: ContributionCurrency) => void
  minContribution?: number
  maxContribution?: number
  isLoading?: boolean
}

export function ContributionForm({
  projectId,
  currency,
  onContribute,
  onCurrencyChange,
  minContribution = 0.1,
  maxContribution = 1000,
  isLoading = false
}: ContributionFormProps) {
  const [amount, setAmount] = useState('')
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset error when amount or currency changes
  useEffect(() => {
    if (touched) {
      validateInput()
    }
  }, [amount, currency])

  const validateInput = () => {
    const result = validateContribution(amount, currency, minContribution, maxContribution)
    if (!result.valid) {
      setError(result.errors[0].message)
      return false
    }
    setError('')
    return true
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    setTouched(true)
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    setSuccess('')
    
    if (!validateInput()) {
      return
    }

    try {
      setIsSubmitting(true)
      await onContribute(parseFloat(amount), currency)
      setAmount('')
      setTouched(false)
      setSuccess(`Successfully contributed ${amount} ${currency}!`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process contribution. Please try again.'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const quickAmounts = currency === 'SOL' ? [0.5, 1, 5, 10] : [50, 100, 500, 1000]
  const loading = isLoading || isSubmitting

  return (
    <div className="card">
      <div className="space-y-4">
        <h3 className="text-heading2 flex items-center">
          <span>Make a Contribution</span>
          {currency === 'SOL' && <Coins className="ml-2 w-5 h-5 text-accent" />}
          {currency === 'USDC' && <DollarSign className="ml-2 w-5 h-5 text-accent" />}
        </h3>
        
        {onCurrencyChange && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => onCurrencyChange('SOL')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                currency === 'SOL' ? 'bg-primary text-white' : 'bg-surface border border-border'
              }`}
              aria-label="Contribute with SOL"
            >
              <Coins className="w-4 h-4" />
              <span>SOL</span>
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange('USDC')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                currency === 'USDC' ? 'bg-primary text-white' : 'bg-surface border border-border'
              }`}
              aria-label="Contribute with USDC"
            >
              <DollarSign className="w-4 h-4" />
              <span>USDC</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={`amount-${projectId}-${currency}`} className="block text-sm font-medium mb-2">
              Amount ({currency})
            </label>
            <div className="relative">
              <input
                id={`amount-${projectId}-${currency}`}
                type="number"
                value={amount}
                onChange={handleAmountChange}
                onBlur={() => setTouched(true)}
                placeholder={`Enter amount in ${currency}`}
                min={minContribution}
                max={maxContribution}
                step={currency === 'SOL' ? '0.1' : '1'}
                className={`input-field w-full pr-10 ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}`}
                required
                aria-invalid={!!error}
                aria-describedby={error ? `error-${projectId}-${currency}` : undefined}
                disabled={loading}
              />
              {error && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-error">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
            <p className="text-caption mt-1 flex justify-between">
              <span>Min: {minContribution} {currency}</span>
              <span>Max: {maxContribution} {currency}</span>
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Quick amounts:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => {
                    setAmount(quickAmount.toString())
                    setTouched(true)
                    setSuccess('')
                  }}
                  className="bg-surface hover:bg-border border border-border rounded px-3 py-2 text-sm transition-all"
                  disabled={loading}
                  aria-label={`Contribute ${quickAmount} ${currency}`}
                >
                  {quickAmount} {currency}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 rounded-md p-3 flex items-start" role="alert">
              <AlertCircle className="w-5 h-5 text-error mr-2 mt-0.5 flex-shrink-0" />
              <p id={`error-${projectId}-${currency}`} className="text-error text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-success/10 border border-success/20 rounded-md p-3 flex items-start" role="status">
              <CheckCircle className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-success text-sm">{success}</p>
            </div>
          )}

          <CTAButton
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full"
            disabled={loading || (!amount && !touched)}
            aria-label={`Contribute ${amount} ${currency}`}
          >
            {loading 
              ? `Processing Contribution...` 
              : `Contribute ${amount ? `${amount} ${currency}` : ''}`}
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
              {amount && !isNaN(parseFloat(amount)) 
                ? `~${(parseFloat(amount) * 1000).toLocaleString()}` 
                : '0'} tokens
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

