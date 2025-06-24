// action/index.ts
'use server'

import { redirect } from 'next/navigation'
import createSupabaseServerClient from '../supabase/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import dayjs from 'dayjs'
import cronstrue from 'cronstrue'

/**
 * Reads the current user session from Supabase.
 * Disables caching for this operation.
 */
export default async function readUserSession() {
  noStore() // Opt out of caching for this function
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}

/**
 * Updates a service request with the provided details and form data.
 *
 * @param id - The ID of the service request to update.
 * @param availableTechnicianIds - An array of technician IDs currently available or associated.
 * @param details - Additional details for the service request (passed directly, not from FormData).
 * @param formData - The FormData object from the submitted form.
 */
export async function updateServiceRequest(
  id: string,
  availableTechnicianIds: string[],
  details: string, // This 'details' is passed as an argument
  formData: FormData,
) {
  // Extract and prepare data from FormData
  const description = (formData.get('description') as string) || '' // Default to empty string if null
  const serviceTypeSelectedValue = formData.get('service_types')
  const locationSelectedValue = formData.get('locations')
  const selectedStatusValue = formData.get('status_options')

  // Handle cost fields
  const materialCostString = formData.get('material_cost') as string
  const laborCostString = formData.get('labor_cost') as string
  const parsedMaterialCost = materialCostString ? parseFloat(materialCostString) : null
  const parsedLaborCost = laborCostString ? parseFloat(laborCostString) : null

  const dueDateString = formData.get('due_date') as string | null
  const recurringDateCron = (formData.get('recurring_date_cron') as string) || null // Store as null if empty string

  // Convert due_date to ISO 8601 string or null
  // input type="date" gives YYYY-MM-DD. Convert to ISO string for DB.
  let formattedDueDate: string | null = null
  if (dueDateString) {
    try {
      // Use dayjs to parse and format consistently
      const date = dayjs(dueDateString)
      if (date.isValid()) {
        formattedDueDate = date.toISOString() // Store as ISO 8601 string
      } else {
        console.warn(`Invalid due_date string received: ${dueDateString}`)
        // Optionally throw an error or handle invalid date string
      }
    } catch (e) {
      console.error(`Error processing due_date '${dueDateString}':`, e)
    }
  }

  if (recurringDateCron && recurringDateCron.trim() !== '') {
    try {
      cronstrue.toString(recurringDateCron) // This will throw if the cron is invalid
    } catch (error: any) {
      console.error(
        `Server-side: Invalid cron expression received for service request ${id}: '${recurringDateCron}' -`,
        error.message,
      )
      // Throw a specific error that the client can catch and display
      throw new Error(`Invalid recurring schedule format: ${error.message}`)
    }
  }
  // Extract selected technician IDs from FormData
  const selectedTechnicianIds: string[] = []
  for (const key of formData.keys()) {
    if (key.startsWith('technician_')) {
      const technicianId = key.slice('technician_'.length)
      selectedTechnicianIds.push(technicianId)
    }
  }

  const serviceTypeId = serviceTypeSelectedValue?.toString()
  const locationId = locationSelectedValue?.toString()
  const statusId = selectedStatusValue?.toString()

  // Core business logic: Service Type is mandatory for an update to proceed.
  if (serviceTypeId && serviceTypeId !== '') {
    const supabase = await createSupabaseServerClient()

    // 1. Update the main service_requests table entry
    const serviceRequestUpdatePayload: { [key: string]: any } = {
      description: description,
      details: details, // Using the 'details' argument
      service_type_id: serviceTypeId,
      material_cost: parsedMaterialCost,
      labor_cost: parsedLaborCost,
      due_date: formattedDueDate,
      recurring_date_cron: recurringDateCron,
    }

    if (locationId) {
      serviceRequestUpdatePayload.location_id = locationId
    }
    if (statusId) {
      serviceRequestUpdatePayload.status_id = statusId
    }

    const { data: updatedServiceRequest, error: serviceRequestUpdateError } = await supabase
      .from('service_requests')
      .update(serviceRequestUpdatePayload)
      .eq('id', id)
      .select('*')
      .single()

    if (serviceRequestUpdateError) {
      console.error(`Error updating service request (ID: ${id}):`, serviceRequestUpdateError)
      throw serviceRequestUpdateError // Propagate error for client-side handling
    }

    // 2. Manage technician assignments (Upsert selected, Delete unselected)
    let updatedTechnicians: any[] = []

    if (selectedTechnicianIds.length > 0) {
      const techniciansToUpsert = selectedTechnicianIds.map((technicianId) => ({
        service_request_id: id,
        technician_id: technicianId,
      }))
      const { data: upsertedTechnicians, error: upsertError } = await supabase
        .from('service_request_technicians')
        .upsert(techniciansToUpsert, {
          onConflict: 'service_request_id, technician_id', // Assumes a unique constraint
          ignoreDuplicates: false, // Default, but explicit
        })
        .select('*') // Get the upserted rows

      if (upsertError) {
        console.error(`Error upserting technicians for service request (ID: ${id}):`, upsertError)
        throw upsertError
      }
      updatedTechnicians = upsertedTechnicians || []
    }

    // Delete technicians who were previously available/assigned but are no longer selected
    const technicianIdsToDelete = availableTechnicianIds.filter((availId) => !selectedTechnicianIds.includes(availId))

    if (technicianIdsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('service_request_technicians')
        .delete()
        .in('technician_id', technicianIdsToDelete)
        .eq('service_request_id', id)

      if (deleteError) {
        console.error(`Error deleting technicians from service request (ID: ${id}):`, deleteError)
        throw deleteError
      }
    }

    // 3. Optionally revalidate server-rendered pages
    revalidatePath(`/servicerequests/${id}`) // Revalidate the specific service request page
    revalidatePath('/servicerequests') // Revalidate the list page (if you have one)

    // 4. Return the updated data for React Query cache update
    return {
      serviceRequest: updatedServiceRequest,
      technicians: updatedTechnicians,
      deletedTechnicianIds: technicianIdsToDelete,
    }
    //    redirect(`/servicerequests/${id}`)
  } else {
    // If service_type_id is empty, the update cannot proceed as per the original logic.
    // Throw an error that can be caught by a try/catch block on the client-side
    // in your form submission handler to display a user-friendly message.
    console.warn(`Service request update skipped for ID ${id} due to empty service type.`)
    throw new Error('Service Type is required and cannot be empty. Please select a service type.')
  }
}
