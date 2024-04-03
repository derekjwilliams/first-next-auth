import { TypedSupabaseClient } from '@/utils/supabase/supabase'

export function getServiceRequestById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('service_requests')
    .select('id, description')
    .eq(`id`, id)
    .throwOnError()
    .single()
}
