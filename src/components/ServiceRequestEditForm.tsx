// src/components/ServiceRequestEditForm.tsx
'use client'

import { updateServiceRequest } from '../lib/actions'
import { Tables } from '../utils/database.types'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { colors } from '../app/open-props/lib/colors.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import stylex from '@stylexjs/stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
import { borders } from '../app/open-props/lib/borders.stylex'
import RadioSet from './controls/RadioSet'
import { RichTextEditor } from '@/components/lexical/RichTextEditor'
import './lexicalstyles.css'
import React, { useState } from 'react'

const request = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
    color: marigoldColors.foreground,
  },
  h1: {
    fontSize: fonts.size4,
  },
  technicians: {
    margin: sizes.spacing00,
  },
  technician: {
    margin: sizes.spacing2,
  },
  requestButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: fonts.size2,
    borderRadius: borders.radius2,
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    padding: sizes.spacing2,
    backgroundColor: {
      default: marigoldColors.backgroundButton,
      ':hover': marigoldColors.flowerYellow,
    },
    color: {
      default: marigoldColors.foregroundButton,
      ':hover': marigoldColors.foregroundButton,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    marginTop: '10px',
  },
})
const radioGroup = stylex.create({
  label: {
    fontSize: fonts.size3,
    lineHeight: fonts.lineHeight0,
    paddingLeft: sizes.spacing3,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
    marginBottom: sizes.spacing5,
  },
})
const select = stylex.create({
  base: {
    display: 'block',
    fontSize: fonts.size1,
    color: marigoldColors.slate,
    lineHeight: fonts.lineHeight2,
    padding: '0.6em 1.4em 0.5em 0.8em',
    maxWidth: '100%',
    boxSizing: 'border-box',
    margin: '0',
    borderWidth: borders.size1,
    borderStyle: 'solid',
    borderRadius: borders.radius2,
    appearance: 'none',
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
    margin: sizes.spacing2,
  },
  checkboxIndicator: {
    padding: 0,
  },
  icon: {
    color: marigoldColors.slate,
    height: '100%',
    width: '100%',
  },
})
const form = stylex.create({
  textareaWrapper: {
    display: 'flex',
    marginTop: sizes.spacing5,
  },
  textarea: {
    padding: sizes.spacing3,
    width: 'auto',
    flex: '1',
    fontSize: fonts.size3,
    fontFamily: `-apple-system, BlinkMacSystemFont, Arial`,
    backgroundColor: marigoldColors.backgroundTextarea,
    color: marigoldColors.foreground,
  },
  input: {
    padding: sizes.spacing3,
    fontSize: fonts.size2,
    borderWidth: borders.size1,
    borderStyle: 'solid',
    borderColor: marigoldColors.pansy,
    borderRadius: borders.radius2,
    width: '100%',
    marginBottom: sizes.spacing3,
  },
  costInput: {
    width: '200px', // Fixed width for cost inputs
  },
  costContainer: {
    display: 'flex',
    gap: sizes.spacing4,
    marginBottom: sizes.spacing3,
  },
})

export default function ServiceRequestEditForm({
  serviceRequest,
  availableTechnicians,
  availableServiceTypes,
  availableLocations,
  availableStatuses,
}: {
  serviceRequest: Tables<'service_requests'> & {
    technicians: Tables<'technicians'>[]
  }
  availableTechnicians: Tables<'technicians'>[]
  availableServiceTypes: Tables<'service_types'>[]
  availableLocations: Tables<'locations'>[]
  availableStatuses: Tables<'statuses'>[]
}) {
  const [details, setDetails] = useState(serviceRequest.details || '')
  const assignedTechnicianIds = serviceRequest.technicians.map((t: { id: string }) => t.id)
  const availableTechnicianIds = availableTechnicians.map((t) => t.id)
  const options = availableStatuses.map((status) => {
    return { value: status.id, label: status.status_name, id: status.id }
  })

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Enforce cents precision during input
    if (value.includes('.')) {
      const [whole, decimal] = value.split('.')
      if (decimal && decimal.length > 2) {
        e.target.value = `${whole}.${decimal.slice(0, 2)}`
      }
    }
  }
  const handleCostBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Ensure proper formatting on blur
    const num = parseFloat(e.target.value) || 0;
    e.target.value = num.toFixed(2);
  };

  const costFields = [
    {
      label: "Material Cost",
      id: "material_cost",
      name: "material_cost",
      value: serviceRequest.material_cost,
    },
    {
      label: "Labor Cost",
      id: "labor_cost",
      name: "labor_cost",
      value: serviceRequest.labor_cost,
    },
  ]

  const updateServiceRequestWithId = updateServiceRequest.bind(null, serviceRequest.id, availableTechnicianIds, details)
  return (
    <form action={updateServiceRequestWithId}>
      <div {...stylex.props(request.base)}>
        {/* Service Request Description */}
        <div>
          <label htmlFor='description'>
            <h1 {...stylex.props(request.h1)}>Description</h1>
          </label>
          <div {...stylex.props(form.textareaWrapper)}>
            <textarea
              {...stylex.props(form.textarea)}
              rows={4}
              id='description'
              name='description'
              defaultValue={serviceRequest.description ?? ''}
              placeholder='description'
            />
          </div>
        </div>

        <div {...stylex.props(form.costContainer)}>
          {costFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id}>
                <h1 {...stylex.props(request.h1)}>{field.label}</h1>
              </label>
              <input
                {...stylex.props(form.input, form.costInput)}
                type="text"
                inputMode="decimal"
                id={field.id}
                name={field.name}
                pattern="^\d+\.\d{2}$" // Requires exactly 2 decimal places
                defaultValue={
                  field.value !== null ? field.value.toFixed(2) : '0.00'
                }
                placeholder="0.00"
                onChange={handleCostChange}
                onBlur={handleCostBlur}
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor='details'>
            <h1 {...stylex.props(request.h1)}>Details</h1>
          </label>

          <RichTextEditor value={details} onChange={(v) => setDetails(v)} readOnly={false} data={''} />
        </div>
        {/* Technicians Checkboxes, TODO use react-select for improved UX */}
        <div {...stylex.props(request.technicians)}>
          <h1 {...stylex.props(request.h1)}>Service Technicians</h1>
          <div>
            {availableTechnicians.map((technician) => (
              <div key={'technician_' + technician.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox.Root
                  {...stylex.props(checkbox.checkboxRoot)}
                  defaultChecked={assignedTechnicianIds.includes(technician.id)}
                  id={`technician_${technician.id}`}
                  key={technician.id}
                  name={`technician_${technician.id}`}>
                  <Checkbox.Indicator className='CheckboxIndicator'>
                    <Check {...stylex.props(checkbox.icon)} />
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
            ))}
          </div>
        </div>
        {/* Service Type Select */}
        <div>
          <h1 {...stylex.props(request.h1)}>Service Type</h1>
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
        {/* Location Select */}
        <div>
          <h1 {...stylex.props(request.h1)}>Location</h1>
          <select
            {...stylex.props(select.base)}
            id='locations'
            name='locations'
            defaultValue={serviceRequest.location_id ?? ''}>
            <option value='' disabled>
              Select a location
            </option>
            {availableLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {`${location.street_address} ${location.unit_number ? location.unit_number : ''}`}
              </option>
            ))}
          </select>
        </div>

        {/* Status Radio Group */}
        <h1 {...stylex.props(request.h1)}>Status</h1>
        <RadioSet options={options} value={serviceRequest.status_id ?? ''} name='status_options' />
        <button type='submit' {...stylex.props(request.requestButton)}>
          Save Changes
        </button>
      </div>
    </form>
  )
}
