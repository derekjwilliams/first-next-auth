'use client'

import useMultipleServiceRequestsQuery from '@/hooks/useMultipleServiceRequestsQuery'
import * as Form from '@radix-ui/react-form'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { fonts as globalFonts } from '../app/globalTokens.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
import useSupabase from '../hooks/useSupabase'
import { useInsertServiceRequestWithTechnicians } from '@/hooks/useInsertServiceRequestWithTechnicians'
import { addServiceRequest } from '@/queries/addServiceRequest'
import { Tables } from '@/utils/database.types'
import Link from 'next/link'
import React, { useState } from 'react'
import RadioSet from './controls/RadioSet'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { borders } from '@stylexjs/open-props/lib/borders.stylex'

const requests = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
  },
  list: {
    marginTop: sizes.spacing5,
    backgroundColor: marigoldColors.backgroundDetails,
    padding: sizes.spacing3,
  },
})
const form = stylex.create({
  root: {
    width: '100%',
    marginBottom: sizes.spacing7,
  },
  field: {
    display: 'grid',
    marginBottom: sizes.spacing5,
  },
  input: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.spacing00,
    fontSize: fonts.size2,
    color: marigoldColors.foreground,
    backgroundColor: marigoldColors.backgroundData,
    borderColor: {
      default: marigoldColors.foreground,
      ':hover': marigoldColors.flowerYellow,
    },
  },

  textareaWrapper: {
    display: 'flex',
    marginTop: sizes.spacing5,
  },
  textarea: {
    padding: sizes.spacing3,
    width: 'auto',
    flex: '1',
    backgroundColor: marigoldColors.backgroundTextarea,
    fontFamily: `${globalFonts.appFont}, -apple-system, BlinkMacSystemFont, Arial`,
  },
  h1: {
    color: marigoldColors.foreground,
    fontSize: fonts.size7,
    fontWeight: fonts.weight7,
  },
  h2: {
    color: marigoldColors.foreground,
    fontSize: fonts.size4,
    fontWeight: fonts.weight7,
  },
  statusWrapper: {
    marginTop: sizes.spacing5,
  },
  techniciansWrapper: {
    marginTop: sizes.spacing5,
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
    marginTop: sizes.spacing7,
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

const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: {
      default: marigoldColors.foregroundLink,
      ':hover': marigoldColors.foregroundHoverLink,
    },
  },
  requestLink: {
    fontSize: fonts.size3,
  },
  locationLink: {
    fontSize: fonts.size3,
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
  checkIcon: {
    color: marigoldColors.slate,
    height: '100%',
    width: '100%',
  },
})

