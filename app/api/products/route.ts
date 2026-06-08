import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://dummyjson.com/products?limit=0'
    )

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}