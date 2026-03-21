'use client'

import { useState, useEffect } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Sheet, SheetTrigger, SheetContent } from '@tk/ui'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

const navItems = [
  { num: '01', label: 'home',       href: '#home' },
  { num: '02', label: 'expertise',  href: '#expertise' },
  { num: '03', label: 'experience', href: '#experience' },
  { num: '04', label: 'contact',    href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300')}
      style={
        scrolled
          ? { background: 'rgba(13,13,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--accent-2)' }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-7xl mx-auto px-10 md:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-2xl font-bold tracking-wide hover:opacity-80 transition-opacity"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-syne)' }}
        >
          TK.<span className="cursor-blink" style={{ color: '#FF6B2B' }}>_</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ num, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-start gap-1.5 text-[17px] font-medium font-mono transition-colors"
              style={{ color: activeSection === label ? 'var(--accent)' : 'var(--text-muted)' }}
              onMouseEnter={(e) => {
                if (activeSection !== label)
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                if (activeSection !== label)
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
              }}
            >
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{num}</span>
              <span>// {label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile: Sheet drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="p-2" style={{ color: 'var(--text-primary)' }}>
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mb-8">
                <span
                  className="font-mono text-lg font-bold"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-syne)' }}
                >
                  TK.<span className="cursor-blink" style={{ color: '#FF6B2B' }}>_</span>
                </span>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map(({ num, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 text-sm font-mono py-2 transition-colors"
                    style={{ color: activeSection === label ? 'var(--accent)' : 'var(--text-muted)' }}
                  >
                    <span style={{ fontSize: '10px' }}>{num}</span>
                    <span>// {label}</span>
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
