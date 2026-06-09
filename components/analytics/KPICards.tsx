'use client'

import { useMemo } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import {
  Eye, ShoppingCart, TrendingUp, DollarSign, Clock,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react'

interface KPIProps {
  viewedCount: number
  cartCount: number
  conversionRate: number
  cartTotal: number
  sessionMinutes: number
}

export default function KPICards({
  viewedCount,
  cartCount,
  conversionRate,
  cartTotal,
  sessionMinutes,
}: KPIProps) {
  const viewed = useBehaviorStore(s => s.viewed)

  // Derivar tendências (últimos vs penúltimos períodos)
  const trends = useMemo(() => {
    const recent = viewed.slice(0, 3)
    const older = viewed.slice(3, 6)

    const recentAvgPrice = recent.length
      ? recent.reduce((s, p) => s + p.price, 0) / recent.length
      : 0
    const olderAvgPrice = older.length
      ? older.reduce((s, p) => s + p.price, 0) / older.length
      : recentAvgPrice

    const priceTrend = olderAvgPrice
      ? Math.round(((recentAvgPrice - olderAvgPrice) / olderAvgPrice) * 100)
      : 0

    return {
      priceTrend,
      recentCount: recent.length,
    }
  }, [viewed])

  const cards = [
    {
      label: 'Produtos vistos',
      value: viewedCount,
      icon: Eye,
      color: 'blue' as const,
      subtitle: trends.recentCount > 0 ? `+${trends.recentCount} nesta sessão` : 'Navegue o catálogo',
      trend: 0,
    },
    {
      label: 'No carrinho',
      value: cartCount,
      icon: ShoppingCart,
      color: 'emerald' as const,
      subtitle: cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''} adicionado${cartCount > 1 ? 's' : ''}` : 'Adicione produtos',
      trend: 0,
    },
    {
      label: 'Taxa de conversão',
      value: conversionRate,
      suffix: '%',
      icon: TrendingUp,
      color: 'violet' as const,
      subtitle: conversionRate >= 30 ? 'Excelente' : conversionRate >= 15 ? 'Boa' : 'Em desenvolvimento',
      trend: 0,
    },
    {
      label: 'Ticket potencial',
      value: cartTotal,
      prefix: 'R$',
      icon: DollarSign,
      color: 'amber' as const,
      subtitle: trends.priceTrend !== 0
        ? `Ticket ${trends.priceTrend > 0 ? 'subindo' : 'caindo'} ${Math.abs(trends.priceTrend)}%`
        : 'Sem dados',
      trend: trends.priceTrend,
    },
    {
      label: 'Sessão ativa',
      value: sessionMinutes,
      suffix: 'min',
      icon: Clock,
      color: 'sky' as const,
      subtitle: sessionMinutes < 2 ? 'Começou agora' : sessionMinutes < 10 ? 'Explorando' : 'Engajado',
      trend: 0,
    },
  ]

  const colorMap: Record<string, { icon: string; bg: string; border: string; glow: string }> = {
    blue:    { icon: 'text-blue-500',   bg: 'bg-blue-50',   border: 'border-blue-100',   glow: 'rgba(59,130,246,0.08)' },
    emerald: { icon: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', glow: 'rgba(16,185,129,0.08)' },
    violet:  { icon: 'text-violet-500',  bg: 'bg-violet-50',  border: 'border-violet-100',  glow: 'rgba(139,92,246,0.08)' },
    amber:   { icon: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-100',   glow: 'rgba(245,158,11,0.08)' },
    sky:     { icon: 'text-sky-500',     bg: 'bg-sky-50',     border: 'border-sky-100',     glow: 'rgba(14,165,233,0.08)' },
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card, i) => {
        const c = colorMap[card.color]
        const Icon = card.icon

        return (
          <div
            key={card.label}
            className="group relative rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm
              hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5
              animate-card-enter"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${c.glow}, transparent 60%)` }}
            />

            <div className="relative z-10">
              {/* Icon + Label */}
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${c.icon}`} />
                </div>
                {card.trend !== 0 && (
                  <span className={`flex items-center gap-0.5 text-[10px] font-medium
                    ${card.trend > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}
                    px-1.5 py-0.5 rounded-md`}>
                    {card.trend > 0 ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                    {Math.abs(card.trend)}%
                  </span>
                )}
              </div>

              {/* Value */}
              <p
                className="text-xl font-bold text-slate-900 tracking-tight mb-0.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {card.prefix && <span className="text-sm font-medium text-slate-400 mr-0.5">{card.prefix}</span>}
                {typeof card.value === 'number' && card.value % 1 !== 0
                  ? card.value.toFixed(1)
                  : card.value}
                {card.suffix && <span className="text-sm font-medium text-slate-400 ml-0.5">{card.suffix}</span>}
              </p>

              {/* Label + subtitle */}
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{card.label}</p>
              <p className="text-[10px] text-slate-400/70">{card.subtitle}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
