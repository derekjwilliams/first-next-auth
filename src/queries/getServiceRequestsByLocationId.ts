// src/queries/getServiceRequestsByLocationId.ts
import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { Tables } from '@/utils/database.types'

// export type ServiceRequestWithTechnicians = Tables<'service_requests'> & {
//   service_types: Tables<'service_types'>
//   technicians: Array<Tables<'technicians'>>
// }

export async function getServiceRequestsByLocationId(client: TypedSupabaseClient, locationId: string) {
  return client
    ?.from('service_requests')
    .select('*, service_types(id, service_name), technicians(*)') // Select all service request fields and nested technicians
    .eq('location_id', locationId) // Filter by location_id
    .throwOnError()
}
