//import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { TypedSupabaseClient } from '@/utils/supabase/client'

export function getLocationById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('locations')
    .select(
      'id, location_name, street_address, unit_number, city, state_province, postal_code, service_requests(*, technicians(*)), bedrooms(id), bathrooms(id)',
    )
    .eq(`id`, id)
    .throwOnError()
    .single()
}
