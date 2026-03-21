'use client'

import { HeroBackground } from './HeroBackground'

export function HeroSection() {

  return (
    <section
      id="home"
      className="hero-background relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Aurora background */}
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center px-6 md:px-16 w-full max-w-screen-2xl mx-auto">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-border bg-surface">
          <span className="w-2 h-2 rounded-full animate-pulse bg-accent" />
          <span className="text-sm font-mono text-muted">Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 className="font-semibold uppercase leading-none mb-8 text-center w-full text-[clamp(2rem,7vw,6rem)] tracking-[-.01em] text-primary">
          TETIANA KUZENKOVA
        </h1>

        {/* Role */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-xl md:text-2xl font-mono tracking-wider text-accent">
            Front-end Engineer
          </span>
        </div>

        {/* Tagline */}
        <p className="text-base md:text-lg max-w-2xl mb-10 leading-relaxed text-center text-primary/55">
          10+ years crafting performant, accessible, and beautifully engineered interfaces.
          Specializing in React ecosystems, design systems, and AI-driven development workflows.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#contact"
            className="group relative overflow-hidden px-7 py-3 rounded-lg font-syne font-semibold text-sm text-bg bg-accent"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 bg-[linear-gradient(to_right,#00E5CC,#7B61FF)] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </a>
          <a
            href="/logos/Tetiana-Kuzenkova-Frontend-CV.pdf"
            download
            className="group relative overflow-hidden px-7 py-3 rounded-lg font-syne font-semibold text-sm border-2 border-accent text-primary hover:text-bg hover:border-transparent transition-colors duration-500"
          >
            <span className="relative z-10">Download CV</span>
            <span className="absolute inset-0 bg-[linear-gradient(to_right,#00E5CC,#7B61FF)] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to My Expertise"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer bg-transparent border-0 p-0"
      >
        <span className="text-xs font-mono text-muted group-hover:text-accent transition-colors duration-300">scroll</span>
        {/* Mouse body */}
        <div className="relative w-6 h-10 rounded-full border-2 border-muted group-hover:border-accent transition-colors duration-300 flex justify-center pt-2">
          {/* Scroll wheel dot */}
          <div className="w-1 h-1 rounded-full bg-muted group-hover:bg-accent transition-colors duration-300 animate-[scrollWheel_1.5s_ease-in-out_infinite]" />
        </div>
      </button>
    </section>
  )
}
