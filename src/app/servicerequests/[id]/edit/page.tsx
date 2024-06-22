import { createClient } from '@/lib/supabase/client'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  // get this service request by id
  const supabase = await createClient()

  let { data: serviceRequest } = await supabase
    .from('service_requests')
    .select('*, technicians(id, name, email), service_types(id, service_name), tenants(*)', { count: 'exact' })
    .eq(`id`, id)
    .single()

  console.log(JSON.stringify(serviceRequest, null, 2))
  return <EditServiceRequestForm serviceRequest={serviceRequest}></EditServiceRequestForm>
  return <div>{JSON.stringify(serviceRequest, null, 2)}</div>
  // return client
  //   ?.from('service_requests')
  //   .select('id, description, technicians(id, name, email)')
  //   .eq(`id`, id)
  //   .throwOnError()
  //   .single()
}

import { Tables } from '@/utils/database.types'

function EditServiceRequestForm({ serviceRequest }: { serviceRequest: Tables<'service_requests'> }) {
  return (
    <form>
      <div>
        {/* Service Request Description */}
        <div>
          <label htmlFor='description'>Description</label>
          <div>
            <input
              id='description'
              name='description'
              type='string'
              defaultValue={serviceRequest.description ?? ''}
              placeholder='description'
            />
          </div>
        </div>
      </div>
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
