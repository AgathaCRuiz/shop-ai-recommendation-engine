'use client'
import { ReactNode } from 'react'

interface AIPanelProps {
  icon: string
  title: string
  subtitle: string
  children: ReactNode
  onAction: () => void
  actionLabel: string
  isLoading: boolean
  accentColor?: 'blue' | 'amber' | 'green'
}

const ACCENT = {
  blue: { glow: 'rgba(56,189,248,0.16)', bg: 'bg-sky-100', border: 'border-sky-200', text: 'text-sky-600', btn: 'bg-slate-900 hover:bg-slate-800', shadow: '0 8px 28px rgba(15,23,42,0.12)' },
  amber: { glow: 'rgba(245,158,11,0.14)', bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-600', btn: 'bg-slate-900 hover:bg-slate-800', shadow: '0 8px 28px rgba(15,23,42,0.12)' },
  green: { glow: 'rgba(34,197,94,0.14)', bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-600', btn: 'bg-slate-900 hover:bg-slate-800', shadow: '0 8px 28px rgba(15,23,42,0.12)' },
}

export default function AIPanel({
  icon, title, subtitle, children, onAction, actionLabel, isLoading, accentColor = 'blue'
}: AIPanelProps) {
  const a = ACCENT[accentColor]

  return (
    <div className={`rounded-3xl p-5 border ${a.border} relative overflow-hidden bg-white shadow-sm`}>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20"
        style={{ background: `radial-gradient(circle at top right, ${a.glow.replace('0.16', '0.3')}, transparent 70%)` }} />

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-2xl ${a.bg} border ${a.border} flex items-center justify-center text-base ${a.text}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className={`ml-auto w-2.5 h-2.5 rounded-full ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
      </div>

      <div className="mb-4 min-h-[60px]">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-px bg-slate-200 relative overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-1/3 loading-bar-fill rounded-full"></div>
            </div>
            <p className="text-xs text-slate-500 animate-pulse">IA processando sinais de comportamento...</p>
            <div className="h-3 rounded-md bg-slate-100 w-3/4" />
            <div className="h-3 rounded-md bg-slate-100 w-1/2" />
          </div>
        ) : children}
      </div>

      <button
        onClick={onAction}
        disabled={isLoading}
        className={`w-full py-2.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 ${a.btn} disabled:opacity-40 disabled:cursor-not-allowed`}
        style={{ boxShadow: isLoading ? 'none' : a.shadow }}>
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-white/30 border-t-white animate-spin" />
            Processando...
          </span>
        ) : actionLabel}
      </button>
    </div>
  )
}
