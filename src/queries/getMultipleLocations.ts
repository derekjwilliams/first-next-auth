import { TypedSupabaseClient } from '@/lib/supabase/types'
import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/utils/database.types'
// type TypedSupabaseClient = SupabaseClient<Database>

export function getMultipleLocations(client: TypedSupabaseClient) {
  return client
    ?.from('locations')
    .select('id, street_address, unit_number, city, state_province, postal_code, bedrooms(*), bathrooms(*)')
}
