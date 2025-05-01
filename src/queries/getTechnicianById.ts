import { TypedSupabaseClient } from '@/lib/supabase-api/client'

export function getTechnicianById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('technicians')
    .select('id, name, email, service_requests(id, description, locations(street_address, unit_number))')
    .eq(`id`, id)
    .throwOnError()
    .single()
}
