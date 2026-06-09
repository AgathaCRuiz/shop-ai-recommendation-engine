'use client'
import { useBehaviorStore } from '@/store/behaviorStore'
import { PROFILES } from '@/lib/profiles'
import ProfileSwitcher from './ProfileSwitcher'

const tabs = [
  { id: 'catalog', label: 'Catálogo', icon: '◈' },
  { id: 'recs', label: 'Recomendações', icon: '✦' },
  { id: 'analytics', label: 'Analytics', icon: '◉' },
  { id: 'predict', label: 'Previsão', icon: '◎' },
]

interface NavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const cart = useBehaviorStore(s => s.cart)
  const viewed = useBehaviorStore(s => s.viewed)
  const activeProfile = useBehaviorStore(s => s.activeProfile)

  // Iniciais para o avatar: perfil ativo ou fallback "AG"
  const profileInitials = activeProfile
    ? PROFILES.find(p => p.id === activeProfile)?.initials ?? 'AG'
    : 'AG'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
              S
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-sky-400 border border-white animate-pulse" />
          </div>
          <span className="font-display font-semibold text-base tracking-tight text-slate-900">
            Shop<span className="text-sky-600">AI</span>
          </span>
        </div>

        {/* Tabs */}
        <nav className="hidden md:flex items-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 font-medium
                ${activeTab === tab.id
                  ? 'bg-slate-100 text-slate-900 border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              style={{ fontFamily: 'var(--font-body)' }}>
              <span className="text-xs">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Status */}
        <div className="flex items-center gap-4">
          {viewed.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              IA ativa · {viewed.length} sinais
            </div>
          )}
          <div className="relative">
            <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-sm cursor-pointer hover:border-slate-300 transition-colors">
              🛒
            </div>
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-[10px] font-bold flex items-center justify-center text-white shadow-sm">
                {cart.length}
              </div>
            )}
          </div>
          <ProfileSwitcher activeInitials={profileInitials} />
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden flex border-t border-slate-200/70 overflow-x-auto bg-white">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-2.5 text-xs whitespace-nowrap transition-colors
              ${activeTab === tab.id ? 'text-slate-900 border-b-2 border-slate-300' : 'text-slate-500'}`}>
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  )
}
