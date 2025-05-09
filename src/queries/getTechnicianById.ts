import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { Tables } from '@/utils/database.types'

export interface TechnicianWithDetails extends Tables<'technicians'> {
  service_requests: Array<
    Tables<'service_requests'> & {
      locations: Array<Tables<'technicians'>>
    }
  >
  // bedrooms: Array<Pick<Tables<'bedrooms'>, 'id'>>
  // bathrooms: Array<Pick<Tables<'bathrooms'>, 'id'>>
}

export function getTechnicianById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('technicians')
    .select('id, name, email, service_requests(*, technicians(*), locations(*))')
    .eq(`id`, id)
    .throwOnError()
    .single()
}
