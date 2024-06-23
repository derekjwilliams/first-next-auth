import { updateServiceRequest } from '@/lib/actions'
import { createClient } from '@/lib/supabase/client'
import { Tables } from '@/utils/database.types'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { marigoldColors } from '../../../../app/customStyles/marigoldColors.stylex'
import stylex from '@stylexjs/stylex'
import { QueryData } from '@supabase/supabase-js'
import './styles.css'
const request = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
  },
  technicians: {
    margin: sizes.spacing00,
  },
  technician: {
    margin: sizes.spacing2,
  },
})
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
      <div {...stylex.props(request.base)}>
        {/* Service Request Description */}
        <div>
          <label htmlFor='description'>
            <h3>Description</h3>
          </label>
          <div>
            <textarea
              rows={4}
              id='description'
              name='description'
              defaultValue={serviceRequest.description ?? ''}
              placeholder='description'
              style={{ width: '40rem', fontSize: '1.3rem' }}
            />
          </div>
        </div>
        {/* Technicians Checkboxes */}
        <div {...stylex.props(request.technicians)}>
          <h3>Service Technicians</h3>
          <div>
            {availableTechnicians.map((technician) => (
              <div key={technician.id} {...stylex.props(request.technician)}>
                <label
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1em auto',
                    gap: '0.5em',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    lineHeight: 1.1,
                  }}>
                  <input
                    type='checkbox'
                    className='technican_checkbox'
                    defaultChecked={assignedTechnicianIds.includes(technician.id)}
                    id={`technician_${technician.id}`}
                    key={technician.id}
                    name={`technician_${technician.id}`}
                    // checked={assignedTechnicianIds.includes(technician.id)}
                  />
                  <span style={{ fontWeight: 'normal' }}>{technician.name}</span>
                </label>
                {/* <label htmlFor={`technician_${technician.id}`}>{technician.name}</label> */}
              </div>
            ))}
          </div>
        </div>
        {/* Service Type Select */}
        <div>
          <h3>Service Type</h3>
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
        <button
          type='submit'
          style={{
            marginTop: '10px',
            padding: '10px',
            fontSize: '1.3rem',
            borderRadius: '0.5rem',
            borderWidth: '1.2px',
          }}>
          Save Changes
        </button>
      </div>
    </form>
  )
}
