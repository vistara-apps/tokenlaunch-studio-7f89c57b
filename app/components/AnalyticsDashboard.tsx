
'use client'

import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react'

interface TokenLaunch {
  id: string
  tokenName: string
  status: 'pending' | 'success' | 'failed'
  chain: string
  createdAt: string
  costCredits: number
}

interface AnalyticsDashboardProps {
  variant?: 'lite' | 'pro'
  launches: TokenLaunch[]
}

export function AnalyticsDashboard({ variant = 'lite', launches }: AnalyticsDashboardProps) {
  const stats = {
    totalLaunches: launches.length,
    successfulLaunches: launches.filter(l => l.status === 'success').length,
    totalCreditsSpent: launches.reduce((acc, l) => acc + l.costCredits, 0),
    successRate: launches.length > 0 
      ? Math.round((launches.filter(l => l.status === 'success').length / launches.length) * 100)
      : 0
  }

  const statCards = [
    {
      title: 'Total Launches',
      value: stats.totalLaunches,
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      title: 'Successful',
      value: stats.successfulLaunches,
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Credits Spent',
      value: stats.totalCreditsSpent,
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: BarChart3,
      color: 'text-primary'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Analytics Dashboard</h2>
        {variant === 'lite' && (
          <button className="text-accent hover:text-accent/80 text-sm transition-colors">
            Upgrade to Pro →
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <Icon size={20} className={stat.color} />
                <span className="text-xs text-muted">{stat.title}</span>
              </div>
              <div className="text-2xl font-semibold text-foreground">
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Recent Activity</h3>
        {launches.length > 0 ? (
          <div className="space-y-2">
            {launches.slice(0, 5).map((launch) => (
              <div key={launch.id} className="flex items-center justify-between p-3 bg-surface rounded border border-border">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    launch.status === 'success' ? 'bg-green-500' :
                    launch.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm text-foreground">{launch.tokenName}</span>
                </div>
                <div className="text-xs text-muted">
                  {launch.costCredits} credits
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted">
            <BarChart3 size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No data yet. Launch your first token to see analytics!</p>
          </div>
        )}
      </div>

      {/* Pro Features Teaser */}
      {variant === 'lite' && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <h4 className="font-medium text-primary mb-2">Unlock Pro Analytics</h4>
          <ul className="text-sm text-muted space-y-1 mb-3">
            <li>• Advanced trend analysis</li>
            <li>• Token performance metrics</li>
            <li>• Market comparison data</li>
            <li>• Export & reporting tools</li>
          </ul>
          <button className="w-full p-2 bg-primary text-white rounded text-sm hover:bg-primary/90 transition-colors">
            Upgrade to Pro - $9.99/month
          </button>
        </div>
      )}
    </div>
  )
}
