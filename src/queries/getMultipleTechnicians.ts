import { TypedSupabaseClient } from '@/lib/supabase/supabase'

export function getMultipleTechnicians(client: TypedSupabaseClient) {
  return client?.from('technicians').select('id, email, name')
}
