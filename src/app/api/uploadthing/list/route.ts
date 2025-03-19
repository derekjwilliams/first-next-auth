import { NextResponse } from 'next/server'
// import { listFiles } from 'uploadthing/server'
import { auth } from '../core'
// import { auth } from '../uploadthing/core' // Reuse the auth function from core.ts

export async function GET(req: Request) {
  try {
    // Authenticate user
    const user = await auth(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Retrieve the list of files for the authenticated user
    // const files = await listFiles() // TODO get from Supabase database

    // Filter files by user if needed (assuming metadata.userId was stored)
    // const userFiles = files.filter((file: { metadata: { userId: any } }) => file.metadata?.userId === user.id)

    return NextResponse.json([], { status: 200 })
  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
