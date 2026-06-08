'use client'

interface CatalogMetrics {
  total: number
  categories: number
  minPrice: number
  maxPrice: number
}

interface Props {
  totalProducts: number
  viewedCount: number
  metrics: CatalogMetrics
}

export default function CatalogHeader({ totalProducts, viewedCount, metrics }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-xl
      bg-white border border-slate-200/70 shadow-sm animate-fade-up">
      {/* Left: title + status */}
      <div className="flex items-center gap-3">
        <div>
          <h2
            className="text-base font-bold text-slate-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Catálogo <span className="text-blue-600">Inteligente</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {viewedCount === 0
              ? 'Explore os produtos e descubra seu perfil de compra'
              : `${totalProducts} produtos · ${viewedCount} analisado${viewedCount > 1 ? 's' : ''} pela IA`
            }
          </p>
        </div>
      </div>

      {/* Right: quick metrics */}
      <div className="flex items-center gap-4 sm:gap-5">
        <MetricItem value={metrics.total} label="produtos" />
        <div className="w-px h-7 bg-slate-200" />
        <MetricItem value={metrics.categories} label="categorias" />
        <div className="w-px h-7 bg-slate-200 hidden sm:block" />
        <MetricItem
          value={`R$ ${metrics.minPrice.toFixed(0)}–${metrics.maxPrice.toFixed(0)}`}
          label="faixa de preço"
          className="hidden sm:block"
        />
      </div>
    </div>
  )
}

function MetricItem({ value, label, className = '' }: { value: string | number; label: string; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <p
        className="text-sm font-bold text-slate-900"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </p>
      <p className="text-[10px] text-slate-400">{label}</p>
    </div>
  )
}
