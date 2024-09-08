// app/api/get-user/route.ts
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  if (!key) {
    return NextResponse.json({ message: 'Key is required', value: null }, { status: 400 })
  }

  const value = await kv.hgetall(key)

  if (!value) {
    return NextResponse.json({ message: 'No value found for the provided key', value: key })
  }
  return NextResponse.json(value)
}
