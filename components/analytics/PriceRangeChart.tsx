'use client'

import { useMemo } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import { BarChart3 } from 'lucide-react'

const RANGES = [
  { label: 'R$0–100', min: 0, max: 100 },
  { label: 'R$100–200', min: 100, max: 200 },
  { label: 'R$200–500', min: 200, max: 500 },
  { label: 'R$500–1K', min: 500, max: 1000 },
  { label: 'R$1K+', min: 1000, max: Infinity },
]

interface Props {
  className?: string
}

export default function PriceRangeChart({ className = '' }: Props) {
  const viewed = useBehaviorStore(s => s.viewed)

  const data = useMemo(() => {
    const counts = RANGES.map(r => ({
      name: r.label,
      Produtos: viewed.filter(p => p.price >= r.min && p.price < r.max).length,
    }))
    return counts
  }, [viewed])

  const maxValue = useMemo(() => Math.max(...data.map(d => d.Produtos), 1), [data])

  if (viewed.length === 0) {
    return (
      <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Faixa de Preço</p>
            <p className="text-[10px] text-slate-400">Produtos visualizados por faixa</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <BarChart3 className="w-8 h-8 text-slate-200 mb-2" />
          <p className="text-xs text-slate-400">Visualize produtos para preencher o gráfico</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
          <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Faixa de Preço</p>
          <p className="text-[10px] text-slate-400">Produtos visualizados por faixa</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'var(--font-body)' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'var(--font-body)' }}
            allowDecimals={false}
            domain={[0, maxValue + 1]}
          />
          <Tooltip
            cursor={{ fill: '#f1f5f9', radius: 4 }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              fontSize: 12,
              fontFamily: 'var(--font-body)',
            }}
            formatter={(value: any) => [`${value} produto${value !== 1 ? 's' : ''}`, 'Visualizados']}
          />
          <Bar
            dataKey="Produtos"
            radius={[6, 6, 0, 0]}
            barSize={48}
            isAnimationActive={true}
            animationBegin={600}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => {
              const max = data.reduce((m, d) => d.Produtos > m ? d.Produtos : m, 0)
              const isTop = entry.Produtos === max && max > 0
              return <Cell key={index} fill={isTop ? '#3B82F6' : '#93C5FD'} />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
