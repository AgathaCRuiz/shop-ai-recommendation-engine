'use client'

import { useState, useRef, useEffect } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import { PROFILES, ProfileData } from '@/lib/profiles'
import { User, Check, Loader2 } from 'lucide-react'

interface Props {
  /** Current initials shown on avatar — reativo ao perfil ativo */
  activeInitials: string
}

export default function ProfileSwitcher({ activeInitials }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const loadProfile = useBehaviorStore(s => s.loadProfile)
  const activeProfile = useBehaviorStore(s => s.activeProfile)

  // Fechar ao clicar fora
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  async function handleSelect(profile: ProfileData) {
    if (loading) return
    setLoading(profile.id)

    try {
      // 1. Buscar produtos reais da API
      const res = await fetch('/api/products')
      const data = await res.json()
      const products = data?.products ?? []

      // 2. Construir mapa id → product
      const map = new Map<number, any>()
      products.forEach((p: any) => map.set(p.id, p))

      // 3. Construir ViewedProduct[] a partir dos IDs
      const CATEGORY_EMOJI: Record<string, string> = {
        beauty: '💄', fragrances: '🌸', furniture: '🪑', groceries: '🛒',
        'home-decoration': '🖼️', 'kitchen-accessories': '🍳', laptops: '💻',
        'mens-shirts': '👔', 'mens-shoes': '👞', 'mens-watches': '⌚',
        'mobile-accessories': '📱', motorcycle: '🏍️', 'skin-care': '🧴',
        smartphones: '📱', 'sports-accessories': '⚽', sunglasses: '🕶️',
        tablets: '📋', tops: '👕', vehicle: '🚗', 'womens-bags': '👜',
        'womens-dresses': '👗', 'womens-jewellery': '💍', 'womens-shoes': '👠',
        'womens-watches': '⌚',
      }

      const now = Date.now()
      const viewed = profile.viewedIds
        .map((id, i) => {
          const p = map.get(id)
          if (!p) return null
          const price = Math.round(p.price * 100) / 100
          const discPct = p.discountPercentage ?? 0
          const originalPrice = Math.round((price / (1 - discPct / 100)) * 100) / 100

          return {
            id: p.id,
            name: p.title,
            category: p.category,
            price,
            originalPrice,
            image: p.thumbnail,
            emoji: CATEGORY_EMOJI[p.category] ?? '📦',
            rating: p.rating ?? 4.5,
            reviews: p.reviews?.length ?? 0,
            reviewList: undefined,
            description: p.description,
            tags: p.tags ?? [],
            badge: (discPct > 15 ? 'sale' : null) as 'sale' | null,
            viewedAt: new Date(now - (profile.viewedIds.length - i) * 180_000), // ~3min entre cada
            timeSpent: 15 + Math.floor(Math.random() * 30),
          }
        })
        .filter(Boolean) as any[]

      // 4. Construir cart a partir dos IDs
      const cart = profile.cartIds
        .map(id => {
          const p = map.get(id)
          if (!p) return null
          const price = Math.round(p.price * 100) / 100
          const discPct = p.discountPercentage ?? 0
          const originalPrice = Math.round((price / (1 - discPct / 100)) * 100) / 100

          return {
            id: p.id,
            name: p.title,
            category: p.category,
            price,
            originalPrice,
            image: p.thumbnail,
            emoji: CATEGORY_EMOJI[p.category] ?? '📦',
            rating: p.rating ?? 4.5,
            reviews: p.reviews?.length ?? 0,
            description: p.description,
            tags: p.tags ?? [],
            badge: (discPct > 15 ? 'sale' : null) as 'sale' | null,
          }
        })
        .filter(Boolean) as any[]

      // 5. Carregar no store
      const sessionDate = new Date(now - profile.sessionMinutes * 60_000)
      loadProfile(viewed, cart, profile.id, sessionDate)
      setOpen(false)
    } catch (e) {
      console.error('Erro ao carregar perfil:', e)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white
          transition-all duration-200 hover:scale-105 active:scale-95
          ${activeProfile
            ? 'bg-blue-500 shadow-sm shadow-blue-200 ring-2 ring-blue-100'
            : 'bg-slate-900'
          }`}
        title={activeProfile ? `Perfil: ${PROFILES.find(p => p.id === activeProfile)?.name}` : 'Selecionar perfil de teste'}
      >
        {activeInitials}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full mt-2 z-50 w-72 animate-scale-in origin-top-right">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  <p className="text-xs font-semibold text-slate-700" style={{ fontFamily: 'var(--font-display)' }}>
                    Perfis de Teste
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 pl-6">
                  Carregue dados simulados para testar o app
                </p>
              </div>

              {/* Profile list */}
              <div className="p-2 space-y-1 max-h-[340px] overflow-y-auto">
                {PROFILES.map(profile => {
                  const isActive = activeProfile === profile.id
                  const isLoading = loading === profile.id

                  return (
                    <button
                      key={profile.id}
                      onClick={() => handleSelect(profile)}
                      disabled={!!loading}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                        transition-all duration-200
                        ${isActive
                          ? 'bg-blue-50 border border-blue-100'
                          : 'hover:bg-slate-50 border border-transparent'
                        }`}
                    >
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0
                        ${isActive ? 'bg-blue-500' : 'bg-slate-700'}`}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          profile.initials
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-800">{profile.name}</span>
                          <span className="text-sm">{profile.emoji}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{profile.description}</p>
                        <p className="text-[10px] text-slate-400 mt-px">
                          {profile.viewedIds.length} vistos · {profile.cartIds.length} no carrinho · {profile.sessionMinutes}min sessão
                        </p>
                      </div>

                      {/* Active check */}
                      {isActive && (
                        <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 text-center">
                <button
                  onClick={() => {
                    useBehaviorStore.getState().clearHistory()
                    setOpen(false)
                  }}
                  className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  limpar dados da sessão
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
