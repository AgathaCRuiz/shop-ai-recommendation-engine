/**
 * Perfis simulados para análise comportamental de e-commerce.
 * Utilizados para gerar métricas, recomendações e dashboards.
 */

export interface ProfileData {
  id: string
  name: string
  initials: string
  emoji: string
  description: string

  /** Tempo de sessão em minutos */
  sessionMinutes: number

  /** Produtos visualizados */
  viewedIds: number[]

  /** Produtos atualmente no carrinho */
  cartIds: number[]

  /** Lista de desejos */
  wishlistIds: number[]

  /** Produtos já comprados */
  purchaseHistoryIds: number[]

  /** Métricas simuladas */
  averageTicket: number
  conversionRate: number
  visitsLast30Days: number
}

export const PROFILES: ProfileData[] = [
  {
    id: 'joao',
    name: 'João Silva',
    initials: 'JS',
    emoji: '🏃',
    description: 'Corredor amador · busca performance',

    sessionMinutes: 52,

    viewedIds: [1, 7, 4, 3, 10, 11, 14, 17],
    cartIds: [7, 14],
    wishlistIds: [17],
    purchaseHistoryIds: [1, 4, 11],

    averageTicket: 389.9,
    conversionRate: 0.22,
    visitsLast30Days: 8,
  },

  {
    id: 'marcia',
    name: 'Márcia Costa',
    initials: 'MC',
    emoji: '💅',
    description: 'Fashionista · compradora frequente',

    sessionMinutes: 78,

    viewedIds: [2, 8, 5, 6, 9, 3, 10, 15, 18],
    cartIds: [2, 8, 18],
    wishlistIds: [5, 10],
    purchaseHistoryIds: [6, 15, 9],

    averageTicket: 742.5,
    conversionRate: 0.41,
    visitsLast30Days: 22,
  },

  {
    id: 'pedro',
    name: 'Pedro Alves',
    initials: 'PA',
    emoji: '💻',
    description: 'Entusiasta tech · pesquisa bastante',

    sessionMinutes: 35,

    viewedIds: [9, 3, 4, 12, 6, 1, 21, 22, 23],
    cartIds: [3, 21],
    wishlistIds: [22, 23],
    purchaseHistoryIds: [9, 4],

    averageTicket: 1899.0,
    conversionRate: 0.14,
    visitsLast30Days: 12,
  },

  {
    id: 'ana',
    name: 'Ana Beatriz',
    initials: 'AB',
    emoji: '🏡',
    description: 'Decoradora · compras para casa',

    sessionMinutes: 95,

    viewedIds: [24, 25, 26, 27, 28, 29, 30],
    cartIds: [24, 28],
    wishlistIds: [26],
    purchaseHistoryIds: [25, 27, 30],

    averageTicket: 1240.0,
    conversionRate: 0.31,
    visitsLast30Days: 16,
  },

  {
    id: 'lucas',
    name: 'Lucas Ferreira',
    initials: 'LF',
    emoji: '🎮',
    description: 'Gamer · busca eletrônicos e acessórios',

    sessionMinutes: 110,

    viewedIds: [31, 32, 33, 34, 35, 36, 37],
    cartIds: [32, 35],
    wishlistIds: [36, 37],
    purchaseHistoryIds: [31],

    averageTicket: 2599.9,
    conversionRate: 0.18,
    visitsLast30Days: 19,
  },

  {
    id: 'camila',
    name: 'Camila Santos',
    initials: 'CS',
    emoji: '📸',
    description: 'Criadora de conteúdo · fotografia e gadgets',

    sessionMinutes: 67,

    viewedIds: [38, 39, 40, 41, 42, 43, 44],
    cartIds: [39, 42],
    wishlistIds: [43],
    purchaseHistoryIds: [38, 40],

    averageTicket: 1780.0,
    conversionRate: 0.27,
    visitsLast30Days: 14,
  },

  {
    id: 'rafael',
    name: 'Rafael Gomes',
    initials: 'RG',
    emoji: '🍳',
    description: 'Apaixonado por culinária',

    sessionMinutes: 48,

    viewedIds: [45, 46, 47, 48, 49, 50],
    cartIds: [46, 49],
    wishlistIds: [48],
    purchaseHistoryIds: [45, 50],

    averageTicket: 529.9,
    conversionRate: 0.29,
    visitsLast30Days: 11,
  },

  {
    id: 'juliana',
    name: 'Juliana Martins',
    initials: 'JM',
    emoji: '🧘',
    description: 'Bem-estar e autocuidado',

    sessionMinutes: 83,

    viewedIds: [51, 52, 53, 54, 55, 56, 57],
    cartIds: [52, 55],
    wishlistIds: [54],
    purchaseHistoryIds: [51, 53],

    averageTicket: 649.0,
    conversionRate: 0.36,
    visitsLast30Days: 20,
  },

  {
    id: 'gabriel',
    name: 'Gabriel Rocha',
    initials: 'GR',
    emoji: '📚',
    description: 'Estudante · compra por custo-benefício',

    sessionMinutes: 29,

    viewedIds: [58, 59, 60, 61, 62, 63],
    cartIds: [60],
    wishlistIds: [62],
    purchaseHistoryIds: [58],

    averageTicket: 289.9,
    conversionRate: 0.12,
    visitsLast30Days: 6,
  },
]