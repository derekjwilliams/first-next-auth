import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/utils/database.types'
import type { TypedSupabaseClient } from './types'

let client: TypedSupabaseClient | undefined

export function getSupabaseBrowserClient(): TypedSupabaseClient {
  if (!client) {
    client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return client
}
