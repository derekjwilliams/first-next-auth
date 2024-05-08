import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { Database } from '@/utils/database.types'
type ServiceRequest = Database['public']['Tables']['service_requests']['Row']

export function addServiceRequest(
  client: TypedSupabaseClient,
  value: ServiceRequest
) {
  return client
    ?.from('service_requests')
    .insert({
      description: value.description,
      technician_id: null, //TODO handle values for these
      location_id: null,
      status_id: null,
      service_type_id: value.service_type_id || null,
    })
    .select()
}
