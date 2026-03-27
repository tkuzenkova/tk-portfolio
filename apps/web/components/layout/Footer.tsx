'use client'

import { contact } from '@tk/data'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-mono text-muted">
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
        <div className="flex items-center gap-6">
          <Link href="/game" className="text-sm transition-colors text-muted hover:text-accent">
            Game
          </Link>
          {[
            { label: 'LinkedIn', href: contact.linkedin },
            { label: 'GitHub', href: contact.github },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sm transition-colors text-muted hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
