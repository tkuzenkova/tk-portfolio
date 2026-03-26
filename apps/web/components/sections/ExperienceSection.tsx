'use client'

import { experienceMeta } from '@tk/data'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@tk/ui'
import { Badge } from '@tk/ui'
import { cn } from '@tk/ui'
import { useTranslations } from 'next-intl'

// Each item: gradient from stop[i] to stop[i+1], so colours connect between cards.
// Interpolated from #7B61FF (violet) → #00E5CC (teal) across 6 stops.
const triggerGradients = [
  'from-[#3D2B8E] to-[#2E3DA0]',
  'from-[#2E3DA0] to-[#1E58B0]',
  'from-[#1E58B0] to-[#1072A8]',
  'from-[#1072A8] to-[#088A98]',
  'from-[#088A98] to-[#00A08A]',
  'from-[#00A08A] to-[#00B87A]',
]

const contentBgs = [
  'bg-[#3D2B8E]/20',
  'bg-[#2E3DA0]/20',
  'bg-[#1E58B0]/20',
  'bg-[#1072A8]/20',
  'bg-[#088A98]/20',
  'bg-[#00A08A]/20',
]

type ExperienceItemMessage = {
  role: string
  company: string
  project?: string
  bullets: string[]
}

export function ExperienceSection() {
  const t = useTranslations('Experience')
  const items = t.raw('items') as ExperienceItemMessage[]

  return (
    <section id="experience" className="py-24 px-8 md:px-16 bg-bg">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary">
            {t('heading')}
          </h2>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {items.map((item, i) => {
            const meta = experienceMeta[i]
            return (
              <AccordionItem
                key={i}
                value={String(i)}
                className="border-0 rounded-2xl overflow-hidden"
              >
                <AccordionTrigger
                  className={cn(
                    'bg-gradient-to-r hover:opacity-90 hover:no-underline px-7 py-6',
                    triggerGradients[i],
                  )}
                >
                  <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-center md:justify-between mr-4">
                    <p className="font-medium text-lg text-white leading-snug text-left">{item.role}</p>
                    <span className="font-medium text-sm md:text-lg text-white/70 md:text-white md:shrink-0 md:ml-4 text-left">{meta?.period}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className={cn('px-7 pt-6 pb-7', contentBgs[i])}>
                  <p className="text-sm font-mono text-white/70 mb-5">{item.company}</p>

                  {item.project && (
                    <p className="text-xs font-mono uppercase tracking-widest mb-5 text-accent">
                      {t('projectLabel')} {item.project}
                    </p>
                  )}

                  {item.bullets.length > 0 && (
                    <ul className="flex flex-col gap-3 mb-7">
                      {item.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-base leading-relaxed text-white">
                          <span className="shrink-0 mt-0.5 text-accent">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {meta?.stack && meta.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {meta.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-full border-0 bg-white/15 text-white font-normal text-xs px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {meta?.team && (
                    <p className="text-sm font-mono text-white/50 border-t border-white/10 pt-4">
                      {t('teamLabel')} {meta.team}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
