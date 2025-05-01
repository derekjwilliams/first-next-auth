// src/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/utils/database.types'

// Create a singleton instance for the browser
// Note: Using process.env requires specific Next.js config for client-side access
// Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
// and exposed to the browser (prefixed with NEXT_PUBLIC_).
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null
console.log('Browser Client URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Loaded' : 'MISSING')
console.log('Browser Client Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Loaded' : 'MISSING')

export const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

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
