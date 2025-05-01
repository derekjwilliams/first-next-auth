// src/utils/supabase/client.ts
import { CookieOptions, createBrowserClient, createServerClient } from '@supabase/ssr'
import { Database } from '@/utils/database.types'
import { SupabaseClient } from '@supabase/supabase-js'
import { cookies, UnsafeUnwrappedCookies } from 'next/headers'
export type TypedSupabaseClient = SupabaseClient<Database> | undefined
// Create a singleton instance for the browser
// Note: Using process.env requires specific Next.js config for client-side access
// Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
// and exposed to the browser (prefixed with NEXT_PUBLIC_).
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export const createClient = () => {
  const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      async get(name: string) {
        return (await cookieStore).get(name)?.value
      },
      async set(name: string, value: string, options: CookieOptions) {
        options.sameSite = 'lax'
        try {
          ;(await cookieStore).set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      async remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient
  }

  browserClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return browserClient
}
