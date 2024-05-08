import { TypedSupabaseClient } from '@/lib/supabase/supabase'

export function getMultipleServiceRequests(
  client: TypedSupabaseClient,
  service_type_id: string
) {
  if (service_type_id) {
    return client
      ?.from('service_requests')
      .select('*')
      .eq('service_type_id', service_type_id)
  } else {
    return client?.from('service_requests').select('*')
  }
}
