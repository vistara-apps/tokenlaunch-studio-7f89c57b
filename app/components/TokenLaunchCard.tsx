
'use client'

import { CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react'

interface TokenLaunch {
  id: string
  tokenName: string
  status: 'pending' | 'success' | 'failed'
  chain: string
  createdAt: string
  costCredits: number
}

interface TokenLaunchCardProps {
  launch: TokenLaunch
  variant?: 'pending' | 'success' | 'failed'
}

export function TokenLaunchCard({ launch, variant }: TokenLaunchCardProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20'
    },
    success: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20'
    },
    failed: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20'
    }
  }

  const config = statusConfig[variant || launch.status]
  const Icon = config.icon

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`p-4 bg-surface rounded-lg border ${config.border} transition-colors`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-foreground">{launch.tokenName}</h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${config.bg} ${config.color}`}>
              <Icon size={12} />
              <span className="capitalize">{launch.status}</span>
            </div>
          </div>

          <div className="text-sm text-muted space-y-1">
            <div className="flex items-center space-x-4">
              <span>Chain: {launch.chain}</span>
              <span>Cost: {launch.costCredits} credits</span>
            </div>
            <div>Created: {formatDate(launch.createdAt)}</div>
          </div>
        </div>

        {launch.status === 'success' && (
          <button className="text-muted hover:text-foreground p-1 transition-colors">
            <ExternalLink size={16} />
          </button>
        )}
      </div>

      {launch.status === 'pending' && (
        <div className="mt-3">
          <div className="w-full bg-border rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-muted mt-1">Deploying to blockchain...</p>
        </div>
      )}

      {launch.status === 'success' && (
        <div className="mt-3 p-3 bg-background rounded border border-green-500/20">
          <p className="text-sm text-foreground">
            <span className="text-green-500">✓</span> Token deployed successfully!
          </p>
          <p className="text-xs text-muted mt-1">
            Contract: 0x1234...5678
          </p>
        </div>
      )}

      {launch.status === 'failed' && (
        <div className="mt-3 p-3 bg-background rounded border border-red-500/20">
          <p className="text-sm text-foreground">
            <span className="text-red-500">✗</span> Launch failed
          </p>
          <p className="text-xs text-muted mt-1">
            Insufficient gas or invalid parameters
          </p>
        </div>
      )}
    </div>
  )
}
