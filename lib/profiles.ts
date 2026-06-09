/**
 * Perfis de usuário pré-definidos para teste do app.
 *
 * Cada perfil simula um comportamento real de compra:
 * - Produtos visualizados (com tempo gasto)
 * - Produtos no carrinho
 * - Duração da sessão (minutos)
 */

export interface ProfileData {
  id: string
  name: string
  initials: string
  emoji: string
  description: string
  /** Tempo de sessão simulado em minutos */
  sessionMinutes: number
  /** IDs dos produtos visualizados (do último ao primeiro) */
  viewedIds: number[]
  /** IDs dos produtos no carrinho */
  cartIds: number[]
}

export const PROFILES: ProfileData[] = [
  {
    id: 'joao',
    name: 'João Silva',
    initials: 'JS',
    emoji: '🏃',
    description: 'Corredor amador · busca performance',
    sessionMinutes: 52,
    viewedIds: [1, 7, 4, 3, 10, 11],        // tênis, tênis pro, smartwatch, fone, street, meias
    cartIds: [7],                              // tênis performance no carrinho
  },
  {
    id: 'marcia',
    name: 'Márcia Costa',
    initials: 'MC',
    emoji: '💅',
    description: 'Fashionista · compradora frequente',
    sessionMinutes: 78,
    viewedIds: [2, 8, 5, 6, 9, 3, 10],       // mochila, óculos, jaqueta, câmera, tablet, fone, street
    cartIds: [2, 8],                           // mochila + óculos no carrinho
  },
  {
    id: 'pedro',
    name: 'Pedro Alves',
    initials: 'PA',
    emoji: '💻',
    description: 'Entusiasta tech · pesquisa bastante',
    sessionMinutes: 35,
    viewedIds: [9, 3, 4, 12, 6, 1],           // tablet, fone, smartwatch, speaker, câmera, tênis
    cartIds: [3, 9],                           // fone + tablet no carrinho
  },
  {
    id: 'ana',
    name: 'Ana Beatriz',
    initials: 'AB',
    emoji: '🏡',
    description: 'Decoradora · compras para casa',
    sessionMinutes: 95,
    viewedIds: [2, 5, 12, 11, 8, 6],          // mochila, jaqueta, speaker, meias, óculos, câmera
    cartIds: [5, 12],                          // jaqueta + speaker no carrinho
  },
]
