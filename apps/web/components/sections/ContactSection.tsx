import { contact, testimonialMeta } from '@tk/data'
import { getTranslations } from 'next-intl/server'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 18.34V9.83H5.5V18.34H8.34ZM6.92 8.66A1.65 1.65 0 1 0 6.92 5.36A1.65 1.65 0 0 0 6.92 8.66ZM18.5 18.34V13.69C18.5 11.2 17.97 9.28 15.06 9.28C13.66 9.28 12.72 10.05 12.34 10.78H12.3V9.83H9.58V18.34H12.41V14.13C12.41 13.02 12.62 11.94 14 11.94C15.36 11.94 15.38 13.21 15.38 14.2V18.34H18.5Z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57A12 12 0 0 0 12 .297" />
    </svg>
  )
}

type TestimonialMessage = { role: string; text: string }

export async function ContactSection() {
  const tContact = await getTranslations('Contact')
  const tTestimonials = await getTranslations('Testimonials')
  const testimonialItems = tTestimonials.raw('items') as TestimonialMessage[]
  const featured = testimonialMeta.slice(0, 3)

  return (
    <section id="contact" className="py-24 px-8 md:px-16 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

        {/* Left — contacts */}
        <div className="lg:w-1/3 shrink-0">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgb(0_229_204/0.3)] bg-[rgb(0_229_204/0.05)]">
            <span className="w-2 h-2 rounded-full animate-pulse bg-accent" />
            <span className="text-sm font-mono text-accent">{tContact('badge')}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary">
            {tContact('heading')}
          </h2>

          <p className="mb-10 leading-relaxed text-muted">
            {tContact('description')}
          </p>

          <div className="flex flex-col gap-4">
            {[
              { href: contact.linkedin,  Icon: LinkedInIcon,  label: 'LinkedIn' },
              { href: contact.github,    Icon: GitHubIcon,    label: 'GitHub'   },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 transition-colors text-muted hover:text-primary group"
              >
                <Icon className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — testimonials */}
        <div className="lg:w-2/3 flex flex-col gap-3">
          <h3 className="text-2xl font-semibold text-white/80 mb-2">{tTestimonials('heading')}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 h-full">
            {/* First card spans full height */}
            <div className="row-span-2 rounded-2xl p-7 flex flex-col bg-[linear-gradient(135deg,#9B6ED5,#7B4DB5)]">
              <div className="flex items-start justify-between mb-6">
                <span className="text-6xl font-black leading-none font-syne text-white/30 -mt-2">&ldquo;</span>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold text-white shrink-0">
                  {featured[0].author.split(' ').map(w => w.charAt(0)).join('')}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/90 flex-1">{testimonialItems[0].text}</p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-white">— {featured[0].author}</p>
                <p className="text-xs text-white/60">{testimonialItems[0].role}</p>
              </div>
            </div>

            {/* Second card */}
            <div className="rounded-2xl p-6 flex flex-col bg-[linear-gradient(135deg,#4158D0,#4F7EE0)]">
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl font-black leading-none font-syne text-white/30 -mt-2">&ldquo;</span>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-base font-bold text-white shrink-0">
                  {featured[1].author.split(' ').map(w => w.charAt(0)).join('')}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/90 flex-1">{testimonialItems[1].text}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-white">— {featured[1].author}</p>
                <p className="text-xs text-white/60">{testimonialItems[1].role}</p>
              </div>
            </div>

            {/* Third card */}
            <div className="rounded-2xl p-6 flex flex-col bg-[linear-gradient(135deg,#7B4DB5,#9B35C5)]">
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl font-black leading-none font-syne text-white/30 -mt-2">&ldquo;</span>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-base font-bold text-white shrink-0">
                  {featured[2].author.split(' ').map(w => w.charAt(0)).join('')}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/90 flex-1">{testimonialItems[2].text}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-white">— {featured[2].author}</p>
                <p className="text-xs text-white/60">{testimonialItems[2].role}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
