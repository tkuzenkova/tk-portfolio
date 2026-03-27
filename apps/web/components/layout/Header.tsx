'use client'

import { useActiveSection } from '@/hooks/useActiveSection'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@tk/ui'
import { LanguageSwitcher } from '@tk/ui/language-switcher'
import { Menu } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState, useTransition } from 'react'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'uk', label: 'UK' },
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection()
  const t = useTranslations('Nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navItems = [
    { num: '01', id: 'home',       label: t('home') },
    { num: '02', id: 'expertise',  label: t('expertise') },
    { num: '03', id: 'experience', label: t('experience') },
    { num: '04', id: 'contact',    label: t('contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLocaleSwitch(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled && 'bg-bg/85 backdrop-blur-md border-b border-accent-2')}>
      <div className="max-w-7xl mx-auto px-10 md:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={{ pathname: '/', hash: 'home' }}
          className="font-mono text-2xl font-bold tracking-wide text-accent hover:opacity-80 transition-opacity"
        >
          TK.<span className="cursor-blink text-[#FF6B2B]">_</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ num, id, label }) => (
            <Link
              key={id}
              href={{ pathname: '/', hash: id }}
              className={cn(
                'flex items-start gap-1.5 text-[17px] font-medium font-mono transition-colors',
                activeSection === id ? 'text-accent' : 'text-primary/50 hover:text-primary',
              )}
            >
              <span className="text-[10px] text-primary/30">{num}</span>
              <span>// {label}</span>
            </Link>
          ))}
          <LanguageSwitcher
            locales={LOCALES}
            currentLocale={locale}
            onSwitch={handleLocaleSwitch}
            disabled={isPending}
          />
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
                {navItems.map(({ num, id, label }) => (
                  <SheetClose key={id} asChild>
                    <Link
                      href={{ pathname: '/', hash: id }}
                      className={cn(
                        'flex items-center gap-2 text-sm font-mono py-2 transition-colors',
                        activeSection === id ? 'text-accent' : 'text-primary/50 hover:text-primary',
                      )}
                    >
                      <span className="text-[10px]">{num}</span>
                      <span>// {label}</span>
                    </Link>
                  </SheetClose>
                ))}
                <div className="pt-2 border-t border-border">
                  <LanguageSwitcher
                    locales={LOCALES}
                    currentLocale={locale}
                    onSwitch={handleLocaleSwitch}
                    disabled={isPending}
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
