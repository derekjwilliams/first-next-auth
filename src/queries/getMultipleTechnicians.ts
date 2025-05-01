import { TypedSupabaseClient } from '@/lib/supabase-api/client'

export function getMultipleTechnicians(client: TypedSupabaseClient) {
  return client?.from('technicians').select('id, email, name')
}
