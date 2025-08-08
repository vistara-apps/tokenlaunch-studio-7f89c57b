
'use client'

import { useState } from 'react'
import { X, ArrowRight, ArrowLeft, Shield, Zap, TrendingUp } from 'lucide-react'

interface OnboardingWizardProps {
  variant?: 'stepper' | 'wizard'
  onComplete: () => void
}

export function OnboardingWizard({ variant = 'wizard', onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Welcome to TokenLaunch Studio',
      description: 'Launch tokens on Base using natural language commands. No coding required.',
      icon: Zap,
      content: (
        <div className="space-y-4">
          <p className="text-muted">
            Transform your ideas into on-chain tokens with simple English commands. 
            Our AI understands your intent and handles the technical complexity.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Type commands like "Launch a meme token called MOON"</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>AI parses your intent and shows a preview</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Approve and deploy to Base blockchain</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Safety & Audit Trail',
      description: 'Every action is logged and verified before execution.',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-muted">
            We prioritize safety with built-in checks and complete audit trails.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-surface rounded border border-border">
              <h4 className="font-medium text-foreground mb-1">Smart Validation</h4>
              <p className="text-sm text-muted">AI validates token parameters before deployment</p>
            </div>
            <div className="p-3 bg-surface rounded border border-border">
              <h4 className="font-medium text-foreground mb-1">Audit Logs</h4>
              <p className="text-sm text-muted">Complete record of all actions and transactions</p>
            </div>
            <div className="p-3 bg-surface rounded border border-border">
              <h4 className="font-medium text-foreground mb-1">Cost Preview</h4>
              <p className="text-sm text-muted">See credit costs before confirming any action</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Trending & Discovery',
      description: 'Explore trending tokens and copy successful launch patterns.',
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <p className="text-muted">
            Learn from successful launches and discover trending patterns in the community.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Browse real-time trending token launches</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Copy successful natural language prompts</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>One-click launch similar tokens</span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 border border-primary/20 rounded">
            <p className="text-sm text-primary">
              💡 Pro tip: Start with trending patterns and modify them for your needs!
            </p>
          </div>
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg max-w-md w-full shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon size={20} className="text-accent" />
            <h2 className="font-semibold text-foreground">Getting Started</h2>
          </div>
          <button
            onClick={onComplete}
            className="text-muted hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        {variant === 'stepper' && (
          <div className="px-4 py-2 border-b border-border">
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded ${
                    index <= currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-muted">
                {currentStepData.description}
              </p>
            </div>
            
            {currentStepData.content}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <div className="text-xs text-muted">
            {currentStep + 1} / {steps.length}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm rounded transition-colors"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
