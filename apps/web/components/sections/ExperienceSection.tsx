'use client'

import { experience } from '@tk/data'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@tk/ui'
import { Badge } from '@tk/ui'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-8 md:px-16 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary">
            Professional Experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block bg-border" />

          <Accordion type="single" defaultValue="0" collapsible className="md:pl-8">
            {experience.map((item, i) => (
              <AccordionItem key={i} value={String(i)} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-8 top-5 w-2 h-2 rounded-full hidden md:block transition-colors bg-border" />

                <AccordionTrigger>
                  <div>
                    <p className="font-semibold text-primary">{item.role}</p>
                    <p className="text-sm font-mono mt-0.5 text-muted">
                      {item.company} · {item.period}
                    </p>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <p className="text-xs font-mono uppercase tracking-wider mb-3 text-accent">
                    Project: {item.project}
                  </p>

                  <ul className="flex flex-col gap-2 mb-6">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="shrink-0 mt-0.5 text-accent">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <p className="text-xs font-mono text-muted">Team: {item.team}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
