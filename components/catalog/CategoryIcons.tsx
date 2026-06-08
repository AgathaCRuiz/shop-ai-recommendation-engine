import type { ReactNode } from 'react'
import {
  Sparkles,
  Armchair,
  ShoppingBasket,
  PaintBucket,
  UtensilsCrossed,
  LayoutGrid,
  Laptop,
  Shirt,
  Gem,
  Backpack,
  Glasses,
  Camera,
  Headphones,
  Tablet,
  ShoppingBag,
  Flower2,
  Package,
} from 'lucide-react'

const defaultProps = { size: 16, strokeWidth: 1.6 }

/** Mapa fixo de categoria → ícone (chave = lowercase, sem acentos) */
const ICON_MAP: Record<string, ReactNode> = {
  // ── DummyJSON (inglês) ──
  beauty:              <Sparkles {...defaultProps} />,
  fragrances:          <Flower2 {...defaultProps} />,
  furniture:           <Armchair {...defaultProps} />,
  groceries:           <ShoppingBasket {...defaultProps} />,
  'home-decoration':   <PaintBucket {...defaultProps} />,
  'kitchen-accessories': <UtensilsCrossed {...defaultProps} />,

  // ── Português (UI) ──
  todos:               <LayoutGrid {...defaultProps} />,
  calçados:            <ShoppingBag {...defaultProps} />,
  eletrônicos:         <Laptop {...defaultProps} />,
  roupas:              <Shirt {...defaultProps} />,
  acessórios:          <Gem {...defaultProps} />,
  mochilas:            <Backpack {...defaultProps} />,
  óculos:              <Glasses {...defaultProps} />,
  câmeras:             <Camera {...defaultProps} />,
  som:                 <Headphones {...defaultProps} />,
  tablets:             <Tablet {...defaultProps} />,
}

/** Tenta encontrar o ícone certo para qualquer categoria */
export function getCategoryIcon(category: string, className?: string): ReactNode {
  const props = { ...defaultProps, className }
  const value = category?.toLowerCase().trim() ?? ''

  // 1. Match exato
  if (ICON_MAP[value]) return ICON_MAP[value]

  // 2. Heurísticas por palavra-chave
  if (match(value, 'furniture', 'móvel', 'sofa', 'cadeira', 'mesa', 'armario'))
    return <Armchair {...props} />

  if (match(value, 'decoration', 'decoração', 'decor', 'home'))
    return <PaintBucket {...props} />

  if (match(value, 'kitchen', 'cozinha', 'utensil'))
    return <UtensilsCrossed {...props} />

  if (match(value, 'beauty', 'beleza', 'cosmetic', 'makeup', 'maquiagem', 'skincare'))
    return <Sparkles {...props} />

  if (match(value, 'fragrance', 'perfume'))
    return <Flower2 {...props} />

  if (match(value, 'grocery', 'mercado', 'food', 'comida', 'alimento'))
    return <ShoppingBasket {...props} />

  if (match(value, 'shoe', 'sapato', 'calçado', 'tenis', 'tênis'))
    return <ShoppingBag {...props} />

  if (match(value, 'phone', 'smartphone', 'celular'))
    return <Laptop {...props} />

  if (match(value, 'laptop', 'notebook', 'computer', 'computador'))
    return <Laptop {...props} />

  if (match(value, 'watch', 'relógio', 'relogio'))
    return <Gem {...props} />

  if (match(value, 'glass', 'óculos', 'oculos', 'sunglass'))
    return <Glasses {...props} />

  if (match(value, 'camera', 'câmera', 'foto'))
    return <Camera {...props} />

  if (match(value, 'sound', 'audio', 'som', 'fone', 'headphone', 'music', 'música'))
    return <Headphones {...props} />

  if (match(value, 'tablet', 'ipad'))
    return <Tablet {...props} />

  if (match(value, 'shirt', 'camisa', 'camiseta', 'dress', 'vestido', 'roupa', 'top'))
    return <Shirt {...props} />

  if (match(value, 'bag', 'mochila', 'bolsa', 'backpack'))
    return <Backpack {...props} />

  // 3. Fallback genérico
  return <Package {...props} />
}

/** Helper: verifica se `value` contém alguma das palavras */
function match(value: string, ...words: string[]): boolean {
  return words.some(w => value.includes(w))
}

/* ── Re-exportações (úteis para consumidores diretos) ── */

export { Sparkles, Flower2, Armchair, ShoppingBasket, PaintBucket, UtensilsCrossed }
export const IconGrid = () => (
  <LayoutGrid size={16} strokeWidth={1.6} />
)
