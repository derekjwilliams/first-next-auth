import { TypedSupabaseClient } from '@/lib/supabase/types'

export function getServiceRequestById(client: TypedSupabaseClient, id: string) {
  return client
    ?.from('service_requests')
    .select(
      'id, description, details, labor_cost, material_cost, date_created, date_updated, due_date, recurring_date_cron, technicians(id, name, email), statuses(*), locations(*), service_types(*)',
    )
    .eq(`id`, id)
    .throwOnError()
    .single()
}
