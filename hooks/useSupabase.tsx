import { useMemo } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/supabase'

function useSupabase() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabase
