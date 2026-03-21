import { expertise } from '@tk/data'
import { Monitor, Layers, Cpu } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-6 h-6" />,
  layers:  <Layers  className="w-6 h-6" />,
  cpu:     <Cpu     className="w-6 h-6" />,
}

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-24 px-8 md:px-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary">
            My Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expertise.map((card) => (
            <div key={card.title} className="expertise-card group relative p-8 rounded-xl">
              {/* Code tag top */}
              <p className="text-xs font-mono mb-4" style={{ color: 'var(--accent)', opacity: 0.5 }}>
                &lt;h3&gt;
              </p>

              {/* Icon */}
              <div
                className="mb-4 transition-transform group-hover:scale-110"
                style={{ color: 'var(--accent)' }}
              >
                {iconMap[card.icon] ?? <Monitor className="w-6 h-6" />}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-1 text-primary">
                {card.title}
              </h3>
              <p className="font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                {card.subtitle}
              </p>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {card.description}
              </p>

              {/* Code tag bottom */}
              <p className="text-xs font-mono mt-4" style={{ color: 'var(--accent)', opacity: 0.5 }}>
                &lt;/h3&gt;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
