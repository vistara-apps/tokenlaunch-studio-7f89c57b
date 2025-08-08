
'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  useViewProfile,
  useNotification,
} from '@coinbase/onchainkit/minikit'
import { AppShell } from './components/AppShell'
import { NLCommandInput } from './components/NLCommandInput'
import { TrendFeed } from './components/TrendFeed'
import { TokenLaunchCard } from './components/TokenLaunchCard'
import { OnboardingWizard } from './components/OnboardingWizard'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'
import { WalletConnect } from './components/WalletConnect'
import { Plus, TrendingUp, BarChart3, Settings } from 'lucide-react'

interface TokenLaunch {
  id: string
  tokenName: string
  status: 'pending' | 'success' | 'failed'
  chain: string
  createdAt: string
  costCredits: number
}

export default function HomePage() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [activeTab, setActiveTab] = useState('launch')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [frameAdded, setFrameAdded] = useState(false)
  const [userLaunches, setUserLaunches] = useState<TokenLaunch[]>([])
  const [creditBalance, setCreditBalance] = useState(100)
  
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const close = useClose()
  const viewProfile = useViewProfile()
  const sendNotification = useNotification()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  useEffect(() => {
    // Check if user is new and show onboarding
    const hasVisited = localStorage.getItem('tokenlaunch_visited')
    if (!hasVisited) {
      setShowOnboarding(true)
      localStorage.setItem('tokenlaunch_visited', 'true')
    }

    // Load mock data
    setUserLaunches([
      {
        id: '1',
        tokenName: 'MEME Token',
        status: 'success',
        chain: 'Base',
        createdAt: '2024-01-15T10:30:00Z',
        costCredits: 10
      },
      {
        id: '2',
        tokenName: 'DeFi Coin',
        status: 'pending',
        chain: 'Base',
        createdAt: '2024-01-15T11:15:00Z',
        costCredits: 15
      }
    ])
  }, [])

  const handleAddFrame = useCallback(async () => {
    try {
      const result = await addFrame()
      if (result) {
        setFrameAdded(true)
        await sendNotification({
          title: 'Frame Added! 🎉',
          body: 'TokenLaunch Studio has been added to your frames.'
        })
      }
    } catch (error) {
      console.error('Failed to add frame:', error)
    }
  }, [addFrame, sendNotification])

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added && !frameAdded) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-accent hover:text-accent/80 text-sm font-semibold transition-colors"
        >
          SAVE FRAME
        </button>
      )
    }
    return null
  }, [context, frameAdded, handleAddFrame])

  const handleLaunchToken = useCallback(async (command: string) => {
    if (creditBalance < 10) {
      alert('Insufficient credits. Please purchase more credits.')
      return
    }

    const newLaunch: TokenLaunch = {
      id: Date.now().toString(),
      tokenName: `Token_${Date.now()}`,
      status: 'pending',
      chain: 'Base',
      createdAt: new Date().toISOString(),
      costCredits: 10
    }

    setUserLaunches(prev => [newLaunch, ...prev])
    setCreditBalance(prev => prev - 10)

    // Simulate launch process
    setTimeout(() => {
      setUserLaunches(prev => 
        prev.map(launch => 
          launch.id === newLaunch.id 
            ? { ...launch, status: Math.random() > 0.2 ? 'success' : 'failed' }
            : launch
        )
      )
    }, 3000)

    await sendNotification({
      title: 'Token Launch Started! 🚀',
      body: `Your token ${newLaunch.tokenName} is being deployed to Base.`
    })
  }, [creditBalance, sendNotification])

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false)
  }, [])

  const tabs = [
    { id: 'launch', label: 'Launch', icon: Plus },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">TokenLaunch Studio</h1>
          <div className="text-sm text-muted bg-surface px-2 py-1 rounded">
            {creditBalance} credits
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <WalletConnect />
          {saveFrameButton}
          <button
            onClick={() => viewProfile()}
            className="text-muted hover:text-foreground text-sm font-semibold transition-colors"
          >
            PROFILE
          </button>
          <button
            onClick={close}
            className="text-muted hover:text-foreground text-sm font-semibold transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'launch' && (
          <div className="p-4 space-y-6">
            <NLCommandInput onLaunch={handleLaunchToken} />
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Your Launches</h2>
              {userLaunches.length > 0 ? (
                <div className="space-y-3">
                  {userLaunches.map((launch) => (
                    <TokenLaunchCard key={launch.id} launch={launch} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted">
                  <Plus size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No token launches yet. Try the command above!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="p-4">
            <TrendFeed onCopyPrompt={handleLaunchToken} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-4">
            <AnalyticsDashboard launches={userLaunches} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-4 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <span className="text-foreground">Credit Balance</span>
                  <span className="text-accent font-semibold">{creditBalance}</span>
                </div>
                
                <button
                  onClick={() => setCreditBalance(prev => prev + 100)}
                  className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Purchase 100 Credits ($10)
                </button>
                
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="w-full p-3 bg-surface text-foreground rounded-lg hover:bg-surface/80 transition-colors"
                >
                  Restart Onboarding
                </button>
                
                <button
                  onClick={() => openUrl('https://base.org')}
                  className="w-full p-3 bg-surface text-foreground rounded-lg hover:bg-surface/80 transition-colors"
                >
                  Learn About Base
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      )}
    </AppShell>
  )
}
