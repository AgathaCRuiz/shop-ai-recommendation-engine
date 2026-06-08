'use client'
import { useState } from 'react'
import AppBackground from '@/components/AppBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CatalogTab from '@/components/CatalogTab'
import RecsTab from '@/components/RecsTab'
import AnalyticsTab from '@/components/AnalyticsTab'
import PredictTab from '@/components/PredictTab'
import CartSidebar from '@/components/CartSidebar'

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const TAB_COMPONENTS: Record<string, React.ReactNode> = {
    catalog: <CatalogTab />,
    recs: <RecsTab />,
    analytics: <AnalyticsTab />,
    predict: <PredictTab />,
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppBackground />

      <Navbar
        activeTab={activeTab ?? ''}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {!activeTab ? (
        <Hero onExplore={() => setActiveTab('catalog')} />
      ) : (
        <main className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-5 py-4">
          <div className="flex flex-col xl:flex-row gap-4 items-start">
            <div className="flex-1 min-w-0 space-y-4">
              {TAB_COMPONENTS[activeTab] ?? <CatalogTab />}
            </div>
            <CartSidebar />
          </div>
        </main>
      )}

      <footer className="text-center py-6 mt-6 text-xs text-slate-400">
        ShopAI · Powered by Claude API · Next.js 14
      </footer>
    </div>
  )
}
