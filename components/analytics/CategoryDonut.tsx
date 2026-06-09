'use client'

import { useMemo } from 'react'
import { useBehaviorStore } from '@/store/behaviorStore'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { PieChart as PieIcon } from 'lucide-react'

const CATEGORY_COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#8B5CF6', // violet-500
  '#F59E0B', // amber-500
  '#EF4444', // rose-500
  '#06B6D4', // cyan-500
  '#F97316', // orange-500
  '#84CC16', // lime-500
]

interface Props {
  className?: string
}

export default function CategoryDonut({ className = '' }: Props) {
  const viewed = useBehaviorStore(s => s.viewed)

  const data = useMemo(() => {
    const cats: Record<string, number> = {}
    viewed.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1 })

    return Object.entries(cats)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }))
  }, [viewed])

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data])

  if (data.length === 0) {
    return (
      <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
        <SectionHeader icon={PieIcon} title="Categorias" subtitle="Distribuição de interesse" />
        <EmptyState />
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
      <SectionHeader icon={PieIcon} title="Categorias" subtitle="Distribuição de interesse" />

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
            isAnimationActive={true}
            animationBegin={200}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </Pie>

          {/* Center text */}
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-900"
            style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}
          >
            {total}
          </text>
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-400"
            style={{ fontSize: 11 }}
          >
            itens
          </text>

          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              fontSize: 12,
              fontFamily: 'var(--font-body)',
            }}
            formatter={(value: number | string | undefined) => {
              const count = typeof value === 'number' ? value : parseInt(value ?? '0', 10)
              return [`${count} visualização${count !== 1 ? 'ões' : ''}`, '']
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span style={{ color: '#475569', fontSize: 12, fontFamily: 'var(--font-body)' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ── Reusable header ── */

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </p>
        <p className="text-[10px] text-slate-400">{subtitle}</p>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
        <PieIcon className="w-6 h-6 text-slate-300" />
      </div>
      <p className="text-xs text-slate-400">Navegue pelo catálogo para ver a distribuição de categorias</p>
    </div>
  )
}
