import { NextRequest, NextResponse } from 'next/server'
import { generateJSON } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { productName, productCategory, productPrice, reviews } = await req.json()

    const reviewsText = reviews.map((r: any, i: number) =>
      `Review ${i + 1} (${r.rating}★, ${r.verified ? 'Verificado' : 'Não verificado'}): "${r.title}" — ${r.body}`
    ).join('\n\n')

    const text = await generateJSON(`
Você é um especialista em análise de sentimento e UX para e-commerce.
Analise as avaliações de um produto e gere um resumo inteligente para ajudar o comprador a decidir.
Responda APENAS com JSON válido, sem markdown.

Produto: ${productName}
Categoria: ${productCategory}
Preço: R$${productPrice}

Avaliações dos clientes:
${reviewsText}

Retorne exatamente este JSON:
{
  "sentimento_geral": "positivo" ou "misto" ou "negativo",
  "score_confianca": número de 0 a 100,
  "resumo": "resumo honesto de 2 frases sobre o produto baseado nas reviews",
  "pontos_fortes": ["ponto 1", "ponto 2", "ponto 3"],
  "pontos_fracos": ["ponto 1", "ponto 2"],
  "perfil_ideal": "para quem este produto é ideal em 1 frase",
  "veredicto": "compra recomendada" ou "compra com ressalvas" ou "avalie alternativas",
  "frase_destaque": "a frase mais impactante de uma das reviews (cite o autor)"
}`)

    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro ao analisar reviews' }, { status: 500 })
  }
}