// src/hooks/useSupabase.tsx
import { useMemo } from 'react'
import { getSupabaseBrowserClient } from '../lib/supabase/supabase'
import type { Database } from '../utils/database.types'
import type { SupabaseClient } from '@supabase/supabase-js'

type TypedSupabaseClient = SupabaseClient<Database>

function useSupabase(): TypedSupabaseClient {
  return useMemo(() => {
    const client = getSupabaseBrowserClient()

    if (!client) {
      throw new Error('Supabase client failed to initialize')
    }

    return client
  }, [])
}

export default useSupabase
