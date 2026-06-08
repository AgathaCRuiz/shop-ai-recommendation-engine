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
Você é um especialista em análise de comportamento de consumidor digital e CRO.

Analise padrões de navegação e gere insights acionáveis para aumentar conversão.

Responda APENAS com JSON válido, sem markdown.

${userCtx}

Retorne exatamente este JSON com 3 insights práticos:

{
  "segmento": "nome do segmento de consumidor",
  "insights": [
    {
      "tipo": "comportamento",
      "titulo": "título curto",
      "descricao": "insight em 2 frases"
    },
    {
      "tipo": "oportunidade",
      "titulo": "título curto",
      "descricao": "insight em 2 frases"
    },
    {
      "tipo": "risco",
      "titulo": "título curto",
      "descricao": "insight em 2 frases"
    }
  ],
  "acao_prioritaria": "a ação mais importante para converter este usuário agora"
}
`

    const text = await generateJSON(prompt)

    let parsed

    try {
      parsed =
        typeof text === 'string'
          ? JSON.parse(text.replace(/```json|```/g, '').trim())
          : text
    } catch {
      return NextResponse.json(
        { error: 'Resposta da IA inválida' },
        { status: 500 }
      )
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Erro na análise:', err)

    return NextResponse.json(
      { error: 'Erro ao analisar comportamento' },
      { status: 500 }
    )
  }
}