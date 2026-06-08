'use client'

import { useState } from 'react'
import HeroBackground from './hero/HeroBackground'
import StatCard from './hero/StatCard'
import SparkBurst from './hero/SparkBurst'

/* ── Data ── */

interface HeroProps {
  onExplore: () => void
}

const STATS = [
  { label: 'conversão média', value: '+34%', icon: '📈' },
  { label: 'produtos no catálogo', value: '12', icon: '📦' },
  { label: 'API calls por sessão', value: '≤3', icon: '⚡' },
  { label: 'latência média', value: '<2s', icon: '🚀' },
]

/* ══════════════════════════════════════════════ */

export default function Hero({ onExplore }: HeroProps) {
  const [hoverPrimary, setHoverPrimary] = useState(false)

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 px-6 bg-slate-50">
      <HeroBackground />

      <div className="relative max-w-4xl mx-auto text-center z-20">
        {/* ── Badge ── */}
        <div className="inline-flex animate-fade-up mb-6">
          <div className="holo-border rounded-full bg-white shadow-sm px-4 py-2 text-xs text-slate-600 font-medium flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            Motor de recomendação com IA em tempo real
          </div>
        </div>

        {/* ── Title ── */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.08] animate-fade-up-2 text-slate-950 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Aumente suas vendas com
          <br />
          <span className="animate-shimmer">IA personalizada</span>
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto mb-8 animate-fade-up-3 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Recomendações inteligentes, análise de comportamento e previsão de compra —
          tudo integrado em uma experiência leve e fácil de usar.
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-4 mb-10">
          {/* Primary CTA */}
          <div
            className="relative inline-flex"
            onMouseEnter={() => setHoverPrimary(true)}
            onMouseLeave={() => setHoverPrimary(false)}
          >
            {/* Glow pulse */}
            <div className="absolute inset-0 rounded-xl animate-glow-pulse"
              style={{ background: 'rgba(59,130,246,0.12)', filter: 'blur(16px)' }}
            />

            <button
              onClick={onExplore}
              className="ripple-effect relative px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800
                text-white text-sm font-semibold transition-all duration-300
                flex items-center justify-center gap-2 hover:scale-[1.04] active:scale-[0.98]
                shadow-lg shadow-slate-900/15"
            >
              <span>Explorar catálogo</span>
              <span className="text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </button>

            {hoverPrimary && <SparkBurst />}
          </div>

          {/* Secondary CTA */}
          <button
            className="ripple-effect relative px-7 py-3 rounded-xl border border-slate-200
              bg-white/80 backdrop-blur-sm text-slate-700 text-sm font-medium
              transition-all duration-300 hover:border-blue-200 hover:text-slate-900
              hover:shadow-md hover:shadow-slate-200/50 hover:bg-white active:scale-[0.98]"
          >
            Ver como funciona
          </button>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
