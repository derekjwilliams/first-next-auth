//
import { createSupabaseServerClient } from '../../../../lib/supabase-api/server'
// import createSupabaseServerClient from '../../../../lib/supabase-api/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient(cookieStore)
    const { data, error } = await supabase.from('saved_images').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
    console.log('here we are', data)
    console.log('here we are', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// import { NextResponse } from 'next/server'
// // import { listFiles } from 'uploadthing/server'
// import { auth } from '../core'
// // import { auth } from '../uploadthing/core' // Reuse the auth function from core.ts

// export async function GET(req: Request) {
//   try {
//     // Authenticate user
//     const user = await auth(req)
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     // Retrieve the list of files for the authenticated user
//     // const files = await listFiles() // TODO get from Supabase database

//     // Filter files by user if needed (assuming metadata.userId was stored)
//     // const userFiles = files.filter((file: { metadata: { userId: any } }) => file.metadata?.userId === user.id)

//     // get the files' url and key, for now don't worry about server side pagination, but we should add that

//     return NextResponse.json([], { status: 200 })
//   } catch (error) {
//     console.error('Error fetching files:', error)
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//   }
// }
