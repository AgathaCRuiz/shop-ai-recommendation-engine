export interface Product {
  originalPrice?: number
  id: number
  name: string
  category: string
  price: number
  image: string
  emoji: string
  rating: number
  reviews: number
  reviewList?: ReviewData[]
  description: string
  tags: string[]
  badge?: 'hot' | 'new' | 'sale' | null
}

export interface ReviewData {
  author: string
  rating: number
  date: string
  title: string
  body: string
  helpful: number
  verified: boolean
}

export interface ViewedProduct extends Product {
  viewedAt: Date
  timeSpent: number
}