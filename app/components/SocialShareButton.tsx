
'use client'

import { Twitter, MessageCircle } from 'lucide-react'
import { useOpenUrl } from '@coinbase/onchainkit/minikit'

interface SocialShareButtonProps {
  variant: 'Twitter' | 'Farcaster'
  url: string
  text: string
  hashtags?: string[]
  className?: string
}

export function SocialShareButton({ 
  variant, 
  url, 
  text, 
  hashtags = [],
  className = '' 
}: SocialShareButtonProps) {
  const openUrl = useOpenUrl()

  const handleShare = () => {
    let shareUrl = ''
    
    if (variant === 'Twitter') {
      const params = new URLSearchParams({
        text: text,
        url: url,
        hashtags: hashtags.join(',')
      })
      shareUrl = `https://twitter.com/intent/tweet?${params.toString()}`
    } else if (variant === 'Farcaster') {
      const params = new URLSearchParams({
        text: `${text} ${url}`,
        embeds: url
      })
      shareUrl = `https://warpcast.com/~/compose?${params.toString()}`
    }

    if (shareUrl) {
      openUrl(shareUrl)
    }
  }

  const getIcon = () => {
    switch (variant) {
      case 'Twitter':
        return <Twitter className="w-4 h-4" />
      case 'Farcaster':
        return <MessageCircle className="w-4 h-4" />
    }
  }

  const getColor = () => {
    switch (variant) {
      case 'Twitter':
        return 'bg-blue-500 hover:bg-blue-600'
      case 'Farcaster':
        return 'bg-purple-500 hover:bg-purple-600'
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`
        ${getColor()} 
        text-white px-4 py-2 rounded-md 
        flex items-center space-x-2 
        transition-all duration-200 
        hover:shadow-lg
        ${className}
      `}
    >
      {getIcon()}
      <span>Share on {variant}</span>
    </button>
  )
}
