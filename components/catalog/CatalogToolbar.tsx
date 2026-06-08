'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react'

/* ── Constants ── */

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
]

import { getCategoryIcon, IconGrid } from './CategoryIcons'

/* ── Props ── */

interface Props {
  search: string
  onSearchChange: (v: string) => void
  categories: string[]
  category: string
  onCategoryChange: (v: string) => void
  sort: string
  onSortChange: (v: string) => void
  resultsCount: number
}

/* ══════════════════════════════════════════════ */

export default function CatalogToolbar({
  search, onSearchChange,
  categories, category, onCategoryChange,
  sort, onSortChange,
  resultsCount,
}: Props) {
  return (
    <div className="space-y-3 animate-fade-up-2">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nome, categoria ou tag..."
            className="w-full pl-9 pr-9 py-2 rounded-lg bg-white border border-slate-200
              text-sm text-slate-700 placeholder:text-slate-400 outline-none
              focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            style={{ fontFamily: 'var(--font-body)' }}
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort + count */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[11px] text-slate-400 tabular-nums whitespace-nowrap">
            {resultsCount} resultado{resultsCount !== 1 ? 's' : ''}
          </span>
          <SortDropdown value={sort} onChange={onSortChange} />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-1.5 overflow-x-auto pills-scroll pb-0.5">
        {categories.map((cat) => {
          const isActive = category === cat
          const icon = cat === 'Todos' ? <IconGrid /> : getCategoryIcon(cat)
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap
                transition-all duration-200 flex-shrink-0 font-medium
                ${isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50'
                }`}
            >
              <span className={`w-3.5 h-3.5 flex items-center justify-center ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {icon}
              </span>
              <span>{cat}</span>
              {isActive && cat !== 'Todos' && (
                <span className="ml-0.5 text-[10px] opacity-70">
                  <X className="w-2.5 h-2.5" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Sort Dropdown ── */

function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const selected = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600
          bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
      >
        <SlidersHorizontal className="w-3 h-3 text-slate-400" />
        <span>{selected.label}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 z-20 w-40 py-1 rounded-lg bg-white border border-slate-200 shadow-xl">
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={`w-full text-left px-3.5 py-2 text-xs transition-colors
                  ${o.value === value
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
