// app/api/set-token/route.ts
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { key, value } = await request.json()

  await kv.hset(key, value)

  return NextResponse.json({ message: 'Value set successfully!' })
}

// Curl example

/*
curl -X POST http://localhost:3000/api/set-user \          
  -H "Content-Type: application/json" \
  -d '{
    "key": "user:john",
    "value": {
      "id": "222",
      "email": "john@example.com"
    }
  }'
*/
