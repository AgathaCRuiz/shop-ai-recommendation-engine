'use client'

import { useMemo } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import { getCategoryIcon } from '@/components/catalog/CategoryIcons'
import { Clock, Eye, ShoppingCart, ExternalLink } from 'lucide-react'

interface Props {
  className?: string
  onOpenHistory?: () => void
}

export default function SessionTimeline({ className = '', onOpenHistory }: Props) {
  const viewed = useBehaviorStore(s => s.viewed)
  const cart = useBehaviorStore(s => s.cart)

  const items = useMemo(() => {
    // Combinar viewed + cart em uma timeline unificada
    const combined = [
      ...viewed.map(p => ({
        ...p,
        type: 'view' as const,
        timestamp: new Date(p.viewedAt).getTime(),
        minsAgo: Math.floor((Date.now() - new Date(p.viewedAt).getTime()) / 60000),
      })),
      ...cart.map(p => ({
        ...p,
        type: 'cart' as const,
        timestamp: Date.now(),
        minsAgo: 0,
      })),
    ]
    // Dedeplicar: se está no carrinho E foi visto, mostrar como cart
    const cartIds = new Set(cart.map(c => c.id))
    const deduped = combined.filter(
      (item, idx, arr) => item.type === 'cart' || !cartIds.has(item.id)
    )
    // Ordenar por timestamp decrescente e pegar últimos 8
    return deduped
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 8)
  }, [viewed, cart])

  if (items.length === 0) {
    return (
      <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Linha do Tempo</p>
            <p className="text-[10px] text-slate-400">Atividade na sessão atual</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="w-8 h-8 text-slate-200 mb-2" />
          <p className="text-xs text-slate-400">Sua atividade aparecerá aqui</p>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onOpenHistory}
      className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm
        transition-all duration-300 hover:shadow-md hover:border-blue-200/60 hover:bg-slate-50/50
        ${onOpenHistory ? 'cursor-pointer group/card' : ''} ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center
            group-hover/card:bg-blue-50 group-hover/card:border-blue-200 transition-colors duration-300">
            <Clock className="w-3.5 h-3.5 text-slate-500 group-hover/card:text-blue-500 transition-colors duration-300" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Linha do Tempo</p>
            <p className="text-[10px] text-slate-400">Últimas {items.length} ações na sessão</p>
          </div>
        </div>
        {onOpenHistory && (
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 group-hover/card:text-blue-500 transition-colors duration-300">
            <span className="hidden sm:inline">Ver histórico completo</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        )}
      </div>

      <div className="space-y-0">
        {items.map((item, i) => {
          const isCart = item.type === 'cart'
          const isRecent = item.minsAgo < 3

          return (
            <div
              key={`${item.id}-${item.type}`}
              className="group relative flex items-center gap-3 py-2.5 pr-1 pl-0
                rounded-lg hover:bg-slate-50 transition-colors duration-200"
            >
              {/* Connector line */}
              <div className="flex flex-col items-center self-stretch">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300
                  ${isCart
                    ? 'bg-emerald-500 shadow-sm shadow-emerald-200'
                    : isRecent
                      ? 'bg-blue-500 shadow-sm shadow-blue-200'
                      : 'bg-slate-300'
                  }`}
                />
                {i < items.length - 1 && (
                  <div className="w-px flex-1 bg-slate-200 group-hover:bg-slate-300 transition-colors mt-0.5" />
                )}
              </div>

              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm
                ${isCart ? 'bg-emerald-50' : isRecent ? 'bg-blue-50' : 'bg-slate-100'}`}
              >
                {isCart ? (
                  <ShoppingCart className="w-3.5 h-3.5 text-emerald-500" />
                ) : isRecent ? (
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                ) : (
                  <span className="text-xs">{getCategoryIcon(item.category)}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium text-slate-700 truncate">{item.name}</p>
                  {isCart && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-600 font-medium flex-shrink-0">
                      Carrinho
                    </span>
                  )}
                  {isRecent && !isCart && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-600 font-medium flex-shrink-0">
                      Recente
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  {item.category} · R$ {item.price.toFixed(2)}
                </p>
              </div>

              {/* Time */}
              <p className="text-[10px] text-slate-400 flex-shrink-0 tabular-nums">
                {item.minsAgo === 0 ? 'agora' : item.minsAgo < 60 ? `${item.minsAgo}min` : `${Math.floor(item.minsAgo / 60)}h`}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
