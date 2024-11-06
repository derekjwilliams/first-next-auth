//import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { TypedSupabaseClient } from '@/utils/supabase/client'
export function getMultipleTechnicians(client: TypedSupabaseClient) {
  return client?.from('technicians').select('id, email, name')
}
