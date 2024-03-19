import { useMemo } from 'react'
import { getSupabaseBrowserClient } from '@/utils/supabase/supabase'

function useSupabase() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabase
