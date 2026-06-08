'use client'

import { useState } from 'react'
import { Product } from '@/lib/products'
import { useBehaviorStore } from '@/store/behaviorStore'
import CardImage from './card/CardImage'
import { getCategoryIcon } from './catalog/CategoryIcons'
import { ShoppingCart, Check } from 'lucide-react'

interface Props {
  product: Product
  onOpenModal: (p: Product) => void
}

export default function ProductCard({ product, onOpenModal }: Props) {
  const viewProduct = useBehaviorStore((s) => s.viewProduct)
  const addToCart   = useBehaviorStore((s) => s.addToCart)
  const cart        = useBehaviorStore((s) => s.cart)
  const viewed      = useBehaviorStore((s) => s.viewed)

  const [justAdded, setJustAdded] = useState(false)
  const inCart   = cart.some((c) => c.id === product.id)
  const isViewed = viewed.some((v) => v.id === product.id)
  const catEmoji = getCategoryIcon(product.category)

  function handleClick() {
    viewProduct(product)
    onOpenModal(product)
  }

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation()
    addToCart(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 800)
  }

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col rounded-xl cursor-pointer transition-all duration-300
        bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Viewed indicator - subtle top accent */}
      {isViewed && (
        <div className="absolute top-0 left-2 right-2 h-[2px] rounded-full z-10 bg-sky-400/60" />
      )}

      <CardImage product={product} inCart={inCart} />

      {/* Product info */}
      <div className="flex flex-col gap-1 p-3">
        {/* Category */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-xs">{catEmoji}</span>
            {product.category}
          </span>
          {isViewed && (
            <span className="ml-auto text-[10px] text-sky-500/70 flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              visto
            </span>
          )}
        </div>

        {/* Product name */}
        <h3
          className="text-[13px] font-medium text-slate-800 leading-snug line-clamp-2 group-hover:text-slate-900 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-px">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'text-amber-400' : 'text-slate-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-slate-400">({product.reviews})</span>
        </div>

        {/* Price + Cart button */}
        <div className="flex items-center justify-between gap-2 mt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-lg font-bold text-slate-900 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            title={inCart ? 'No carrinho' : 'Adicionar ao carrinho'}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 flex-shrink-0
              ${inCart
                ? 'bg-emerald-500 text-white shadow-sm'
                : justAdded
                  ? 'bg-emerald-500 text-white shadow-sm scale-105'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md active:scale-95'
              }`}
          >
            {inCart || justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
