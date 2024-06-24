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
  const serviceTypeSelected = formData.get('service_types')
  const technicianIds: string[] = []
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('technician_')) {
      const id = key.slice('technician_'.length)
      technicianIds.push(id)
    }
  }

  /* empty serviceType is not allowed in database, so don't proceed if it is empty*/
  if (serviceTypeSelected?.toString() !== '') {
    const supabase = await createSupabaseServerClient()
    /* update service type */
    const { data: updateServiceTypeData, error: updateServiceTypeError } = await supabase
      .from('service_requests')
      .update({ description: description, service_type_id: serviceTypeSelected?.toString() })
      .eq('id', id)

    if (updateServiceTypeError) {
      console.log('error on updating service request (description)', updateServiceTypeError)
      throw updateServiceTypeError
    }

    // add technicians for each technician that is selected (e.g. checked) on the form
    const techniciansToServiceRequests = technicianIds.map((technicianId) => ({
      service_request_id: id,
      technician_id: technicianId,
    }))
    const { data: upsertTechniciansData, error: upsertError } = await supabase
      .from('service_request_technicians')
      .upsert(techniciansToServiceRequests)
    if (upsertError) {
      console.log('error on adding technicians to service request', upsertError)
      throw upsertError
    }

    // delete technicians that are not checked
    const technicianIdsToDelete = availableTechnicianIds.filter((t) => !technicianIds.includes(t))

    const { data: deleteTechniciansData, error: deleteError } = await supabase
      .from('service_request_technicians')
      .delete()
      .in('technician_id', technicianIdsToDelete)
      .eq('service_request_id', id)

    if (deleteError) {
      console.log('error on deleting technicians from service request', deleteError)
      throw deleteError
    }
  } // TODO else display an error
  revalidatePath(`/servicerequests/${id}`)
  redirect(`/servicerequests/${id}`)
}