function AddServiceRequest({
  locations,
  serviceTypeId,
  serviceDisplayName,
  statuses,
  technicians,
}: MultipleServiceRequestsProps) {
  const mutation = useInsertServiceRequestWithTechnicians()
  const onCreateServiceRequest = (e: React.FormEvent<HTMLFormElement>) => {
    const technicianIds: string[] = []
    const formData = new FormData(e.currentTarget)
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('technician_')) {
        const id = key.slice('technician_'.length)
        technicianIds.push(id)
      }
    }

    mutation.mutate({
      description: e.currentTarget.description.value,
      locationId: selectedLocation,
      technicianIds: technicianIds, // //TODO, all are being added, need to get from the RadioSet
      completed: null,
      requestedBy: null,
      details: e.currentTarget.details.value,
      serviceTypeId: serviceTypeId,
      statusId: e.currentTarget.statuses.value, // TODO, check this
    })
  }

  const [selectedLocation, setSelectedLocation] = useState('')

  const handleSelectChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedLocation(event.target.value)
  }
  const options = statuses.map((status) => {
    return { value: status.id, label: status.status_name, id: status.id }
  })
  return (
    <>
      <h1 {...stylex.props(form.h1)}>Create Service Request for {serviceDisplayName} Issue </h1>
      <Form.Root {...stylex.props(form.root)} onSubmit={onCreateServiceRequest}>
        <Form.Field {...stylex.props(form.field)} name='description'>
          <div>
            <Form.Label {...stylex.props(form.h2)}>Description</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              Please enter a description
            </Form.Message>
          </div>
          <Form.Control asChild {...stylex.props(form.textareaWrapper)}>
            <textarea {...stylex.props(form.input, form.textarea)} autoCapitalize='sentences' rows={4} required />
          </Form.Control>
        </Form.Field>
        <Form.Field {...stylex.props(form.field)} name='details'>
          <div>
            <Form.Label {...stylex.props(form.h2)}>Details</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              details
            </Form.Message>
          </div>
          <Form.Control asChild {...stylex.props(form.textareaWrapper)}>
            <textarea {...stylex.props(form.input, form.textarea)} autoCapitalize='sentences' rows={6} />
          </Form.Control>
        </Form.Field>
        <Form.Field {...stylex.props(form.field)} name='statuses'>
          <Form.Label {...stylex.props(form.h2)}>Status</Form.Label>
          <Form.Message className='FormMessage' match='valueMissing'>
            status
          </Form.Message>
          <div {...stylex.props(form.statusWrapper)}>
            <RadioSet options={options} value={''} name='statuses' />
          </div>
        </Form.Field>
        <div>
          <h2 {...stylex.props(form.h2)}>Technicians</h2>
          <div {...stylex.props(form.statusWrapper)}>
            {technicians.map((technician) => (
              <div key={technician.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox.Root
                  {...stylex.props(checkbox.checkboxRoot)}
                  defaultChecked={false}
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
            ))}
          </div>
        </div>
        <div>
          <h2 {...stylex.props(form.h2)}>Location</h2>
          <select
            {...stylex.props(select.base)}
            value={selectedLocation}
            id='locations'
            name='locations'
            onChange={handleSelectChange}>
            <option value='' disabled>
              Select a location
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {`${location.street_address} ${location.unit_number ? location.unit_number : ''}`}
              </option>
            ))}
          </select>
        </div>
        <Form.Submit asChild>
          <button {...stylex.props(form.requestButton)}>Submit Service Request</button>
        </Form.Submit>
        {/* Location Select, TODO use radix */}
      </Form.Root>
    </>
  )
}

type Location = {
  id: string
  street_address: string
  unit_number: string
}
interface MultipleServiceRequestsProps {
  locations: Location[]
  serviceTypeId: string
  serviceDisplayName: string
  statuses: Tables<'statuses'>[]
  technicians: Tables<'technicians'>[]
}
export default function MultipleServiceRequests({
  locations,
  serviceTypeId,
  serviceDisplayName,
  statuses,
  technicians,
}: MultipleServiceRequestsProps) {
  const {
    data: serviceRequests,
    isLoading,
    isError,
  } = useMultipleServiceRequestsQuery({ serviceTypeId: serviceTypeId })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !serviceRequests) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }
  return (
    <div {...stylex.props(requests.base)}>
      {serviceDisplayName !== 'All' && (
        <AddServiceRequest
          locations={locations}
          serviceTypeId={serviceTypeId}
          serviceDisplayName={serviceDisplayName}
          statuses={statuses}
          technicians={technicians}></AddServiceRequest>
      )}
      <div {...stylex.props(requests.list)}>
        <h2 {...stylex.props(form.h2)}>Existing {serviceDisplayName} Service Requests</h2>
        {serviceRequests.map((serviceRequest: any) => (
          <div key={serviceRequest.id} {...stylex.props(requestCard.base)}>
            <label htmlFor={serviceRequest.id}>
              <div>
                <Link
                  {...stylex.props(requestCard.link, requestCard.requestLink)}
                  href={`/servicerequests/${serviceRequest.id}`}>
                  {`${serviceRequest.description}`}
                </Link>
              </div>
              <div>
                {serviceRequest.locations && (
                  <Link
                    {...stylex.props(requestCard.link, requestCard.locationLink)}
                    href={`/properties/${serviceRequest.locations.id}`}>
                    {`${serviceRequest.locations.street_address} ${serviceRequest.locations.unit_number ?? ''}`}
                  </Link>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
