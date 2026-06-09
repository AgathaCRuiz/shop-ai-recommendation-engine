'use client'

import { useMemo } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import { Funnel } from 'lucide-react'

interface Props {
  className?: string
}

export default function ConversionFunnel({ className = '' }: Props) {
  const viewed = useBehaviorStore(s => s.viewed)
  const cart = useBehaviorStore(s => s.cart)

  const data = useMemo(() => {
    const views = viewed.length
    const adds = cart.length
    // Estimar "checkouts" como carrinho com alta intenção (cart items above avg price)
    const avgPrice = viewed.length ? viewed.reduce((s, p) => s + p.price, 0) / viewed.length : 0
    const highIntent = cart.filter(p => p.price >= avgPrice).length

    return [
      { stage: 'Visualizações', value: views, fill: '#3B82F6', pct: 100 },
      { stage: 'Adições ao carrinho', value: adds, fill: '#8B5CF6', pct: views ? Math.round((adds / views) * 100) : 0 },
      { stage: 'Alta intenção', value: highIntent, fill: '#10B981', pct: views ? Math.round((highIntent / views) * 100) : 0 },
    ]
  }, [viewed, cart])

  if (viewed.length === 0) {
    return (
      <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
            <Funnel className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Funil de Conversão</p>
            <p className="text-[10px] text-slate-400">Visualizações → Carrinho → Conversão</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Funnel className="w-8 h-8 text-slate-200 mb-2" />
          <p className="text-xs text-slate-400">Sem dados para exibir o funil</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
          <Funnel className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Funil de Conversão</p>
          <p className="text-[10px] text-slate-400">Visualizações → Carrinho → Alta intenção</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 20, bottom: 0 }}
          barCategoryGap={12}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'var(--font-body)' }}
          />
          <YAxis
            type="category"
            dataKey="stage"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#475569', fontFamily: 'var(--font-body)' }}
            width={150}
          />
          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            barSize={36}
            isAnimationActive={true}
            animationBegin={400}
            animationDuration={1400}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend + percentages */}
      <div className="flex items-center gap-4 mt-2 justify-center text-[10px] text-slate-500">
        {data.map(d => (
          <div key={d.stage} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: d.fill }} />
            <span className="font-medium text-slate-700">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
