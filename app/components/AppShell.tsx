
'use client'

import { type ReactNode } from 'react'
import { cn } from '../lib/utils'

interface AppShellProps {
  children: ReactNode
  variant?: 'default' | 'glass'
  className?: string
}

export function AppShell({ children, variant = 'default', className }: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen flex flex-col max-w-7xl mx-auto',
      variant === 'glass' && 'glass',
      className
    )}>
      {children}
    </div>
  )
}
