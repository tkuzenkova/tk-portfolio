'use client'

import { contact } from '@tk/data'
import { Mail, Linkedin, Github } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-8 md:px-16 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgb(0_229_204/0.3)] bg-[rgb(0_229_204/0.05)]">
            <span className="w-2 h-2 rounded-full animate-pulse bg-accent" />
            <span className="text-sm font-mono text-accent">Open to opportunities</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-primary">
            Available for select
            <br />
            freelance opportunities
          </h2>

          <p className="mb-10 leading-relaxed text-muted">
            Have an exciting project you need help with?
            <br />
            Send me an email or contact me via your preferred platform.
          </p>

          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            className="block text-2xl md:text-3xl font-mono mb-10 break-all transition-opacity hover:opacity-80 text-accent"
          >
            {contact.email}
          </a>

          {/* Links */}
          <div className="flex flex-col gap-4">
            {[
              { href: `mailto:${contact.email}`, Icon: Mail,     label: 'Email'    },
              { href: contact.linkedin,           Icon: Linkedin, label: 'LinkedIn' },
              { href: contact.github,             Icon: Github,   label: 'GitHub'   },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 transition-colors text-muted hover:text-primary group"
              >
                <Icon className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
