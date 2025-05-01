import { TypedSupabaseClient } from '@/lib/supabase-api/client'
import { Tables } from '@/utils/database.types'
type Location = Tables<'locations'>

export function addLocation(client: TypedSupabaseClient, value: Location) {
  return client
    ?.from('locations')
    .insert({
      location_name: value.location_name,
      street_address: value.street_address,
      unit_number: value.unit_number,
      city: value.city,
      state_province: value.state_province,
      postal_code: value.postal_code,
      notes: value.notes,
    })
    .select()
}
