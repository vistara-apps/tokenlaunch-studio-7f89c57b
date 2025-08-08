
'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface NLCommandInputProps {
  variant?: 'compact' | 'expanded'
  onLaunch: (command: string) => Promise<void>
}

export function NLCommandInput({ variant = 'expanded', onLaunch }: NLCommandInputProps) {
  const [command, setCommand] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const exampleCommands = [
    'Launch a meme token called "DOGE2" with 1B supply',
    'Create a governance token "DAO" with 100M total supply',
    'Deploy a utility token "GAME" with deflationary mechanics'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim() || isLoading) return

    setIsLoading(true)
    try {
      await onLaunch(command)
      setCommand('')
    } catch (error) {
      console.error('Launch failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setCommand(example)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Natural Language Token Launcher</h2>
        <p className="text-sm text-muted">
          Describe your token in plain English and we'll launch it on Base for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="e.g., Launch a meme token called 'MOON' with 1 billion total supply..."
            className={`w-full bg-surface border border-border rounded-lg p-4 text-foreground placeholder-muted resize-none transition-colors focus:border-primary focus:outline-none ${
              variant === 'compact' ? 'h-20' : 'h-32'
            }`}
          />
          <button
            type="submit"
            disabled={!command.trim() || isLoading}
            className="absolute bottom-3 right-3 p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>

        <div className="text-xs text-muted">
          Cost: 10 credits per launch
        </div>
      </form>

      {variant === 'expanded' && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Quick Examples:</h3>
          <div className="space-y-2">
            {exampleCommands.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-3 bg-surface hover:bg-surface/80 rounded-lg text-sm text-muted hover:text-foreground transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
