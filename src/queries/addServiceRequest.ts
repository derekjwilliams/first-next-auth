import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { Tables } from '@/utils/database.types'
type ServiceRequest = Tables<'service_requests'>

export function addServiceRequest(client: TypedSupabaseClient, value: ServiceRequest) {
  return client
    ?.from('service_requests')
    .insert({
      description: value.description,
      details: value.details,
      location_id: value.location_id,
      status_id: value.status_id || null,
      service_type_id: value.service_type_id || null,
    })
    .select('*, locations(*), technicians(*), statuses(*)')
}
