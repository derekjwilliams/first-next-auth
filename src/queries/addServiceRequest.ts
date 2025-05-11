// src/queries/addServiceRequest.ts
import { ServiceRequestMutationInput } from '@/types/index'
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

export async function addServiceRequestMutation(client: TypedSupabaseClient, value: ServiceRequestMutationInput) {
  if (!client) {
    throw new Error('Supabase client is not initialized')
  }

  const { data, error } = await client
    .from('service_requests')
    .insert({
      description: value.description,
      location_id: value.location_id,
      status_id: value.status_id || null,
      service_type_id: value.service_type_id || null,
      details: value.details,
    })
    .select('*, locations(*), service_types(*), statuses(*)')
    .single()

  if (error) {
    throw error
  }

  return data
}
