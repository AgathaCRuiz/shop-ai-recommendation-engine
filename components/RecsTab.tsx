'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/products'
import { useBehaviorStore } from '@/store/behaviorStore'
import { getProducts } from '@/services/products'
import { getCategoryIcon } from './catalog/CategoryIcons'
import AIPanel from './AIPanel'
import { Sparkles, TrendingUp, Zap, Target } from 'lucide-react'

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
  const [catalog, setCatalog] = useState<Product[]>([])

  const viewed = useBehaviorStore((s) => s.viewed)
  const cart = useBehaviorStore((s) => s.cart)
  const topCategory = useBehaviorStore((s) => s.topCategory)
  const avgPrice = useBehaviorStore((s) => s.avgPrice)

  useEffect(() => {
    ;(async () => {
      try {
        setCatalog(await getProducts())
      } catch (err) {
        console.error('Erro ao carregar catálogo:', err)
      }
    })()
  }, [])

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
          <div className="space-y-5">
            {/* Perfil do Comprador */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-blue-600 font-semibold mb-1">Perfil do Comprador</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{result.perfil}</p>
                </div>
              </div>
            </div>

            {/* Recomendações com ícones */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <p className="text-sm font-semibold text-slate-900">Produtos Recomendados</p>
              </div>
              <div className="space-y-3">
                {result.recomendacoes.map((item, index) => {
                  const productName = item.nome.split('(')[0].trim()
                  const product = catalog.find((p) => p.name.toLowerCase() === productName.toLowerCase())
                  const category = product?.category ?? item.nome.match(/\(([^,]+),/)?.[1]?.trim() ?? ''

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-3xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="relative h-24 w-24 rounded-3xl overflow-hidden bg-slate-100 flex-shrink-0">
                        {product?.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-blue-500">
                            {getCategoryIcon(category)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0">
                            <p className="text-base font-semibold text-slate-900 truncate">
                              {productName}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 truncate">{item.razao}</p>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold px-2 py-1 rounded-full bg-blue-100 flex-shrink-0">
                            #{index + 1}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                          {category && <span className="rounded-full bg-slate-100 px-2 py-1">{category}</span>}
                          {product && (
                            <span className="rounded-full bg-slate-100 px-2 py-1">
                              R$ {product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upsell e Urgência */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-200 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold mb-1">Oportunidade de Upsell</p>
                    <p className="text-xs text-slate-700">{result.upsell}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-amber-600 font-semibold mb-1">Gatilho de Urgência</p>
                    <p className="text-xs text-slate-700">{result.urgencia}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">
              {viewed.length === 0 ? 'Navegue pelo catálogo para gerar recomendações' : 'Clique em "Gerar recomendações" para começar'}
            </p>
          </div>
        )}
      </AIPanel>
    </div>
  )
}
