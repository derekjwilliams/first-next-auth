//import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { TypedSupabaseClient } from '@/utils/supabase/client'
export function getMultipleServiceRequests(client: TypedSupabaseClient, service_type_id: string) {
  if (service_type_id) {
    return client?.from('service_requests').select('*, locations(*)').eq('service_type_id', service_type_id)
  } else {
    // get all
    return client?.from('service_requests').select('*, locations(*)')
  }
}
