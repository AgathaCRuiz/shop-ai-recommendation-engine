'use client'

import { useEffect, useState } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import { getCategoryIcon } from '@/components/catalog/CategoryIcons'
import { PROFILES } from '@/lib/profiles'
import {
  X, Clock, Eye, ShoppingCart, DollarSign, TrendingUp
} from 'lucide-react'
import Image from 'next/image'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SessionHistoryModal({ open, onClose }: Props) {
  const viewed = useBehaviorStore(s => s.viewed)
  const cart = useBehaviorStore(s => s.cart)
  const activeProfile = useBehaviorStore(s => s.activeProfile)
  const [visible, setVisible] = useState(false)

  const profile = activeProfile ? PROFILES.find(p => p.id === activeProfile) : null

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
  }, [open])

  if (!open) return null

  const totalViews = viewed.length
  const totalCart = cart.length
  const totalSpent = cart.reduce((s, p) => s + p.price, 0)
  const conversionRate = totalViews > 0 ? Math.round((totalCart / totalViews) * 100) : 0

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-2xl rounded-2xl bg-white transition-all duration-300 my-8
          ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {profile ? `Histórico de ${profile.name}` : 'Histórico da Sessão'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{profile?.description ?? 'Histórico de compra e interações'}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-4 gap-3 px-6 py-4 border-b border-slate-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="w-3.5 h-3.5 text-blue-500" />
              <p className="text-sm font-bold text-slate-900">{totalViews}</p>
            </div>
            <p className="text-[10px] text-slate-500">Visualizados</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-sm font-bold text-slate-900">{totalCart}</p>
            </div>
            <p className="text-[10px] text-slate-500">No carrinho</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-sm font-bold text-slate-900">R${totalSpent.toFixed(0)}</p>
            </div>
            <p className="text-[10px] text-slate-500">Total</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-violet-500" />
              <p className="text-sm font-bold text-slate-900">{conversionRate}%</p>
            </div>
            <p className="text-[10px] text-slate-500">Conversão</p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-6">
          {/* Carrinho section */}
          {cart.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">No Carrinho</h3>
                  <p className="text-[11px] text-slate-500">{totalCart} item{totalCart > 1 ? 's' : ''} adicionado{totalCart > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {cart.map((p, i) => (
                  <ProductMiniCard key={`cart-${p.id}-${i}`} product={p} variant="cart" stepNumber={i + 1} />
                ))}
              </div>
            </div>
          )}

          {/* Visualizados section */}
          {viewed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Visualizados</h3>
                  <p className="text-[11px] text-slate-500">{totalViews} produto{totalViews > 1 ? 's' : ''} visualizado{totalViews > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {viewed.map((p, i) => {
                  const minsAgo = Math.floor((Date.now() - new Date(p.viewedAt).getTime()) / 60000)
                  const timeLabel = minsAgo === 0 ? 'agora' : minsAgo < 60 ? `${minsAgo}min` : `${Math.floor(minsAgo / 60)}h`
                  return (
                    <ProductMiniCard
                      key={`viewed-${p.id}-${i}`}
                      product={p}
                      variant="viewed"
                      timeAgo={timeLabel}
                      stepNumber={i + 1}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {cart.length === 0 && viewed.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm text-slate-400">Nenhum produto registrado nesta sessão</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


/* ── Product Mini Card ── */

function ProductMiniCard({
  product,
  variant,
  timeAgo,
  stepNumber,
}: {
  product: any
  variant: 'viewed' | 'cart'
  timeAgo?: string
  stepNumber?: number
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={`group relative rounded-xl overflow-hidden border transition-all duration-300
        hover:shadow-md hover:-translate-y-1
        ${variant === 'cart'
          ? 'border-emerald-200/60 bg-emerald-50/30'
          : 'border-slate-200/60 bg-white'
        }`}
    >
      {/* Image */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-40">
            {getCategoryIcon(product.category)}
          </div>
        )}

        {/* Step Badge */}
        {stepNumber !== undefined && (
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-md text-[9px] font-bold text-white shadow-sm
              ${variant === 'cart' ? 'bg-emerald-500' : 'bg-slate-600'}`}>
              {stepNumber}º
            </span>
          </div>
        )}

        {/* Time Badge */}
        {timeAgo && (
          <div className="absolute bottom-2 right-2">
            <span className="px-1.5 py-0.5 rounded-md bg-slate-900/80 text-[9px] text-white shadow-sm">
              {timeAgo}
            </span>
          </div>
        )}

        {/* Cart Badge */}
        {variant === 'cart' && (
          <div className="absolute top-2 right-2">
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500 text-[9px] font-bold text-white shadow-sm">
              🛒
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-[11px] font-medium text-slate-800 truncate mb-1">{product.name}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-900">
            R$ {product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] text-amber-500">★</span>
            <span className="text-[10px] text-slate-500">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
