import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function generateJSON(prompt: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',

    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],

    temperature: 0.7,

    response_format: {
      type: 'json_object',
    },
  })

  return completion.choices[0]?.message?.content || ''
}

export function buildUserContext(
  viewedNames: string,
  cartNames: string,
  topCat: string,
  avgPrice: number,
  viewedCount: number,
  cartCount: number
) {
  return `
Comportamento do usuário nesta sessão:
- Produtos visualizados (${viewedCount}): ${viewedNames || 'nenhum'}
- Produtos no carrinho (${cartCount}): ${cartNames || 'nenhum'}
- Categoria de maior interesse: ${topCat || 'não identificada'}
- Ticket médio dos produtos vistos: R$${avgPrice}
`.trim()
}