import { skills } from '@tk/data'

function MarqueeRow({ items, reverse }: { items: typeof skills; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className="overflow-hidden marquee-track">
      <div className={`flex w-max ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}>
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-3 px-6 py-3 mx-3 rounded-lg shrink-0 cursor-default group border border-border bg-surface transition-colors hover:border-accent"
            style={{ '--skill-color': skill.color } as React.CSSProperties}
          >
            <span className="text-base shrink-0 transition-transform group-hover:scale-110 text-(--skill-color)">
              ◆
            </span>
            <span className="text-sm font-mono whitespace-nowrap text-muted">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsCarousel() {
  const half = Math.ceil(skills.length / 2)
  return (
    <section className="py-16 border-y border-border overflow-hidden bg-bg">
      <div className="flex flex-col gap-4">
        <MarqueeRow items={skills.slice(0, half)} />
        <MarqueeRow items={skills.slice(half)} reverse />
      </div>
    </section>
  )
}
