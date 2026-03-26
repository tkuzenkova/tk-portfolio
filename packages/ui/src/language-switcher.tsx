'use client'

import { cn } from './utils'

export interface LanguageSwitcherProps {
  locales: readonly { code: string; label: string }[]
  currentLocale: string
  onSwitch: (locale: string) => void
  disabled?: boolean
}

export function LanguageSwitcher({ locales, currentLocale, onSwitch, disabled }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 font-mono text-xs" aria-label="Language switcher">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => onSwitch(code)}
          disabled={disabled}
          aria-current={currentLocale === code ? 'true' : undefined}
          className={cn(
            'px-2 py-1 rounded transition-colors',
            currentLocale === code
              ? 'text-accent font-semibold'
              : 'text-primary/50 hover:text-primary',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
