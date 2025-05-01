'use server'
import { createSupabaseServerClient } from '../../../lib/supabase-api/server'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'

export async function createServiceRequest(description: string) {
  const cookieStore = await cookies()
  const supabase = await createSupabaseServerClient(cookieStore)
  const user = supabase.auth.getUser()
  const result = await supabase
    .from('service_requests')
    .insert({ description: description, location_id: null, status_id: null, service_type_id: null })
    .single()
  revalidatePath('/servicerequests') // to display the service requests
  return JSON.stringify(result)
}

export async function readServiceRequests() {
  noStore()
  const cookieStore = await cookies()
  const supabase = await createSupabaseServerClient(cookieStore)
  return await supabase.from('service_requests').select('*')
}

// delete by id, e.g. from a delete button
export async function deleteServiceRequestById(id: string) {
  const cookieStore = await cookies()
  const supabase = await createSupabaseServerClient(cookieStore)
  await supabase.from('service_requests').delete().eq('id', id)
  revalidatePath('/servicerequests') //TOD create page.tsx in app/servicerequest folder
}

// delete by id, e.g. from a delete button
// export async function updateTodoCompletedById(id: string, completed: boolean) {
//   const supabase = await createSupabaseServerClient()
//   await supabase.from('service_requests').update({ completed }).eq('id', id)
//   revalidatePath('/todo')
// }
