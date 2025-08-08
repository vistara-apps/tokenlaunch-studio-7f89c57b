
'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Copy, ExternalLink } from 'lucide-react'

interface TrendingToken {
  id: string
  tokenName: string
  tokenAddress: string
  volume: string
  trendScore: number
  nlPrompt: string
  chain: string
}

interface TrendFeedProps {
  variant?: 'compact' | 'detailed'
  onCopyPrompt: (prompt: string) => Promise<void>
}

export function TrendFeed({ variant = 'detailed', onCopyPrompt }: TrendFeedProps) {
  const [trendingTokens, setTrendingTokens] = useState<TrendingToken[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading trending tokens
    setTimeout(() => {
      setTrendingTokens([
        {
          id: '1',
          tokenName: 'PEPE2',
          tokenAddress: '0x1234...5678',
          volume: '$2.3M',
          trendScore: 95,
          nlPrompt: 'Launch a meme token called "PEPE2" with 420T supply and deflationary burns',
          chain: 'Base'
        },
        {
          id: '2',
          tokenName: 'MOON',
          tokenAddress: '0x5678...9012',
          volume: '$1.8M',
          trendScore: 87,
          nlPrompt: 'Create a community token "MOON" with 100B supply and 2% tax for holders',
          chain: 'Base'
        },
        {
          id: '3',
          tokenName: 'DEGEN',
          tokenAddress: '0x9012...3456',
          volume: '$1.2M',
          trendScore: 76,
          nlPrompt: 'Deploy a governance token "DEGEN" with 50M supply and voting mechanics',
          chain: 'Base'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      // Visual feedback could be added here
    } catch (error) {
      console.error('Failed to copy prompt:', error)
    }
  }

  const handleLaunchSimilar = async (prompt: string) => {
    await onCopyPrompt(prompt)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Trending Launches</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-surface rounded-lg animate-pulse">
              <div className="h-4 bg-border rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-border rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <TrendingUp size={20} className="text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Trending Launches</h2>
      </div>

      <div className="space-y-3">
        {trendingTokens.map((token) => (
          <div key={token.id} className="p-4 bg-surface rounded-lg border border-border hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground">{token.tokenName}</h3>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    {token.chain}
                  </span>
                </div>
                <div className="text-sm text-muted space-x-4">
                  <span>Volume: {token.volume}</span>
                  <span>Score: {token.trendScore}</span>
                </div>
              </div>
              <button className="text-muted hover:text-foreground p-1">
                <ExternalLink size={16} />
              </button>
            </div>

            {variant === 'detailed' && (
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="text-sm text-foreground font-mono">{token.nlPrompt}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopyPrompt(token.nlPrompt)}
                    className="flex-1 flex items-center justify-center space-x-2 p-2 bg-background hover:bg-border rounded text-sm text-foreground transition-colors"
                  >
                    <Copy size={14} />
                    <span>Copy Prompt</span>
                  </button>
                  <button
                    onClick={() => handleLaunchSimilar(token.nlPrompt)}
                    className="flex-1 p-2 bg-primary hover:bg-primary/90 rounded text-sm text-white transition-colors"
                  >
                    Launch Similar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center py-4">
        <button className="text-accent hover:text-accent/80 text-sm transition-colors">
          Load More Trends
        </button>
      </div>
    </div>
  )
}
