import { create } from 'zustand'
import { Product, ViewedProduct } from '@/lib/products'

interface BehaviorStore {
  viewed: ViewedProduct[]
  cart: Product[]
  sessionStart: Date

  viewProduct: (product: Product) => void
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  clearHistory: () => void

  // Derived
  cartTotal: () => number
  topCategory: () => string | null
  avgPrice: () => number
  conversionRate: () => number
}

export const useBehaviorStore = create<BehaviorStore>((set, get) => ({
  viewed: [],
  cart: [],
  sessionStart: new Date(),

  viewProduct: (product) => {
    set((state) => {
      const existing = state.viewed.find(v => v.id === product.id)
      if (existing) {
        return {
          viewed: state.viewed.map(v =>
            v.id === product.id ? { ...v, timeSpent: v.timeSpent + 15 } : v
          )
        }
      }
      return {
        viewed: [{ ...product, viewedAt: new Date(), timeSpent: 15 }, ...state.viewed].slice(0, 10)
      }
    })
  },

  addToCart: (product) => {
    set((state) => {
      if (state.cart.find(c => c.id === product.id)) return state
      return { cart: [...state.cart, product] }
    })
    get().viewProduct(product)
  },

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter(c => c.id !== id) })),

  clearCart: () => set({ cart: [] }),
  clearHistory: () => set({ viewed: [], cart: [] }),

  cartTotal: () => Math.round(get().cart.reduce((sum, p) => sum + p.price, 0) * 100) / 100,

  topCategory: () => {
    const cats: Record<string, number> = {}
    get().viewed.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1 })
    const entries = Object.entries(cats).sort((a, b) => b[1] - a[1])
    return entries[0]?.[0] ?? null
  },

  avgPrice: () => {
    const v = get().viewed
    if (v.length === 0) return 0
    return Math.round(v.reduce((sum, p) => sum + p.price, 0) / v.length)
  },

  conversionRate: () => {
    const v = get().viewed.length
    const c = get().cart.length
    return v === 0 ? 0 : Math.round((c / v) * 100)
  },
}))
