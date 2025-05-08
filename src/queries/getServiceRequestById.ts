import { TypedSupabaseClient } from '@/lib/supabase/supabase'

export function getServiceRequestById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('service_requests')
    .select('id, description, details, labor_cost, material_cost, technicians(id, name, email), statuses(*), locations(*)')
    .eq(`id`, id)
    .throwOnError()
    .single()
}
