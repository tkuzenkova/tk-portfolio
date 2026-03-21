import { skills } from '@tk/data'

function MarqueeRow({ items, reverse }: { items: typeof skills; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className="overflow-hidden marquee-track">
      <div className={`flex w-max ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}>
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="skill-item flex items-center gap-3 px-6 py-3 mx-3 rounded-lg flex-shrink-0 cursor-default group"
          >
            <span
              className="text-base flex-shrink-0 transition-transform group-hover:scale-110"
              style={{ color: skill.color }}
            >
              ◆
            </span>
            <span className="text-sm font-mono whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsCarousel() {
  const half = Math.ceil(skills.length / 2)
  return (
    <section
      className="py-16 border-y overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    >
      <div className="flex flex-col gap-4">
        <MarqueeRow items={skills.slice(0, half)} />
        <MarqueeRow items={skills.slice(half)} reverse />
      </div>
    </section>
  )
}
