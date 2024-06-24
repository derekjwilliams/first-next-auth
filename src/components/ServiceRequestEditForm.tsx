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
const select = stylex.create({
  base: {
    display: 'block',
    fontSize: '16px',
    color: '#444',
    lineHeight: '1.3',
    padding: '0.6em 1.4em 0.5em 0.8em',
    maxWidth: '100%',
    boxSizing: 'border-box',
    margin: '0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#aaa',
    borderRadius: '0.5em',
    appearance: 'none',
    backgroundColor: '#fff',
    backgroundImage:
      'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat, repeat',
    backgroundPosition: 'right 0.7em top 50%, 0 0',
    backgroundSize: '0.65em auto, 100%',
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
          <select
            {...stylex.props(select.base)}
            id='service_types'
            name='service_types'
            defaultValue={serviceRequest.service_type_id ?? ''}>
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
