'use client'

import { contact } from '@tk/data'
import { useEffect, useState } from 'react'

export function Footer() {
  const [emailHref, setEmailHref] = useState('#')

  useEffect(() => {
    const [u, d] = contact.email.split('@')
    setEmailHref(`mailto:${u}@${d}`)
  }, [])

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-mono text-muted">
          © {new Date().getFullYear()} Tetiana Kuzenkova
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'Email', href: emailHref },
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
