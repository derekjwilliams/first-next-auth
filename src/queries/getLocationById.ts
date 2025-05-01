// src/queries/getLocationById.ts
import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { Tables } from '@/utils/database.types'

import { PostgrestSingleResponse } from '@supabase/supabase-js'
export interface LocationWithDetails extends Tables<'locations'> {
  service_requests: Array<
    Tables<'service_requests'> & {
      technicians: Array<Tables<'technicians'>>
    }
  >
  bedrooms: Array<Pick<Tables<'bedrooms'>, 'id'>>
  bathrooms: Array<Pick<Tables<'bathrooms'>, 'id'>>
}
export async function getLocationById(
  client: TypedSupabaseClient,
  id: string,
): Promise<PostgrestSingleResponse<LocationWithDetails>> {
  return client!
    .from('locations')
    .select(
      'id, location_name, street_address, unit_number, city, state_province, postal_code, bedrooms(*), bathrooms(*), service_requests(*, technicians(*), locations(*))',
    )
    .eq('id', id)
    .throwOnError()
    .single()
}
