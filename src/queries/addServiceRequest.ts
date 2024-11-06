import { ServiceRequestMutationInput } from '@/types'
import { TypedSupabaseClient } from '@/utils/supabase/client'

export function addServiceRequest(client: TypedSupabaseClient, value: ServiceRequestMutationInput) {
  return client
    ?.from('service_requests')
    .insert({
      description: value.description,
      location_id: value.location_id,
      status_id: value.status_id || null,
      service_type_id: value.service_type_id || null,
      details: value.details,
    })
    .select('*, locations(*), technicians(*), statuses(*)')
}
