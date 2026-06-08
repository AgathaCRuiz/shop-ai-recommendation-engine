'use client'

import { useCountUp } from '@/lib/useCountUp'

interface StatData {
  label: string
  value: string
  icon: string
}

export default function StatCard({ stat, index }: { stat: StatData; index: number }) {
  const countRef = useCountUp(stat.value, 1600, 600 + index * 120)

  return (
    <div
      className="animate-stat-enter group relative rounded-2xl overflow-hidden
        bg-white/60 backdrop-blur-md border border-slate-200/60
        hover:border-blue-200/60 hover:bg-white/80 hover:shadow-lg
        transition-all duration-500 hover:-translate-y-1"
      style={{
        animationDelay: `${0.5 + index * 0.12}s`,
      }}
    >
      {/* Hover glow ring */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative text-center px-5 py-4">
        {/* Icon */}
        <div className="text-lg mb-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {stat.icon}
        </div>

        {/* Value */}
        <p
          className="text-lg font-bold text-slate-900 relative z-10 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span ref={countRef}>{stat.value}</span>
        </p>

        {/* Label */}
        <p className="text-[10px] text-slate-400 mt-0.5 relative z-10 group-hover:text-slate-500 transition-colors">
          {stat.label}
        </p>
      </div>
    </div>
  )
}
