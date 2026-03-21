'use client'

import { useEffect, useState } from 'react'
import { HeroBackground } from './HeroBackground'

const roles = ['Front-End Engineer', 'React Specialist', 'UI Architect']

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40)
    } else {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* Aurora background */}
      <HeroBackground />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:40px_40px]" />

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

        {/* Typing role */}
        <div className="h-10 flex items-center justify-center mb-6">
          <span className="text-xl md:text-2xl font-mono tracking-wider text-accent">
            {displayed}
            <span className="inline-block w-0.5 h-6 ml-0.5 animate-pulse bg-accent align-middle" />
          </span>
        </div>

        {/* Tagline */}
        <p className="text-base md:text-lg max-w-2xl mb-10 leading-relaxed text-center text-muted">
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
