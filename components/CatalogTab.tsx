'use client'

import { useEffect, useState, useMemo } from 'react'
import { Product } from '@/lib/products'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import { useBehaviorStore } from '@/store/behaviorStore'
import { getProducts } from '@/services/products'
import CatalogHeader from './catalog/CatalogHeader'
import CatalogToolbar from './catalog/CatalogToolbar'
import SkeletonCard from './catalog/SkeletonCard'
import { Search, XCircle } from 'lucide-react'

/* ══════════════════════════════════════════════ */

export default function CatalogTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('default')
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const viewed = useBehaviorStore((s) => s.viewed)

  /* ── Fetch ── */

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (e) {
        console.error('Erro ao carregar produtos:', e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  /* ── Derived ── */

  const categories = useMemo(
    () => ['Todos', ...new Set(products.map((p) => p.category))],
    [products],
  )

  const filtered = useMemo(() => {
    let r = category === 'Todos' ? [...products] : products.filter((p) => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      )
    }
    if (sort === 'price-asc') r.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') r.sort((a, b) => b.price - a.price)
    return r
  }, [products, category, search, sort])

  const metrics = useMemo(() => {
    if (!products.length) return { total: 0, categories: 0, minPrice: 0, maxPrice: 0 }
    const prices = products.map((p) => p.price)
    return {
      total: products.length,
      categories: categories.length - 1,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    }
  }, [products, categories])

  /* ── Loading ── */

  if (loading) {
    return (
      <div className="space-y-4 animate-fade-in">
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200/70">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-40 rounded-full skeleton-shimmer" />
            </div>
            <div className="h-2.5 w-56 rounded-full skeleton-shimmer" />
          </div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-1">
                <div className="h-5 w-12 rounded-full skeleton-shimmer mx-auto" />
                <div className="h-2 w-14 rounded-full skeleton-shimmer mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar skeleton */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 h-9 rounded-lg skeleton-shimmer" />
            <div className="h-9 w-28 rounded-lg skeleton-shimmer" />
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-7 rounded-lg skeleton-shimmer ${i === 1 ? 'w-16' : 'w-20'}`}
              />
            ))}
          </div>
        </div>

        {/* Card grid - matches responsive breakpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} delay={(i % 8) + 1} />
          ))}
        </div>
      </div>
    )
  }

  /* ── Render ── */

  return (
    <div className="space-y-4">
      <CatalogHeader
        totalProducts={products.length}
        viewedCount={viewed.length}
        metrics={metrics}
      />

      <CatalogToolbar
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        resultsCount={filtered.length}
      />

      {/* Product grid or empty */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              className="animate-card-enter"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <ProductCard product={product} onOpenModal={setSelectedProduct} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState search={search} category={category} onClear={() => { setSearch(''); setCategory('Todos') }} />
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}

/* ── Empty State ── */

function EmptyState({ search, category, onClear }: { search: string; category: string; onClear: () => void }) {
  const categoryLabel = category !== 'Todos' ? (
    <span className="text-slate-500"> na categoria &quot;{category}&quot;</span>
  ) : null

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-up-3">
      <Search className="w-10 h-10 text-slate-300 mb-4" />
      <h3
        className="text-base font-semibold text-slate-800 mb-1.5"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Nenhum produto encontrado
      </h3>
      <p className="text-[13px] text-slate-500 max-w-sm mb-5">
        Nenhum resultado para <span className="text-slate-700 font-medium">&quot;{search}&quot;</span>
        {categoryLabel}. Tente outros termos ou limpe os filtros.
      </p>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 shadow-sm"
      >
        <XCircle className="w-3.5 h-3.5" />
        Limpar filtros
      </button>
    </div>
  )
}
