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

    const userCtx = buildUserContext(
      viewedNames,
      cartNames,
      topCat,
      avgPrice,
      viewedCount,
      cartCount
    )

    const prompt = `
Você é um modelo preditivo de intenção de compra para e-commerce.

Baseado em sinais comportamentais, calcule probabilidades e timing de compra.

Responda APENAS com JSON válido, sem markdown.

${userCtx}

Retorne exatamente este JSON:

{
  "probabilidade": 0,
  "timing": "hoje",
  "categoria_mais_provavel": "nome da categoria",
  "ticket_estimado": 0,
  "confianca": "alta",
  "acao_recomendada": "ação de marketing para converter",
  "gatilho_principal": "principal motivador de compra identificado",
  "scores_categoria": {
    "Calçados": 0,
    "Eletrônicos": 0,
    "Roupas": 0,
    "Acessórios": 0
  }
}
`

    const response = await generateJSON(prompt)

    let parsed

    try {
      parsed =
        typeof response === 'string'
          ? JSON.parse(response.replace(/```json|```/g, '').trim())
          : response
    } catch (parseError) {
      console.error('Erro ao fazer parse:', parseError)

      return NextResponse.json(
        { error: 'Resposta inválida da IA' },
        { status: 500 }
      )
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Erro geral:', err)

    return NextResponse.json(
      { error: 'Erro ao prever compra' },
      { status: 500 }
    )
  }
}