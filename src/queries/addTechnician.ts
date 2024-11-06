//import { TypedSupabaseClient } from '@/lib/supabase/supabase'
import { TypedSupabaseClient } from '@/utils/supabase/client'
import { Tables } from '@/utils/database.types'
type Technician = Tables<'technicians'>

export function addTechnician(client: TypedSupabaseClient, value: Technician) {
  return client
    ?.from('technicians')
    .insert({
      email: value.email,
      name: value.name,
    })
    .select()
}
