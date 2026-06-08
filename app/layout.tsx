import type { Metadata } from 'next'
// @ts-ignore: CSS module declarations not available in this environment
import './globals.css'

export const metadata: Metadata = {
  title: 'ShopAI — Recomendações inteligentes',
  description: 'Motor de recomendação de produtos com IA em tempo real',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
