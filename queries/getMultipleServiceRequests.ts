import { TypedSupabaseClient } from '@/lib/supabase/supabase'

export function getMultipleServiceRequests(client: TypedSupabaseClient) {
  return client?.from('service_requests').select('*')
}
