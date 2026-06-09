'use client'

import { useState, useMemo } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import AIPanel from './AIPanel'
import KPICards from './analytics/KPICards'
import CategoryDonut from './analytics/CategoryDonut'
import ConversionFunnel from './analytics/ConversionFunnel'
import PriceRangeChart from './analytics/PriceRangeChart'
import SessionTimeline from './analytics/SessionTimeline'
import SessionHistoryModal from './analytics/SessionHistoryModal'
import { Sparkles, RefreshCw } from 'lucide-react'

interface AnalyticsResult {
  segmento: string
  insights: { tipo: string; titulo: string; descricao: string }[]
  acao_prioritaria: string
}

const INSIGHT_STYLE: Record<string, { icon: string; bg: string; border: string; label: string; name: string }> = {
  comportamento: { icon: '◉', bg: 'bg-blue-50', border: 'border-blue-200', label: 'text-blue-600', name: 'Comportamento' },
  oportunidade: { icon: '◈', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'text-emerald-600', name: 'Oportunidade' },
  risco: { icon: '◎', bg: 'bg-amber-50', border: 'border-amber-200', label: 'text-amber-600', name: 'Risco' },
}

export default function AnalyticsTab() {
  const [result, setResult] = useState<AnalyticsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const viewed = useBehaviorStore(s => s.viewed)
  const cart = useBehaviorStore(s => s.cart)
  const topCategory = useBehaviorStore(s => s.topCategory)
  const avgPrice = useBehaviorStore(s => s.avgPrice)
  const conversionRate = useBehaviorStore(s => s.conversionRate)
  const cartTotal = useBehaviorStore(s => s.cartTotal)
  const sessionStart = useBehaviorStore(s => s.sessionStart)

  const sessionMinutes = useMemo(
    () => Math.floor((Date.now() - new Date(sessionStart).getTime()) / 60000),
    [sessionStart],
  )

  async function analyze() {
    if (viewed.length === 0) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          viewedNames: viewed.map(p => `${p.name} (${p.category}, R$${p.price})`).join(', '),
          cartNames: cart.map(p => p.name).join(', '),
          topCat: topCategory() ?? '',
          avgPrice: avgPrice(),
          viewedCount: viewed.length,
          cartCount: cart.length,
        }),
      })
      const data = await res.json()
      if (data.error) setError(data.error)
      else setResult(data)
    } catch {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
            Analytics
          </h2>
          <p className="text-xs text-slate-500">Dashboard de comportamento e padrões de navegação</p>
        </div>
        {result && (
          <button
            onClick={analyze}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              text-slate-500 bg-white border border-slate-200 hover:border-slate-300
              hover:text-slate-700 transition-all duration-200"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        )}
      </div>

      {/* ── KPI Cards ── */}
      <KPICards
        viewedCount={viewed.length}
        cartCount={cart.length}
        conversionRate={conversionRate()}
        cartTotal={cartTotal()}
        sessionMinutes={sessionMinutes}
      />

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryDonut />
        <ConversionFunnel />
      </div>

      {/* ── Second Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PriceRangeChart />
        <SessionTimeline onOpenHistory={() => setShowHistory(true)} />
      </div>

      {/* ── AI Panel ── */}
      <AIPanel
        icon={<Sparkles className="w-4 h-4" />}
        title="Análise de Comportamento"
        subtitle="Insights gerados por IA para aumentar conversão"
        onAction={analyze}
        actionLabel={
          viewed.length === 0
            ? 'Navegue pelo catálogo primeiro'
            : loading
              ? 'Analisando...'
              : 'Analisar comportamento com IA'
        }
        isLoading={loading}
        accentColor="green"
      >
        {error ? (
          <p className="text-xs text-rose-500 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>
        ) : result ? (
          <div className="space-y-3">
            {/* Segment */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">👤</span>
              <p className="text-xs font-semibold text-slate-700">{result.segmento}</p>
            </div>

            {/* Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {result.insights.map((ins, i) => {
                const s = INSIGHT_STYLE[ins.tipo] ?? INSIGHT_STYLE.comportamento
                return (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl ${s.bg} border ${s.border}
                      hover:shadow-sm transition-all duration-300`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <p className={`text-[9px] font-semibold uppercase tracking-wider mb-1 ${s.label}`}>
                      {s.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-800 mb-0.5">{ins.titulo}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{ins.descricao}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Sparkles className="w-6 h-6 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">
              {viewed.length === 0
                ? 'Navegue pelo catálogo para gerar análises'
                : `${viewed.length} produto${viewed.length > 1 ? 's' : ''} analisado${viewed.length > 1 ? 's' : ''} — pronto para análise IA`}
            </p>
          </div>
        )}
      </AIPanel>

      {/* ── Priority Action ── */}
      {result?.acao_prioritaria && (
        <div className="p-4 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 animate-fade-up">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
              Ação Prioritária
            </p>
          </div>
          <p className="text-sm text-slate-700 font-medium">{result.acao_prioritaria}</p>
        </div>
      )}

      {/* ── Session History Modal ── */}
      <SessionHistoryModal open={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  )
}
