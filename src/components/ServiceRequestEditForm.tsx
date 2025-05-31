// src/components/ServiceRequestEditForm.tsx
'use client'

import { updateServiceRequest } from '../lib/actions'
import { Tables } from '../utils/database.types'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { spacingPatterns } from '../app/customStyles/spacingPatterns.stylex'
import stylex from '@stylexjs/stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import RadioSet from './controls/RadioSet'
import { RichTextEditor } from '@/components/lexical/RichTextEditor'
import './lexicalstyles.css'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const form = stylex.create({
  sectionHeading: {
    fontSize: fonts.size1,
    fontWeight: fonts.weight6,
    color: marigoldColors.textAccent,
    marginBottom: spacingPatterns.gapSmall,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionWrapper: {
    marginTop: spacingPatterns.gapXLarge,
  },
  textareaWrapper: {
    marginBottom: spacingPatterns.gapMedium,
    marginRight: spacingPatterns.gapSmall,
  },
  costContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: spacingPatterns.gapTiny,
    marginBottom: spacingPatterns.gapSmall,
    alignItems: 'start',
    width: '400px',
  },
  costInputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingPatterns.gapTiny,
  },
  textarea: {
    width: '100%',
    minHeight: spacingPatterns.gapMedium,
    padding: spacingPatterns.gapSmall,
    borderColor: marigoldColors.textAreaBorder,
    borderRadius: borders.radius1,
    fontFamily: fonts.sans,
    fontSize: fonts.size1,
    backgroundColor: marigoldColors.textAreaBackground,
    ':focus': {
      outline: 'none',
      borderWidth: '1px',
      borderColor: marigoldColors.primary,
    },
    color: marigoldColors.textAreaColor,
  },
  input: {
    width: '100%',
    padding: spacingPatterns.gapSmall,
    borderWidth: borders.size1,
    borderColor: marigoldColors.textInputBorder,
    borderRadius: borders.radius1,
    fontFamily: fonts.sans,
    fontSize: fonts.size1,
    backgroundColor: marigoldColors.textInputBackground,
    ':focus': {
      outline: 'none',
      borderColor: marigoldColors.primary,
      boxShadow: `0 0 0 2px ${marigoldColors.primary}33`,
    },
    color: marigoldColors.textInputColor,
  },
  costInput: {
    maxWidth: spacingPatterns.layoutNumericInputSize,
  },
})

const checkbox = stylex.create({
  checkboxRoot: {
    width: spacingPatterns.layoutCheckboxInputSize,
    height: spacingPatterns.layoutCheckboxInputSize,
    borderWidth: borders.size1,
    borderStyle: 'solid',
    borderColor: marigoldColors.checkboxInputBorder,
    borderRadius: borders.radius1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacingPatterns.gapSmall,
    backgroundColor: marigoldColors.checkboxInputBackground,
    ':checked': {
      backgroundColor: marigoldColors.primary,
      borderColor: marigoldColors.primary,
    },
  },
  icon: {
    color: marigoldColors.checkboxIcon,
    width: spacingPatterns.layoutIconSize,
    height: spacingPatterns.layoutIconSize,
  },
})

const select = stylex.create({
  base: {
    width: '100%',
    padding: spacingPatterns.gapSmall,
    borderWidth: borders.size1,
    borderColor: marigoldColors.selectInputBorder,
    borderRadius: borders.radius1,
    fontFamily: fonts.sans,
    fontSize: fonts.size1,
    backgroundColor: marigoldColors.selectBackground,
    color: marigoldColors.selectInputColor,
    ':focus': {
      outline: 'none',
      borderColor: marigoldColors.primary,
      boxShadow: `0 0 0 2px ${marigoldColors.primary}33`,
    },
  },
  autoWidth: {
    width: '100%', // Takes full width on mobile

    '@media (min-width: 600px)': {
      width: '100%', // Fill the parent container on desktop
    },
  },
})

