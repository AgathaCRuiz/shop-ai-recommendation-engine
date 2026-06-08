import { Product } from '@/lib/products'

const CATEGORY_EMOJI: Record<string, string> = {
  beauty: '💄',
  fragrances: '🌸',
  furniture: '🪑',
  groceries: '🛒',
  'home-decoration': '🖼️',
  'kitchen-accessories': '🍳',
  laptops: '💻',
  'mens-shirts': '👔',
  'mens-shoes': '👞',
  'mens-watches': '⌚',
  'mobile-accessories': '📱',
  motorcycle: '🏍️',
  'skin-care': '🧴',
  smartphones: '📱',
  'sports-accessories': '⚽',
  sunglasses: '🕶️',
  tablets: '📋',
  tops: '👕',
  vehicle: '🚗',
  'womens-bags': '👜',
  'womens-dresses': '👗',
  'womens-jewellery': '💍',
  'womens-shoes': '👠',
  'womens-watches': '⌚',
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products')

    const data = await response.json()

    if (!data.products) return []

    return data.products.map((item: any) => ({
      id: item.id,
      name: item.title,
      category: item.category,
      price: Math.round(item.price * 100) / 100,
      originalPrice: Math.round((item.price / (1 - (item.discountPercentage ?? 0) / 100)) * 100) / 100,
      image: item.thumbnail,
      emoji: CATEGORY_EMOJI[item.category] ?? '📦',
      rating: item.rating ?? 4.5,
      reviews: item.reviews?.length ?? Math.round(item.stock * 0.3) ?? 0,
      reviewList: mapReviews(item.reviews),
      description: item.description,
      tags: item.tags ?? [],
      badge: ((item.discountPercentage ?? 0) > 15 ? 'sale' : null),
    }))
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

function mapReviews(reviews: any[] | undefined): Product['reviewList'] {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return undefined

  return reviews.map((r, i) => {
    return {
      author: r.reviewerName ?? 'Anônimo',
      rating: r.rating ?? 0,
      date: formatDate(r.date),
      title: r.comment?.length > 60 ? r.comment.slice(0, 57) + '...' : (r.comment ?? ''),
      body: r.comment ?? '',
      helpful: (i * 13 + 7) % 100 + 5, // pseudo-variedade baseada na posição
      verified: Math.random() > 0.25,  // ~75% verificado
    }
  })
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Data indisponível'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return dateStr
  }
}


