/* src/app/api/uploadthing/core.ts */

import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const f = createUploadthing()

// Auth function using Supabase SSR
const auth = async (req: Request) => {
  try {
    // Get the cookie store and properly await it
    const cookieStore = await cookies()

    // Create Supabase SSR client with the current recommended approach
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {
            // We don't set cookies in this context
          },
        },
      },
    )

    // Get the current user session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error || !session || !session.user) {
      console.error('Supabase auth error:', error)
      return null
    }

    return session.user
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

// FileRouter for your app
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      console.log('Authenticating user with Supabase SSR...')
      const user = await auth(req)

      if (!user) {
        console.log("core.ts, No authenticated user. Throwing UploadThingError('Unauthorized')")
        throw new UploadThingError('Unauthorized')
      }

      return { userId: user.id, email: user.email }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete, User email:', metadata.email)
      console.log('Upload complete for file, url:', file.ufsUrl)

      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
