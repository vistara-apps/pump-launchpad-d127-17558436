'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  type: ToastType
  message: string
  duration?: number
  onClose?: () => void
  visible?: boolean
}

export function Toast({ 
  type, 
  message, 
  duration = 5000, 
  onClose,
  visible = true
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible)

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error" />
      case 'info':
        return <Info className="w-5 h-5 text-primary" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20'
      case 'error':
        return 'bg-error/10 border-error/20'
      case 'info':
        return 'bg-primary/10 border-primary/20'
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-success'
      case 'error':
        return 'text-error'
      case 'info':
        return 'text-primary'
    }
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 max-w-md animate-fade-in ${getBackgroundColor()} border rounded-lg shadow-modal p-4 flex items-center`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      <div className="mr-3 flex-shrink-0">
        {getIcon()}
      </div>
      <div className={`flex-1 mr-2 ${getTextColor()}`}>
        {message}
      </div>
      <button 
        onClick={() => {
          setIsVisible(false)
          if (onClose) onClose()
        }}
        className="text-textSecondary hover:text-textPrimary transition-colors"
        aria-label="Close notification"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

// Toast container to manage multiple toasts
export function ToastContainer({ 
  toasts, 
  removeToast 
}: { 
  toasts: Array<{ id: string; type: ToastType; message: string }>;
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

