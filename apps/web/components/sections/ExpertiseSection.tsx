import { expertise } from '@tk/data'
import { Cpu, Layers, Monitor } from 'lucide-react'

function ReactLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.232 23 20.463" className={className} fill="currentColor" aria-label="React">
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  monitor: <ReactLogo className="w-12 h-12" />,
  layers:  <Layers    className="w-12 h-12" />,
  cpu:     <Cpu       className="w-12 h-12" />,
}

const cardAccents = ['#A0185A', '#5241C8', '#B85520']

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-24 px-8 md:px-16 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary">
            My Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-4 border-[#888] [&>*+*]:border-t-4 [&>*+*]:border-[#888] lg:[&>*+*]:border-t-0 lg:[&>*+*]:border-l-4">
          {expertise.map((card, index) => {
            const accent = cardAccents[index] ?? 'var(--accent)'
            return (
              <div
                key={card.title}
                className="p-8 flex flex-col gap-6"
                style={{ '--card-accent': accent } as React.CSSProperties}
              >
                {/* Header: icon + title block */}
                <div className="flex items-start gap-4">
                  <div className="text-(--card-accent)">
                    {iconMap[card.icon] ?? <Monitor className="w-12 h-12" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="relative isolate inline-block text-2xl font-bold text-primary leading-tight mb-2 after:content-[''] after:absolute after:bottom-0 after:-left-[2px] after:w-[calc(100%+4px)] after:h-[11px] after:bg-(--card-accent) after:-z-10">
                      {card.title}
                    </h3>
                    <p className="text-2xl font-bold text-primary">{card.subtitle}</p>
                  </div>
                </div>

                {/* Code-styled description */}
                <div>
                  <p className="text-sm font-mono mb-3 text-[#888]">&lt;h3&gt;</p>
                  <p className="text-base leading-relaxed font-mono pl-4 border-l-2 border-border text-[#C8C6C0]">
                    {card.description}
                  </p>
                  <p className="text-sm font-mono mt-3 text-[#888]">&lt;/h3&gt;</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
