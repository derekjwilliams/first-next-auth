//import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { TypedSupabaseClient } from '@/utils/supabase/client'

export function getServiceRequestById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('service_requests')
    .select('id, description, details, technicians(id, name, email), statuses(*), locations(*)')
    .eq(`id`, id)
    .throwOnError()
    .single()
}
