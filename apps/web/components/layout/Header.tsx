'use client'

import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@tk/ui'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

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
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled && 'bg-bg/85 backdrop-blur-md border-b border-accent-2')}>
      <div className="max-w-7xl mx-auto px-10 md:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-2xl font-bold tracking-wide text-accent hover:opacity-80 transition-opacity"
        >
          TK.<span className="cursor-blink text-[#FF6B2B]">_</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ num, label, href }) => (
            <a
              key={label}
              href={href}
              className={cn(
                'flex items-start gap-1.5 text-[17px] font-medium font-mono transition-colors',
                activeSection === label ? 'text-accent' : 'text-primary/50 hover:text-primary',
              )}
            >
              <span className="text-[10px] text-primary/30">{num}</span>
              <span>// {label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile: Sheet drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="p-2 text-primary">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-border bg-surface">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mb-8">
                <span className="font-mono text-lg font-bold text-accent">
                  TK.<span className="cursor-blink text-[#FF6B2B]">_</span>
                </span>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map(({ num, label, href }) => (
                  <SheetClose key={label} asChild>
                    <a
                      href={href}
                      className={cn(
                        'flex items-center gap-2 text-sm font-mono py-2 transition-colors',
                        activeSection === label ? 'text-accent' : 'text-primary/50 hover:text-primary',
                      )}
                    >
                      <span className="text-[10px]">{num}</span>
                      <span>// {label}</span>
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
