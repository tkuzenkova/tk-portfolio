'use client'

import { contact } from '@tk/data'

export function Footer() {
  return (
    <footer className="border-t py-8 px-6" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Tetiana Kuzenkova
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'Email', href: `mailto:${contact.email}` },
            { label: 'LinkedIn', href: contact.linkedin },
            { label: 'GitHub', href: contact.github },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
