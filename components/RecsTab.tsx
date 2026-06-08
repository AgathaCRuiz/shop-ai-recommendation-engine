'use client'

import { useState } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import AIPanel from './AIPanel'

interface Recommendation {
  nome: string
  razao: string
}

interface RecsResult {

  perfil: string
  recomendacoes: Recommendation[]
  upsell: string
  urgencia: string
}

export default function RecsTab() {
  const [result, setResult] = useState<RecsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const viewed = useBehaviorStore((s) => s.viewed)
  const cart = useBehaviorStore((s) => s.cart)
  const topCategory = useBehaviorStore((s) => s.topCategory)
  const avgPrice = useBehaviorStore((s) => s.avgPrice)

  async function fetchRecs() {
    if (viewed.length === 0) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          viewedNames: viewed.map((p) => `${p.name} (${p.category}, R$${p.price})`).join(', '),
          cartNames: cart.map((p) => p.name).join(', '),
          topCat: topCategory() ?? '',
          avgPrice: avgPrice(),
          viewedCount: viewed.length,
          cartCount: cart.length,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setResult(null)
      } else {
        setResult(data)
      }
    } catch (err) {
      setError('Erro de conexão com a API de recomendações')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
          Recomendações Inteligentes
        </h2>
        <p className="text-xs text-slate-500">Use a IA para gerar recomendações de produto e sugestões de upsell</p>
      </div>

      <AIPanel
        icon="★"
        title="Recomendador de Compra"
        subtitle="Insights de upsell e escolhas mais prováveis"
        onAction={fetchRecs}
        actionLabel={viewed.length === 0 ? 'Navegue primeiro pelo catálogo' : 'Gerar recomendações'}
        isLoading={loading}
        accentColor="blue"
      >
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : result ? (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">Perfil do comprador</p>
              <p className="text-sm text-slate-700">{result.perfil}</p>
            </div>

            <div className="space-y-3">
              {result.recomendacoes.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.nome}
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-sky-600">Recomendado</span>
                  </div>
                  <p className="text-xs text-slate-600">{item.razao}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-emerald-600 mb-2">Sugestão de Upsell</p>
                <p className="text-xs text-slate-700">{result.upsell}</p>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-amber-600 mb-2">Gatilho de urgência</p>
                <p className="text-xs text-slate-700">{result.urgencia}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-xs text-slate-500">
              {viewed.length === 0 ? 'Sem histórico de navegação ainda' : 'Pronto para gerar recomendações'}
            </p>
          </div>
        )}
      </AIPanel>
    </div>
  )
}
