import { useMemo } from 'react'
import { getSupabaseBrowserClient } from '../lib/supabase-api/client'

function useSupabase() {
  return useMemo(() => getSupabaseBrowserClient(), [])
}

export default useSupabase
