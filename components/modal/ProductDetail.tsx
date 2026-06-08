'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/products'
import { useBehaviorStore } from '@/store/behaviorStore'
import { getCategoryIcon } from '@/components/catalog/CategoryIcons'
import { ShoppingCart, Check } from 'lucide-react'

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  const addToCart = useBehaviorStore((s) => s.addToCart)
  const cart = useBehaviorStore((s) => s.cart)
  const inCart = cart.some((c) => c.id === product.id)
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* Image */}
      <div className="relative w-full md:w-52 flex-shrink-0">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          {!imgError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 208px"
              className="object-cover"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <span className="text-xl">{getCategoryIcon(product.category)}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mt-2">
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
          <span className="text-[11px] text-slate-400">{product.reviews} avaliações</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Category + badge */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
            {getCategoryIcon(product.category)} {product.category}
          </span>
          {product.badge && (
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium text-white ${
              product.badge === 'hot' ? 'bg-orange-500' :
              product.badge === 'new' ? 'bg-sky-500' :
              'bg-rose-500'
            }`}>
              {product.badge === 'hot' ? 'Destaque' : product.badge === 'new' ? 'Novo' : 'Oferta'}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="text-xl font-bold text-slate-900 mb-3 leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span
            className="text-2xl font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            R$ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-slate-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed mb-3">{product.description}</p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-[11px] text-slate-500 bg-slate-100 border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Add to cart */}
        <button
          onClick={() => addToCart(product)}
          disabled={inCart}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
            ${inCart
              ? 'bg-emerald-500 text-white cursor-default shadow-sm'
              : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md active:scale-[0.98]'
            }`}
        >
          {inCart ? (
            <><Check className="w-4 h-4" /> Já está no carrinho</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Adicionar ao carrinho</>
          )}
        </button>
      </div>
    </div>
  )
}
