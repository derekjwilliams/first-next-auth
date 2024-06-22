'use server'
import { redirect } from 'next/navigation'
import createSupabaseServerClient from '../supabase/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'

export default async function readUserSession() {
  noStore()
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}

export async function updateServiceRequest(id: string, availableTechnicianIds: string[], formData: FormData) {
  const description = formData.get('description') as string
  const v = formData.get('service_types')
  const technicianIds: string[] = []
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('technician_')) {
      const id = key.slice('technician_'.length)
      technicianIds.push(id)
    }
  }
  if (v?.toString() !== '') {
    const upsertData = technicianIds.map((technicianId) => ({
      service_request_id: id,
      technician_id: technicianId,
    }))

    const supabase = await createSupabaseServerClient()

    const { error } = await supabase // TODO handle error
      .from('service_requests')
      .update({ description: description, service_type_id: v?.toString() })
      .eq('id', id)

    if (error) {
      throw error
    }

    const { data, error: e } = await supabase.from('service_request_technicians').upsert(upsertData)
    if (e) {
      console.log('error on upsert')
      console.log(e)
      throw e
    }

    // delete technicians that are not checked
    const technicianIdsToDelete = availableTechnicianIds.filter((t) => !technicianIds.includes(t))

    const { data: d, error: deleteError } = await supabase
      .from('service_request_technicians')
      .delete()
      .in('technician_id', technicianIdsToDelete)
      .eq('service_request_id', id)

    if (deleteError) {
      console.log('error on delete')
      console.log(deleteError)
      throw e
    }
  } // TODO else display an error
  revalidatePath('/servicerequests')
  redirect('/servicerequests')
}
