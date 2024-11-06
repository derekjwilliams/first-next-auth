//TODO remove this memoization stuff
import { useMemo } from 'react'
// import { getSupabaseBrowserClient } from '@/lib/supabase/supabase'
import { createClient } from '@/utils/supabase/client'

function useSupabase() {
  return useMemo(() => createClient(), [])
}

export default useSupabase
