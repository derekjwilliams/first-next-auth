import { TypedSupabaseClient } from '@/lib/supabase/supabase'

export function getTechnicianById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('technicians')
    .select('id, name, email, service_requests(*, technicians(*), locations(*))')
    .eq(`id`, id)
    .throwOnError()
    .single()
}
