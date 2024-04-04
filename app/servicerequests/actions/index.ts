'use server'
import { createClient } from '@/lib/supabase/client' //yyyy Should this be used instead of createSupabaseServerClient?
import createSupabaseServerClient from '@/lib/supabase/server'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

export async function createServiceRequest(description: string) {
  console.log('description', description)
  const supabase = await createSupabaseServerClient()
  const user = supabase.auth.getUser()
  const result = await supabase
    .from('service_requests')
    .insert({
      description: description,
      technician_id: null,
      location_id: null,
      status_id: null,
      service_type_id: null,
    })
    .single()
  revalidatePath('/servicerequests') // to display the service requests
  console.log('result: ', result)
  return JSON.stringify(result)
}

export async function readServiceRequests() {
  noStore()
  console.log('readServiceRequests')
  const supabase = await createSupabaseServerClient()
  return await supabase.from('service_requests').select('*')
}

// delete by id, e.g. from a delete button
export async function deleteServiceRequestById(id: string) {
  const supabase = await createSupabaseServerClient()
  await supabase.from('service_requests').delete().eq('id', id)
  revalidatePath('/servicerequests') //TOD create page.tsx in app/servicerequest folder
}

// delete by id, e.g. from a delete button
// export async function updateTodoCompletedById(id: string, completed: boolean) {
//   const supabase = await createSupabaseServerClient()
//   await supabase.from('service_requests').update({ completed }).eq('id', id)
//   revalidatePath('/todo')
// }
