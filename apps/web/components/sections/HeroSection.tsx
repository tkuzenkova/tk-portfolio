'use client'

import { useEffect, useState } from 'react'

const roles = ['Front-End Engineer', 'React Specialist', 'UI Architect']

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40)
    } else {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Accent glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,204,0.07) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '20%',
          right: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 md:px-16 w-full max-w-screen-2xl mx-auto">
        {/* Available badge */}
        <div
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--accent)' }}
          />
          <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-semibold uppercase leading-none mb-8 text-center w-full text-[clamp(2rem,7vw,6rem)] tracking-[-.01em] text-primary"
        >
          TETIANA KUZENKOVA
        </h1>

        {/* Typing role */}
        <div className="h-10 flex items-center justify-center mb-6">
          <span
            className="text-xl md:text-2xl font-mono tracking-wider"
            style={{ color: 'var(--accent)' }}
          >
            {displayed}
            <span
              className="inline-block w-0.5 h-6 ml-0.5 animate-pulse"
              style={{ background: 'var(--accent)', verticalAlign: 'middle' }}
            />
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-base md:text-lg max-w-2xl mb-10 leading-relaxed text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          10+ years crafting performant, accessible, and beautifully engineered interfaces.
          Specializing in React ecosystems, design systems, and AI-driven development workflows.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#work"
            className="px-7 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            View Work
          </a>
          <a
            href="/cv.pdf"
            className="px-7 py-3 rounded-lg font-semibold text-sm border transition-colors"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--accent)'
              el.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--border)'
              el.style.color = 'var(--text-primary)'
            }}
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>scroll</span>
        <div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }}
        />
      </div>
    </section>
  )
}
