'use client'
import { useBehaviorStore } from '@/store/behaviorStore'
import { getCategoryIcon } from '@/components/catalog/CategoryIcons'
import { ShoppingCart, Trash2, Eye, BarChart3 } from 'lucide-react'

export default function CartSidebar() {
  const cart = useBehaviorStore((s) => s.cart)
  const viewed = useBehaviorStore((s) => s.viewed)
  const removeFromCart = useBehaviorStore((s) => s.removeFromCart)
  const clearCart = useBehaviorStore((s) => s.clearCart)
  const cartTotal = useBehaviorStore((s) => s.cartTotal)
  const conversionRate = useBehaviorStore((s) => s.conversionRate)

  return (
    <aside className="w-full xl:w-64 flex-shrink-0 flex flex-col gap-3">
      {/* Cart widget */}
      <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-3.5">
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-[13px] font-semibold text-slate-900 flex items-center gap-1.5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-slate-500" />
            Carrinho
          </h3>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[10px] text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-2.5 h-2.5" />
              Limpar
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-4">
            <ShoppingCart className="w-6 h-6 mx-auto mb-1.5 text-slate-300" />
            <p className="text-[11px] text-slate-400">Carrinho vazio</p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-0.5">
              {cart.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 group hover:border-slate-200 transition-colors"
                >
                  <span className="text-xs text-slate-500 flex-shrink-0">{getCategoryIcon(p.category)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-700 truncate leading-tight">{p.name}</p>
                    <p className="text-[11px] text-slate-900 font-semibold">
                      R$ {p.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-200">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[11px] text-slate-500">Total</span>
                <span
                  className="text-sm font-bold text-slate-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  R$ {cartTotal().toFixed(2)}
                </span>
              </div>
              <button className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors active:scale-[0.98]">
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>

      {/* Session stats widget */}
      <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-3.5">
        <h3
          className="text-[13px] font-semibold text-slate-900 mb-3 flex items-center gap-1.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
          Sessão
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Visualizados', value: viewed.length },
            { label: 'No carrinho', value: cart.length },
            { label: 'Conversão', value: `${conversionRate()}%` },
            { label: 'Ticket', value: cart.length ? `R$${cartTotal().toFixed(0)}` : '—' },
          ].map((m) => (
            <div
              key={m.label}
              className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center"
            >
              <p
                className="text-sm font-bold text-slate-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {m.value}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* History widget */}
      {viewed.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm p-3.5">
          <h3
            className="text-[13px] font-semibold text-slate-900 mb-2.5 flex items-center gap-1.5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            Histórico
          </h3>
          <div className="space-y-1">
            {viewed.slice(0, 5).map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-2 text-[11px] text-slate-500 py-1.5 border-b border-slate-100 last:border-0"
              >
                <span className="text-xs flex-shrink-0">{getCategoryIcon(p.category)}</span>
                <span className="flex-1 truncate text-slate-600">{p.name}</span>
                {i === 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

function XIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
