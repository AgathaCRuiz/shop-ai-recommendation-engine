'use client'
import { useState } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import AIPanel from './AIPanel'

interface AnalyticsResult {
  segmento: string
  insights: { tipo: string; titulo: string; descricao: string }[]
  acao_prioritaria: string
}

const INSIGHT_STYLE: Record<string, { icon: string; bg: string; border: string; label: string; text: string }> = {
  comportamento: { icon: '◉', bg: 'bg-sky-100', border: 'border-sky-200', label: 'text-sky-600', text: 'Comportamento' },
  oportunidade: { icon: '◈', bg: 'bg-emerald-100', border: 'border-emerald-200', label: 'text-emerald-600', text: 'Oportunidade' },
  risco: { icon: '◎', bg: 'bg-amber-100', border: 'border-amber-200', label: 'text-amber-600', text: 'Risco' },
}

export default function AnalyticsTab() {
  const [result, setResult] = useState<AnalyticsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const viewed = useBehaviorStore(s => s.viewed)
  const cart = useBehaviorStore(s => s.cart)
  const topCategory = useBehaviorStore(s => s.topCategory)
  const avgPrice = useBehaviorStore(s => s.avgPrice)
  const conversionRate = useBehaviorStore(s => s.conversionRate)
  const cartTotal = useBehaviorStore(s => s.cartTotal)

  async function analyze() {
    if (viewed.length === 0) return
    setLoading(true); setError('')
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
        })
      })
      const data = await res.json()
      if (data.error) setError(data.error)
      else setResult(data)
    } catch { setError('Erro de conexão') }
    finally { setLoading(false) }
  }

  // Timeline
  const timelineItems = viewed.slice(0, 6).map((p, i) => {
    const mins = Math.floor((Date.now() - new Date(p.viewedAt).getTime()) / 60000)
    return { product: p, mins, isRecent: i < 2 }
  })

  const cats: Record<string, number> = {}
  viewed.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1 })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
          Analytics
        </h2>
        <p className="text-xs text-slate-500">Comportamento e padrões de navegação em tempo real</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Produtos vistos', value: viewed.length, icon: '◉' },
          { label: 'No carrinho', value: cart.length, icon: '◈' },
          { label: 'Conversão', value: `${conversionRate()}%`, icon: '◎' },
          { label: 'Ticket potencial', value: cartTotal() > 0 ? `R$${cartTotal()}` : '—', icon: '✦' },
        ].map(m => (
          <div key={m.label} className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs text-slate-400 mb-1">{m.icon}</p>
            <p className="text-xl font-semibold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>{m.value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {Object.keys(cats).length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Interesse por categoria</p>
          <div className="space-y-3">
            {Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([cat, count]) => {
              const pct = Math.round((count / viewed.length) * 100)
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{cat}</span>
                    <span className="text-slate-400">{count}x · {pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="score-fill h-full rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {timelineItems.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Histórico de navegação</p>
          <div className="space-y-0">
            {timelineItems.map((item, i) => (
              <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-slate-200/70 last:border-0">
                <div className="flex flex-col items-center gap-0.5">
                  <div className={`w-2 h-2 rounded-full ${item.isRecent ? 'bg-sky-500' : 'bg-slate-300'}`}></div>
                  {i < timelineItems.length - 1 && <div className="w-px h-4 bg-slate-200"></div>}
                </div>
                <span className="text-lg">{item.product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 truncate">{item.product.name}</p>
                  <p className="text-[10px] text-slate-400">{item.product.category} · R${item.product.price.toFixed(2)}</p>
                </div>
                <p className="text-[10px] text-slate-400 flex-shrink-0">{item.mins === 0 ? 'agora' : `${item.mins}min`}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <AIPanel
        icon="◉"
        title="Análise de Comportamento"
        subtitle="Insights para aumentar conversão"
        onAction={analyze}
        actionLabel={viewed.length === 0 ? 'Navegue pelo catálogo primeiro' : '◉ Analisar comportamento com IA'}
        isLoading={loading}
        accentColor="green">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : result ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">👤</span>
              <p className="text-xs font-medium text-slate-700">{result.segmento}</p>
            </div>
            {result.insights.map((ins, i) => {
              const s = INSIGHT_STYLE[ins.tipo] ?? INSIGHT_STYLE.comportamento
              return (
                <div key={i} className={`p-3 rounded-2xl ${s.bg} border ${s.border}`}>
                  <p className={`text-[10px] font-medium uppercase tracking-wider mb-1 ${s.label}`}>
                    {s.icon} {s.text} · {ins.titulo}
                  </p>
                  <p className="text-sm text-slate-600">{ins.descricao}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-xs text-slate-500">
              {viewed.length === 0 ? 'Sem dados ainda' : 'Pronto para analisar'}
            </p>
          </div>
        )}
      </AIPanel>

      {result?.acao_prioritaria && (
        <div className="p-4 rounded-3xl border border-sky-200 bg-sky-50 animate-fade-up">
          <p className="text-[10px] text-sky-600 font-medium uppercase tracking-wider mb-1.5">◈ Ação prioritária</p>
          <p className="text-sm text-slate-700">{result.acao_prioritaria}</p>
        </div>
      )}
    </div>
  )
}
