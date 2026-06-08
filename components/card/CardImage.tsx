'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/products'
import { getCategoryIcon } from '@/components/catalog/CategoryIcons'

interface Props {
  product: Product
  inCart: boolean
}

const BADGE_CONFIG = {
  hot:  { bg: 'bg-orange-500', label: 'Mais vendido' },
  new:  { bg: 'bg-sky-500',   label: 'Novo' },
  sale: { bg: 'bg-rose-500',  label: 'Oferta' },
}

export default function CardImage({ product, inCart }: Props) {
  const badge   = product.badge ? BADGE_CONFIG[product.badge] : null
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-t-xl bg-slate-100">
      {!imgError ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <div className="flex flex-col items-center gap-1.5 opacity-50">
            <span className="text-2xl">
              {getCategoryIcon(product.category)}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>
      )}

      {/* Subtle bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

      {/* Badge - top left */}
      {badge && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold text-white ${badge.bg} shadow-sm`}>
            {badge.label}
          </span>
        </div>
      )}

      {/* Discount badge - top right */}
      {discount && discount > 0 && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-block px-1.5 py-0.5 rounded-md text-[10px] font-bold text-white bg-rose-500 shadow-sm">
            -{discount}%
          </span>
        </div>
      )}

      {/* Quick view overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
        <span className="px-3 py-1.5 rounded-lg bg-white/95 text-[11px] font-medium text-slate-700 shadow-md backdrop-blur-sm">
          Ver detalhes
        </span>
      </div>

      {/* In cart indicator */}
      {inCart && (
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/90 text-[10px] font-semibold text-white shadow-sm animate-cart-pop">
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Carrinho
        </div>
      )}
    </div>
  )
}
