import { TypedSupabaseClient } from '@/lib/supabase/types'

export function getMultipleTechnicians(client: TypedSupabaseClient) {
  return client?.from('technicians').select('id, email, name')
}
