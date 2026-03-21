'use client'

import { useEffect, useRef } from 'react'

const LAYERS = [
  {
    speed: 0.012,
    size: 72,
    squares: [
      { top: '6%', left: '4%', opacity: 0.08 },
      { top: '10%', left: '83%', opacity: 0.07 },
      { top: '74%', left: '5%', opacity: 0.09 },
      { top: '80%', left: '87%', opacity: 0.07 },
    ],
  },
  {
    speed: 0.028,
    size: 44,
    squares: [
      { top: '4%', left: '17%', opacity: 0.07 },
      { top: '14%', left: '73%', opacity: 0.08 },
      { top: '32%', left: '6%', opacity: 0.06 },
      { top: '56%', left: '3%', opacity: 0.07 },
      { top: '66%', left: '79%', opacity: 0.06 },
      { top: '86%', left: '52%', opacity: 0.08 },
    ],
  },
  {
    speed: 0.048,
    size: 28,
    squares: [
      { top: '2%', left: '57%', opacity: 0.06 },
      { top: '21%', left: '92%', opacity: 0.07 },
      { top: '42%', left: '1%', opacity: 0.05 },
      { top: '51%', left: '96%', opacity: 0.06 },
      { top: '83%', left: '24%', opacity: 0.07 },
      { top: '91%', left: '76%', opacity: 0.05 },
    ],
  },
]

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function HeroBackground() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number | null = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let isRunning = false

    const schedule = () => {
      if (!isRunning) {
        isRunning = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - window.innerWidth / 2
      targetY = e.clientY - window.innerHeight / 2
      schedule()
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.07
      currentY += (targetY - currentY) * 0.07

      layerRefs.current.forEach((el, i) => {
        if (!el) return
        const s = LAYERS[i].speed
        el.style.transform = `translate(${currentX * s}px, ${currentY * s}px)`
      })

      const dx = Math.abs(targetX - currentX)
      const dy = Math.abs(targetY - currentY)
      if (dx > 0.1 || dy > 0.1) {
        rafId = requestAnimationFrame(tick)
      } else {
        isRunning = false
        rafId = null
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={el => { layerRefs.current[i] = el }}
          className="absolute inset-0"
          style={{ willChange: 'transform' }}
        >
          {layer.squares.map((sq, j) => (
            <div
              key={j}
              className="absolute bg-white"
              style={{
                top: sq.top,
                left: sq.left,
                width: layer.size,
                height: layer.size,
                opacity: sq.opacity,
              }}
            />
          ))}
        </div>
      ))}

      <div className="orb-1 absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgb(0_229_204/0.35)_0%,transparent_70%)] blur-[100px] opacity-70" />
      <div className="orb-2 absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgb(123_97_255/0.35)_0%,transparent_70%)] blur-[120px] opacity-70" />
      <div className="orb-3 absolute top-[40%] left-[35%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgb(0_229_204/0.18)_0%,transparent_70%)] blur-[80px] opacity-60" />
      <div className="orb-4 absolute top-[5%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgb(123_97_255/0.25)_0%,transparent_70%)] blur-[90px] opacity-60" />

      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_SVG, backgroundSize: '200px 200px' }}
      />
    </div>
  )
}
