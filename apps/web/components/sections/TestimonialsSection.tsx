import { testimonials } from '@tk/data'

export function TestimonialsSection() {
  return (
    <section id="work" className="py-24 px-8 md:px-16 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary">
            What People Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-border bg-surface transition-colors hover:border-white/15 p-8 rounded-xl flex flex-col gap-4">
              <div className="text-6xl font-black leading-none -mb-2 font-syne text-accent opacity-35">
                &quot;
              </div>

              <p className="text-sm leading-relaxed flex-1 text-muted">{t.text}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-accent text-bg">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">{t.author}</p>
                  <p className="text-xs font-mono text-muted">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
