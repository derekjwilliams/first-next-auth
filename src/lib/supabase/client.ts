import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { UnsafeUnwrappedCookies, cookies } from 'next/headers'

// export const createClient = () => {
//   const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
//   return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
//     cookies: {
//       async get(name: string) {
//         return await cookieStore.get(name)?.value
//       },
//       async set(name: string, value: string, options: CookieOptions) {
//         options.sameSite = 'Lax'
//         try {
//           cookieStore.set({ name, value, ...options })
//         } catch (error) {
//           // The `set` method was called from a Server Component.
//           // This can be ignored if you have middleware refreshing
//           // user sessions.
//         }
//       },
//       async remove(name: string, options: CookieOptions) {
//         try {
//           cookieStore.set({ name, value: '', ...options })
//         } catch (error) {
//           // The `delete` method was called from a Server Component.
//           // This can be ignored if you have middleware refreshing
//           // user sessions.
//         }
//       },
//     },
//   })
// }
