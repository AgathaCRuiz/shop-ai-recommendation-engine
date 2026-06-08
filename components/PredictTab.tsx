'use client'
import { useState } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import AIPanel from './AIPanel'

interface PredictResult {
  probabilidade: number
  timing: string
  categoria_mais_provavel: string
  ticket_estimado: number
  confianca: string
  acao_recomendada: string
  gatilho_principal: string
  scores_categoria: Record<string, number>
}

export default function PredictTab() {
  const [result, setResult] = useState<PredictResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const viewed = useBehaviorStore(s => s.viewed)
  const cart = useBehaviorStore(s => s.cart)
  const topCategory = useBehaviorStore(s => s.topCategory)
  const avgPrice = useBehaviorStore(s => s.avgPrice)

  async function predict() {
    if (viewed.length === 0) return
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/predict', {
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

  const prob = result ? Math.min(100, Math.max(0, Math.round(result.probabilidade))) : 0
  const probColor = prob >= 70 ? '#4ADE80' : prob >= 40 ? '#FBBF24' : '#F87171'
  const probGlow = prob >= 70 ? 'rgba(74,222,128,0.3)' : prob >= 40 ? 'rgba(251,191,36,0.3)' : 'rgba(248,113,113,0.3)'

  const TIMING_LABELS: Record<string, string> = {
    hoje: '⚡ Hoje',
    'esta semana': '📅 Esta semana',
    'este mês': '🗓 Este mês',
    incerto: '? Incerto',
  }

  const CONF_STYLE: Record<string, string> = {
    alta: 'text-green-400 bg-green-500/10 border-green-500/20',
    média: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    baixa: 'text-red-400 bg-red-500/10 border-red-500/20',
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
          Previsão de Compra
        </h2>
        <p className="text-xs text-slate-500">Probabilidade e timing ideal de conversão por IA</p>
      </div>

      <AIPanel
        icon="◎"
        title="Modelo Preditivo"
        subtitle="Intenção de compra e timing"
        onAction={predict}
        actionLabel={viewed.length === 0 ? 'Navegue pelo catálogo primeiro' : '◎ Prever intenção de compra'}
        isLoading={loading}
        accentColor="amber">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : result ? (
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
                <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="6" />
                <circle cx="30" cy="30" r="24" fill="none" stroke={probColor}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${(prob / 100) * 150.8} 150.8`}
                  style={{ filter: `drop-shadow(0 0 6px ${probGlow})` }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: probColor, fontFamily: 'var(--font-display)' }}>
                  {prob}%
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Timing:</span>
                <span className="text-xs text-slate-700">
                  {TIMING_LABELS[result.timing] ?? result.timing}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Confiança:</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${CONF_STYLE[result.confianca] ?? ''}`}>
                  {result.confianca}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Ticket est.:</span>
                <span className="text-xs text-slate-700">R$ {Math.round(result.ticket_estimado)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-xs text-slate-500">
              {viewed.length === 0 ? 'Sem dados ainda' : 'Pronto para prever'}
            </p>
          </div>
        )}
      </AIPanel>

      {result && (
        <div className="space-y-4 animate-fade-up">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Score por categoria</p>
            <div className="space-y-3">
              {Object.entries(result.scores_categoria).sort((a, b) => b[1] - a[1]).map(([cat, score]) => {
                const s = Math.round(score)
                const isTop = cat === result.categoria_mais_provavel
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className={isTop ? 'text-slate-900 font-medium' : 'text-slate-500'}>{cat}</span>
                      <span className={isTop ? 'text-amber-500' : 'text-slate-400'}>{s}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${s}%`,
                          background: isTop
                            ? 'linear-gradient(90deg, #D97706, #FCD34D)'
                            : 'linear-gradient(90deg, #2563EB, #60A5FA)'
                        }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-3xl border border-slate-200 bg-slate-50">
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-1.5">◈ Ação recomendada</p>
              <p className="text-xs text-slate-700">{result.acao_recomendada}</p>
            </div>
            <div className="p-4 rounded-3xl border border-slate-200 bg-slate-50">
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-1.5">⚡ Gatilho principal</p>
              <p className="text-xs text-slate-700">{result.gatilho_principal}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
