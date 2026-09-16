'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ComingSoonOverlayProps = {
  children: ReactNode
  title?: string
  subtitle?: string
  backLabel?: string
  backHref?: string
  className?: string
}

export function ComingSoonOverlay({
  children,
  title = 'Soon',
  subtitle = 'Our website can wait, your business can not',
  backLabel = 'Back',
  backHref = '/',
  className,
}: ComingSoonOverlayProps) {
  const handleBack = () => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.location.assign(backHref)
  }

  return (
    <div className={cn('relative', className)}>
      <div aria-hidden className="pointer-events-none select-none blur-md sm:blur-lg">
        {children}
      </div>
      <div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-2xl leading-none font-semibold tracking-tight text-black sm:text-3xl">{title}</p>
          <p className="mt-1 text-[10px] leading-4 font-light text-black/80 sm:text-xs">{subtitle}</p>
          <button
            type="button"
            onClick={handleBack}
            className="pointer-events-auto mt-3 inline-flex cursor-pointer items-center justify-center rounded-full border border-black/15 px-3 py-1 text-[11px] leading-4 font-medium text-black/80 transition-colors hover:text-black"
          >
            {backLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
