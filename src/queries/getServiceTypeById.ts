// src/queries/getServiceTypeById.ts

import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { Tables } from '@/utils/database.types'

export interface ServiceTypeWithDetails extends Tables<'service_types'> {
  service_requests: Array<
    Tables<'service_requests'> 
    // & {
    //   serviceTypes: Array<Tables<'service_types'>>
    // }
  >
}

export function getServiceTypeById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('service_types')
    .select('id, service_name, service_requests(*, technicians(*), service_types(*))')
    .eq(`id`, id)
    .throwOnError()
    .single()
}
