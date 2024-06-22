import { updateServiceRequest } from '@/lib/actions'
import { createClient } from '@/lib/supabase/client'
import { Tables } from '@/utils/database.types'
import { QueryData } from '@supabase/supabase-js'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  // get this service request by id
  const supabase = await createClient()
  // let { data: serviceRequest }
  const serviceRequestWithChildrenQuery = supabase
    .from('service_requests')
    .select('*, technicians(id, name, email), service_types(id, service_name), tenants(*)', { count: 'exact' })
    .eq(`id`, id)
    .single()

  type ServiceRequestWithChildren = QueryData<typeof serviceRequestWithChildrenQuery>
  const { data: serviceRequest, error }: { data: ServiceRequestWithChildren; error: any } =
    await serviceRequestWithChildrenQuery

  let { data: technicians } = await supabase.from('technicians').select('*')

  let { data: serviceTypes } = await supabase.from('service_types').select('*')

  return (
    <EditServiceRequestForm
      serviceRequest={serviceRequest}
      availableTechnicians={technicians ?? []}
      availableServiceTypes={serviceTypes ?? []}></EditServiceRequestForm>
  )
}

function EditServiceRequestForm({
  serviceRequest,
  availableTechnicians,
  availableServiceTypes,
}: {
  serviceRequest: Tables<'service_requests'>
  availableTechnicians: Tables<'technicians'>[]
  availableServiceTypes: Tables<'service_types'>[]
}) {
  const assignedTechnicianIds = serviceRequest.technicians.map((t: { id: string }) => t.id)
  const availableTechnicianIds = availableTechnicians.map((t) => t.id)
  const updateServiceRequestWithId = updateServiceRequest.bind(null, serviceRequest.id, availableTechnicianIds)
  return (
    <form action={updateServiceRequestWithId}>
      <div>
        {/* Service Request Description */}
        <div>
          <label htmlFor='description'>Description</label>
          <div>
            <textarea
              id='description'
              name='description'
              defaultValue={serviceRequest.description ?? ''}
              placeholder='description'
              style={{ width: '40rem' }}
            />
          </div>
        </div>
        {/* Technicians Checkboxes */}
        <div>
          {availableTechnicians.map((technician) => (
            <div key={technician.id}>
              <input
                type='checkbox'
                defaultChecked={assignedTechnicianIds.includes(technician.id)}
                id={`technician_${technician.id}`}
                name={`technician_${technician.id}`}
                // checked={assignedTechnicianIds.includes(technician.id)}
              />
              <label htmlFor={`technician_${technician.id}`}>{technician.name}</label>
            </div>
          ))}
          {/* Service Type Select */}
        </div>
        <div>
          <select id='service_types' name='service_types' defaultValue={serviceRequest.service_type_id ?? ''}>
            <option value='' disabled>
              Select a service type
            </option>
            {availableServiceTypes.map((serviceType) => (
              <option key={serviceType.id} value={serviceType.id}>
                {serviceType.service_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type='submit'>Save Changes</button>
    </form>
  )
}

// Example response
/*
{
  "description": "Mold on bathroom ceiling at 2105 8th Ave #A",
  "date_created": "2024-06-10T18:42:36.213372",
  "date_updated": "2024-06-10T18:42:36.213372",
  "requested_by": "6ef6b9fc-097c-4431-9f50-5eb902b41d69",
  "location_id": "9ee9beb8-96ee-46b9-90bf-347fbce9ef7d",
  "service_type_id": "28bc6a2c-3b18-4fba-a954-766c0d7047c5",
  "status_id": null,
  "completed": false,
  "id": "ba9c1ee3-644f-4d83-b2b8-c592edd35ae4",
  "steps": null,
  "technicians": [
    {
      "id": "bfb34c56-719c-4360-9fef-07208a71577c",
      "name": "Derek Williams",
      "email": "derek61+22@gmail.com"
    },
    {
      "id": "c13cf26e-d61a-4947-bf92-73c2e1a7aca7",
      "name": "Mark Tiahrt",
      "email": "mark.tiahrt@outlook.com"
    }
  ],
  "service_types": {
    "id": "28bc6a2c-3b18-4fba-a954-766c0d7047c5",
    "service_name": "Safety"
  },
  "tenants": {
    "id": "6ef6b9fc-097c-4431-9f50-5eb902b41d69",
    "name": "Derek Williams",
    "email": "derek61+22@gmail.com"
  }
}*/
