'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/lib/products'
import ProductDetail from './modal/ProductDetail'
import AIAnalysis from './modal/AIAnalysis'
import { X } from 'lucide-react'

interface Props {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (product) {
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
  }, [product])

  if (!product) return null

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] overflow-y-auto
        transition-all duration-200
        ${visible ? 'bg-black/70 backdrop-blur-sm' : 'bg-transparent'}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-2xl rounded-2xl transition-all duration-300
          ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{
          background: '#fff',
          boxShadow: '0 4px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <h2
              className="text-sm font-semibold text-slate-800 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Detalhes do Produto
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <ProductDetail product={product} />
          <AIAnalysis product={product} />
        </div>
      </div>
    </div>
  )
}
