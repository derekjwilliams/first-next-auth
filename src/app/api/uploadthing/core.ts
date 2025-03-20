/* src/app/api/uploadthing/core.ts */
/* see https://docs.uploadthing.com/getting-started/appdir */

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
      data: { user },
      error,
    } = await supabase.auth.getUser() //supabase.auth.getSession()

    if (error || !user) {
      console.error('Supabase auth error:', error)
      return null
    }

    return { user, cookieStore }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      console.log('Authenticating user with Supabase SSR...')
      const authData = await auth(req)

      if (!authData || !authData.user) {
        console.log("core.ts, No authenticated user. Throwing UploadThingError('Unauthorized')")
        throw new UploadThingError('Unauthorized')
      }

      return {
        userId: authData.user.id,
        email: authData.user.email,
        cookies: Object.fromEntries(authData.cookieStore.getAll().map((cookie) => [cookie.name, cookie.value])), // Ensure it's always an object, this is a hack
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const cookieStore = new Map(Object.entries(metadata.cookies ?? {}))
      try {
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              getAll: () => Array.from(cookieStore.entries()).map(([name, value]) => ({ name, value })), // hack due to uploadthing issues

              setAll() {
                // We don't set cookies in this context
              },
            },
          },
        )

        const { error } = await supabase.from('saved_images').insert({
          file_url: file.ufsUrl,
          // user_id: metadata.userId,
          file_key: file.key, // optional
          // Add other columns as needed
        })

        if (error) {
          console.error('Error inserting image URL into Supabase:', error)
        } else {
          console.log('Image URL inserted into Supabase successfully.')
        }

        return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl }
      } catch (error) {
        console.error('Error in onUploadComplete:', error)
        return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl }
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
export { auth }
