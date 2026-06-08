import { NextRequest, NextResponse } from 'next/server'
import { generateJSON, buildUserContext } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      viewedNames,
      cartNames,
      topCat,
      avgPrice,
      viewedCount,
      cartCount,
    } = body

    const productsResponse = await fetch(new URL('/api/products', req.url))
    const productsData = await productsResponse.json()
    const products = Array.isArray(productsData?.products)
      ? productsData.products
      : []

    const allProducts = products
      .map(
        (p: { name: any; category: any; price: any }) =>
          `${p.name} (${p.category}, R$${p.price})`
      )
      .join('; ')

    const userCtx = buildUserContext(
      viewedNames,
      cartNames,
      topCat,
      avgPrice,
      viewedCount,
      cartCount
    )

    const prompt = `
Você é um motor de recomendação de e-commerce de alta precisão.

Analise o comportamento do usuário e retorne recomendações personalizadas.

Responda APENAS com JSON válido, sem markdown, sem explicações extras.

${userCtx}

Catálogo disponível:
${allProducts}

Retorne exatamente este JSON:

{
  "perfil": "frase de 1 linha sobre o perfil do comprador",
  "recomendacoes": [
    {
      "nome": "nome exato do produto",
      "razao": "por que recomendar em 8 palavras"
    },
    {
      "nome": "nome exato do produto",
      "razao": "por que recomendar em 8 palavras"
    },
    {
      "nome": "nome exato do produto",
      "razao": "por que recomendar em 8 palavras"
    }
  ],
  "upsell": "sugestão de cross-sell ou bundle em 1 frase",
  "urgencia": "gatilho de urgência personalizado em 1 frase curta"
}
`

    const response = await generateJSON(prompt)

    let parsed

    try {
      parsed =
        typeof response === 'string'
          ? JSON.parse(
              response
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim()
            )
          : response
    } catch (parseError) {
      console.error('Erro ao interpretar JSON:', parseError)
      console.error('Resposta recebida:', response)

      return NextResponse.json(
        { error: 'Resposta inválida da IA' },
        { status: 500 }
      )
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Erro geral:', err)

    return NextResponse.json(
      { error: 'Erro ao gerar recomendações' },
      { status: 500 }
    )
  }
}