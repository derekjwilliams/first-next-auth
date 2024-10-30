'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { UnsafeUnwrappedCookies, cookies } from 'next/headers'
import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/utils/database.types'
//export type TypedSupabaseClient = SupabaseClient<Database> | undefined //TODO is this needed with the latest supabase SSR?
// let supabaseServerClient: TypedSupabaseClient

export default async function createSupabaseServerClient() {
  // if (supabaseServerClient) {
  //   return supabaseServerClient
  // }

  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })

  // const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies

  // supabaseServerClient = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       async get(name: string) {
  //         return await cookieStore.get(name)?.value
  //       },
  //       // From Route Handler Tab https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=route-handler
  //       async set(name: string, value: string, options: CookieOptions) {
  //         try {
  //           cookieStore.set({ name, value, ...options })
  //         } catch {
  //           // The `set` method was called from a Server Component.
  //           // This can be ignored if you have middleware refreshing
  //           // user sessions.
  //         }
  //       },
  //       // From Route Handler Tab https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=route-handler
  //       async remove(name: string, options: CookieOptions) {
  //         try {
  //           cookieStore.set({ name, value: '', ...options })
  //         } catch {
  //           // The `delete` method was called from a Server Component.
  //           // NOTE the empty string  for value
  //           // This can be ignored if you have middleware refreshing
  //           // user sessions.
  //         }
  //       },
  //     },
  //   },
  // )
  //return supabaseServerClient
}
