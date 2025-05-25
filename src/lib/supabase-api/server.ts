// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers' // Correct import
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies' // Keep explicit type import for clarity
import { Database } from '@/utils/database.types' // Your generated Supabase types
// import { UserAttributes } from '@supabase/supabase-js'
import { UserAttributes } from '@/lib/permissions' // Import your ABAC user type

/**
 * Creates a Supabase client configured for server-side operations
 * (Server Components, API Routes, Server Actions) using the recommended
 * pattern from the official Supabase documentation.
 *
 * @param cookieStore The cookie store instance obtained from next/headers cookies().
 */
export function createSupabaseServerClient(cookieStore: ReadonlyRequestCookies) {
  console.log('Server Client URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Loaded' : 'MISSING')
  console.log('Server Client Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Loaded' : 'MISSING')
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Use getAll() to retrieve all cookies
        getAll() {
          return cookieStore.getAll()
        },
        // Use setAll() to batch set cookies, handling potential errors
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            // Use a loop to set each cookie from the array
            cookiesToSet.forEach(({ name, value, options }) => {
              // The cookieStore instance passed in has the 'set' method
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
            // Logging is still useful for debugging.
            console.warn(
              'Supabase server client: Failed to set cookies (potentially in Server Component read path):',
              error,
            )
          }
        },
      },
    },
  )
}

/**
 * Helper function to get the current authenticated user's data
 * and map it to the UserAttributes structure needed for ABAC checks.
 * Handles fetching associated profile data (roles, department).
 * Uses the official Supabase pattern for server client creation.
 */
export async function getCurrentUserAttributes(): Promise<UserAttributes | null> {
  // return {
  //   id: '4a211c0e-e7bf-42c6-ae64-db1b37fd2c1a', //user.id,
  //   roles: [], //Array.isArray(profile.roles) ? profile.roles : [],
  //   department: null, // profile.department || null,
  // }
  // 1. Get the cookie store in the current server context
  const cookieStore = await cookies()

  // 2. Create the Supabase client using the official pattern
  const supabase = createSupabaseServerClient(cookieStore)

  // 3. Get the authenticated user session
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    // if (authError) {
    //   console.error('Supabase auth error:', authError.message)
    // }
    return null // Not authenticated
  }

  // 4. Fetch the user's profile data (roles, department, etc.)
  const { data: profile, error: profileError } = await supabase
    .from('profiles') // Adjust table/column names
    .select('roles, department')
    .eq('id', user.id)
    .single()

  // 5. Handle profile fetching results and map to UserAttributes
  if (profileError) {
    console.error(`Error fetching profile for user ${user.id}:`, profileError.message)
    return { id: user.id, roles: [], department: null } // Example fallback
  }
  if (!profile) {
    console.warn(`Profile not found for user ${user.id}`)
    return { id: user.id, roles: [], department: null } // Example fallback
  }

  return {
    id: user.id,
    roles: Array.isArray(profile.roles) ? profile.roles : [],
    department: profile.department || null,
  }
}
