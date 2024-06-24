import { updateServiceRequest } from '@/lib/actions'
import { Tables } from '@/utils/database.types'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import stylex from '@stylexjs/stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'

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
const checkbox = stylex.create({
  checkboxRoot: {
    backgroundColor: { default: 'white', ':hover': marigoldColors.flowerYellow },
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray6,
    borderStyle: 'solid',
    borderWidth: 2,
    margin: sizes.spacing3,
  },

  checkboxIndicator: {
    padding: 0,
  },
  checkIcon: {
    color: '#1d2496',
    height: '100%',
    width: '100%',
  },
})

export default function ServiceRequestEditForm({
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
              <>
                <div key={technician.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox.Root
                    {...stylex.props(checkbox.checkboxRoot)}
                    defaultChecked={assignedTechnicianIds.includes(technician.id)}
                    id={`technician_${technician.id}`}
                    key={technician.id}
                    name={`technician_${technician.id}`}>
                    <Checkbox.Indicator className='CheckboxIndicator'>
                      <CheckIcon {...stylex.props(checkbox.checkIcon)} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    style={{
                      fontSize: fonts.size3,
                    }}
                    // className='Label'
                    htmlFor={technician.id}>
                    <span style={{ fontWeight: 'normal' }}>{technician.name}</span>
                  </label>
                </div>
              </>
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