const request = stylex.create({
  base: {
    padding: spacingPatterns.gapLarge,
    borderRadius: borders.radius2,
    gap: spacingPatterns.gapMedium,
    background: marigoldColors.cardBackground,
  },
  technicians: {
    marginBlock: spacingPatterns.gapMedium,
    paddingBlock: spacingPatterns.gapSmall,
  },
  technicianItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacingPatterns.gapSmall,
  },
  label: {
    fontSize: fonts.size3,
    marginLeft: spacingPatterns.gapSmall,
    color: marigoldColors.label,
  },
  technicianName: {
    fontWeight: 'normal',
    fontSize: fonts.size2,
  },
  selectsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    // Media query for screens wider than 600px
    '@media (min-width: 600px)': {
      flexDirection: 'row',
      justifyContent: 'flex-start', // Changed from space-between
      gap: '2rem', // Explicit gap between selects
      alignItems: 'flex-start',
    },
  },

  // Individual select wrapper divs
  selectWrapper: {
    width: '100%',

    // Media query for screens wider than 600px
    '@media (min-width: 600px)': {
      width: 'auto', // Let content determine width
      maxWidth: '45%', // Prevent taking too much space
    },
  },
  requestButton: {
    backgroundColor: marigoldColors.backgroundButton,
    color: marigoldColors.foregroundButton,
    paddingBlock: spacingPatterns.gapSmall,
    paddingInline: spacingPatterns.gapXLarge,
    borderRadius: borders.radius2,
    border: 'none',
    cursor: 'pointer',
    fontWeight: fonts.weight6,
    fontSize: fonts.size1,
    marginTop: spacingPatterns.gapMedium,
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: marigoldColors.backgroundHoverButton,
      color: marigoldColors.foregroundHoverButton,
    },
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
    const num = parseFloat(e.target.value) || 0
    e.target.value = num.toFixed(2)
  }

  const costFields = [
    {
      label: 'Material Cost',
      id: 'material_cost',
      name: 'material_cost',
      value: serviceRequest.material_cost,
    },
    {
      label: 'Labor Cost',
      id: 'labor_cost',
      name: 'labor_cost',
      value: serviceRequest.labor_cost,
    },
  ]

  // const updateServiceRequestWithId = updateServiceRequest.bind(null, serviceRequest.id, availableTechnicianIds, details)

  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await updateServiceRequest(
        serviceRequest.id,
        availableTechnicians.map((t) => t.id),
        details,
        formData,
      )
    },
    onSuccess: (result) => {
      // Update the caches
      queryClient.invalidateQueries({ queryKey: ['multipleServiceRequests'], refetchType: 'inactive' }) // For the table of all service_requests
      queryClient.setQueryData(['service_requests'], (old: any[] = []) =>
        old.map((sr) => (sr.id === result.serviceRequest.id ? result.serviceRequest : sr)),
      )
      queryClient.setQueryData(['service_request', result.serviceRequest.id], result.serviceRequest)
      // Navigate to the detail page
      router.push(`/servicerequests/${result.serviceRequest.id}`)
    },
  })

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutation.mutate(formData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <form action={updateServiceRequestWithId}> */}
        <div {...stylex.props(request.base)}>
          {/* Service Request Description */}
          <div>
            <label htmlFor='description'>
              <h1 {...stylex.props(form.sectionHeading)}>Description</h1>
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
              <div
                key={field.id}
                {...stylex.props(form.costInputGroup)}>
                <label htmlFor={field.id}>
                  <h1 {...stylex.props(form.sectionHeading)}>{field.label}</h1>
                </label>
                <input
                  {...stylex.props(form.input, form.costInput)}
                  type='text'
                  inputMode='decimal'
                  id={field.id}
                  name={field.name}
                  pattern='^\d+\.\d{2}$'
                  defaultValue={field.value !== null ? field.value.toFixed(2) : '0.00'}
                  placeholder='0.00'
                  onChange={handleCostChange}
                  onBlur={handleCostBlur}
                />
              </div>
            ))}
          </div>
          <div {...stylex.props(form.sectionWrapper)}>
            <label htmlFor='details'>
              <h1 {...stylex.props(form.sectionHeading)}>Details</h1>
            </label>

            <RichTextEditor
              value={details}
              onChange={(v) => setDetails(v)}
              readOnly={false}
              data={''}
            />
          </div>
          {/* Technicians Checkboxes, TODO use react-select for improved UX */}
          <div {...stylex.props(request.technicians)}>
            <h1 {...stylex.props(form.sectionHeading)}>Service Technicians</h1>
            <div>
              {availableTechnicians.map((technician) => (
                <div
                  key={'technician_' + technician.id}
                  {...stylex.props(request.technicianItem)}>
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
                    {...stylex.props(request.label)}
                    htmlFor={technician.id}>
                    <span {...stylex.props(request.technicianName)}>{technician.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Selects Container with responsive styling */}
          <div {...stylex.props(request.selectsContainer)}>
            {/* Service Type Select */}
            <div {...stylex.props(request.selectWrapper)}>
              <h1 {...stylex.props(form.sectionHeading)}>Service Type</h1>
              <select
                {...stylex.props(select.base, select.autoWidth)}
                id='service_types'
                name='service_types'
                defaultValue={serviceRequest.service_type_id ?? ''}>
                <option
                  value=''
                  disabled>
                  Select a service type
                </option>
                {availableServiceTypes.map((serviceType) => (
                  <option
                    key={serviceType.id}
                    value={serviceType.id}>
                    {serviceType.service_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Location Select */}
            <div {...stylex.props(request.selectWrapper)}>
              <h1 {...stylex.props(form.sectionHeading)}>Location</h1>
              <select
                {...stylex.props(select.base, select.autoWidth)}
                id='locations'
                name='locations'
                defaultValue={serviceRequest.location_id ?? ''}>
                <option
                  value=''
                  disabled>
                  Select a location
                </option>
                {availableLocations.map((location) => (
                  <option
                    key={location.id}
                    value={location.id}>
                    {`${location.street_address} ${location.unit_number ? location.unit_number : ''}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Status Radio Group */}
          <div {...stylex.props(form.sectionWrapper)}>
            <h1 {...stylex.props(form.sectionHeading)}>Status</h1>
            <RadioSet
              options={options}
              value={serviceRequest.status_id ?? ''}
              name='status_options'
            />
            <button
              type='submit'
              {...stylex.props(request.requestButton)}>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
function setIsClient(arg0: boolean) {
  throw new Error('Function not implemented.')
}
