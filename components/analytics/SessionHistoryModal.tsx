'use client'

import { useEffect, useState } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import { getCategoryIcon } from '@/components/catalog/CategoryIcons'
import { PROFILES } from '@/lib/profiles'
import {
  X, Eye, ShoppingCart, Clock, Tag, DollarSign, ChevronRight
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
  const avgRating = viewed.length
    ? (viewed.reduce((s, p) => s + p.rating, 0) / viewed.length).toFixed(1)
    : '—'

  // Categorias únicas exploradas
  const exploredCats = new Set(viewed.map(p => p.category)).size

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center p-4 pt-[8vh] overflow-y-auto
        transition-all duration-200
        ${visible ? 'bg-black/70 backdrop-blur-sm' : 'bg-transparent'}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-3xl rounded-2xl transition-all duration-300
          ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{
          background: '#fff',
          boxShadow: '0 4px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {/* Profile avatar */}
            {profile && (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-sm shadow-blue-200">
                {profile.initials}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="text-sm font-semibold text-slate-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {profile ? `Histórico de ${profile.name}` : 'Histórico da Sessão'}
                </h2>
                {profile && <span className="text-sm">{profile.emoji}</span>}
              </div>
              <p className="text-[11px] text-slate-500">
                {profile?.description ?? 'Produtos visualizados e no carrinho'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Quick stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 py-4 border-b border-slate-100">
          <StatPill icon={Eye} label="Visualizados" value={totalViews} color="blue" />
          <StatPill icon={ShoppingCart} label="No carrinho" value={totalCart} color="emerald" />
          <StatPill icon={DollarSign} label="Total carrinho" value={`R$${totalSpent.toFixed(0)}`} color="amber" />
          <StatPill icon={Tag} label="Categorias" value={exploredCats} color="violet" />
        </div>

        {/* ── Product Grid ── */}
        <div className="p-5">
          {/* Carrinho section */}
          {cart.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center">
                  <ShoppingCart className="w-3 h-3 text-emerald-600" />
                </div>
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  No Carrinho
                </h3>
                <span className="text-[10px] text-slate-400">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {cart.map(p => (
                  <ProductMiniCard key={`cart-${p.id}`} product={p} variant="cart" />
                ))}
              </div>
            </div>
          )}

          {/* Vistos section */}
          {viewed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                  <Eye className="w-3 h-3 text-blue-600" />
                </div>
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Visualizados
                </h3>
                <span className="text-[10px] text-slate-400">{viewed.length} produto{viewed.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {viewed.map((p, i) => {
                  const minsAgo = Math.floor((Date.now() - new Date(p.viewedAt).getTime()) / 60000)
                  return (
                    <ProductMiniCard
                      key={`viewed-${p.id}-${i}`}
                      product={p}
                      variant="viewed"
                      timeAgo={minsAgo === 0 ? 'agora' : minsAgo < 60 ? `${minsAgo}min` : `${Math.floor(minsAgo / 60)}h`}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {cart.length === 0 && viewed.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-xs text-slate-400">Nenhum produto registrado nesta sessão</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Stat Pill ── */

function StatPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  color: 'blue' | 'emerald' | 'amber' | 'violet'
}) {
  const colors = {
    blue:    { bg: 'bg-blue-50', text: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    amber:   { bg: 'bg-amber-50', text: 'text-amber-600' },
    violet:  { bg: 'bg-violet-50', text: 'text-violet-600' },
  }
  const c = colors[color]

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
      <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
        <Icon className={`w-3.5 h-3.5 ${c.text}`} />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
          {value}
        </p>
        <p className="text-[10px] text-slate-400">{label}</p>
      </div>
    </div>
  )
}

/* ── Product Mini Card ── */

function ProductMiniCard({
  product,
  variant,
  timeAgo,
}: {
  product: any
  variant: 'viewed' | 'cart'
  timeAgo?: string
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

        {/* Badge */}
        {variant === 'cart' && (
          <div className="absolute top-2 right-2">
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500 text-[9px] font-bold text-white shadow-sm">
              🛒 Carrinho
            </span>
          </div>
        )}

        {timeAgo && (
          <div className="absolute top-2 left-2">
            <span className="px-1.5 py-0.5 rounded-md bg-slate-900/80 text-[9px] text-white shadow-sm">
              {timeAgo}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-[11px] font-medium text-slate-800 truncate mb-1">{product.name}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
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
