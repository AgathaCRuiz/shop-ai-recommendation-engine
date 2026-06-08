'use client'

import { useState } from 'react'
import { Product } from '@/lib/products'
import { REVIEWS } from '@/lib/reviews'
import { Sparkles, Loader2, AlertTriangle } from 'lucide-react'

interface AnalysisResult {
  resumo: string
  sentimento_geral: string
  perfil_ideal: string
  veredicto: string
}

interface Props {
  product: Product
}

export default function AIAnalysis({ product }: Props) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function runAnalysis() {
    setLoading(true)
    setError(null)
    try {
      // Prefere reviews reais da DummyJSON; fallback para mock local
      const productReviews =
        product.reviewList && product.reviewList.length > 0
          ? product.reviewList
          : REVIEWS[product.id] ?? []

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          productCategory: product.category,
          productPrice: product.price,
          reviews: productReviews,
        }),
      })

      const data = await res.json()

      if (res.ok && !data.error) {
        setAnalysis(data)
      } else {
        setError(data.error || 'Erro ao analisar o produto.')
      }
    } catch (e) {
      console.error(e)
      setError('Não foi possível conectar ao serviço de análise.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 pt-5 border-t border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center bg-blue-50">
            <Sparkles className="w-3 h-3 text-blue-500" />
          </div>
          <h4 className="text-sm font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
            Análise IA
          </h4>
          {!analysis && !loading && (
            <span className="text-[11px] text-slate-400">— descubra o que os dados revelam</span>
          )}
        </div>

        {!analysis && (
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-xs font-medium
              bg-blue-50 text-blue-600 hover:bg-blue-100
              border border-blue-200 hover:border-blue-300
              transition-all duration-200
              disabled:opacity-60 disabled:cursor-wait"
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" />
                Analisando...
              </span>
            ) : (
              'Analisar produto'
            )}
          </button>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 mb-4">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-px shrink-0" />
          <p className="text-[12px] text-red-600 leading-relaxed">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && !analysis && (
        <div className="flex items-center justify-center py-8 text-slate-400 gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-xs">Consultando análise inteligente...</span>
        </div>
      )}

      {/* Results grid */}
      {analysis && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <AnalysisCard label="Sentimento geral">{analysis.sentimento_geral}</AnalysisCard>
          <AnalysisCard label="Resumo">{analysis.resumo}</AnalysisCard>
          <AnalysisCard label="Perfil ideal">{analysis.perfil_ideal}</AnalysisCard>
          <AnalysisCard label="Veredicto" accent>{analysis.veredicto}</AnalysisCard>

          <div className="sm:col-span-2 flex justify-center mt-1">
            <button
              onClick={() => setAnalysis(null)}
              className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              ocultar análise
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function AnalysisCard({ label, children, accent }: { label: string; children: string; accent?: boolean }) {
  return (
    <div
      className={`p-3.5 rounded-xl border ${
        accent
          ? 'bg-blue-50/50 border-blue-100'
          : 'bg-slate-50 border-slate-100'
      }`}
    >
      <p className={`text-[10px] font-medium uppercase tracking-wider mb-1.5 ${accent ? 'text-blue-500' : 'text-slate-400'}`}>
        {label}
      </p>
      <p className={`text-[13px] leading-relaxed ${accent ? 'text-blue-800 font-medium' : 'text-slate-600'}`}>
        {children}
      </p>
    </div>
  )
}
