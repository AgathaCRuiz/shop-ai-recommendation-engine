'use client'

import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: string, duration = 1800, delay = 600) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const el = ref.current
    if (!el) return

    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(num)) return

    const prefix = target.startsWith('+') ? '+' : target.startsWith('≤') ? '≤' : ''
    const suffix = target.endsWith('%') ? '%' : target.endsWith('s') ? 's' : ''
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = (num * eased).toFixed(suffix === 's' ? 1 : 0)
      if (el) el.textContent = `${prefix}${current}${suffix}`
      if (p < 1) requestAnimationFrame(tick)
    }

    setTimeout(() => requestAnimationFrame(tick), delay)
  }, [started, target, duration, delay])

  return ref
}
