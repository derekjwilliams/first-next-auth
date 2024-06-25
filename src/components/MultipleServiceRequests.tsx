'use client'

import useMultipleServiceRequestsQuery from '@/hooks/useMultipleServiceRequestsQuery'
import useServiceRequestMutation from '@/hooks/useServiceRequestMutation'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useSupabase from '../hooks/useSupabase'
import { addServiceRequest } from '@/queries/addServiceRequest'
import { Tables } from '@/utils/database.types'
import Link from 'next/link'
import React, { useState } from 'react'

const requests = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
  },
  list: {
    margin: sizes.spacing5,
  },
})

const header = stylex.create({
  base: {
    fontSize: `${fonts.size2}`,
  },
})

const form = stylex.create({
  root: {
    width: '260px',
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
    color: colors.gray10,
    backgroundColor: colors.gray2,
    borderColor: {
      default: colors.gray12,
      ':hover': marigoldColors.flowerYellow,
    },
  },
  textarea: {
    padding: '10px',
    width: '500px',
    height: '200px',
  },
  select: {
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

  requestButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: fonts.size2,
    borderRadius: '0.5rem',
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    padding: 10,
    backgroundColor: {
      default: colors.gray2,
      ':hover': marigoldColors.flowerYellow,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    marginTop: '10px',
  },
})

const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
    alignItems: 'center',
  },
  checkboxRoot: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray6,
    borderStyle: 'solid',
    borderWidth: 2,
    marginRight: sizes.spacing2,
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

function AddServiceRequest({ locations, serviceTypeId, serviceDisplayName }: MultipleServiceRequestsProps) {
  const client = useSupabase()
  const mutationFn = async (value: Tables<'service_requests'>) => {
    return addServiceRequest(client, value)?.then((result) => result.data)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['service-requests'], (prevData: Array<Tables<'service_requests'>>) => [
        ...prevData,
        data![0],
      ])
    },
  })
  const onCreateServiceRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({
      description: e.currentTarget.description.value,
      location_id: selectedLocation,
      status_id: null,
      service_type_id: serviceTypeId,
      completed: null,
      date_created: null,
      date_updated: null,
      id: '',
      requested_by: null,
      steps: [],
    })
  }

  const [selectedLocation, setSelectedLocation] = useState('')

  const handleSelectChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedLocation(event.target.value)
  }
  return (
    <>
      <h1 {...stylex.props(header.base)}>Create Service Request for {serviceDisplayName} Issue </h1>
      <Form.Root {...stylex.props(form.root)} onSubmit={onCreateServiceRequest}>
        <Form.Field {...stylex.props(form.field)} name='description'>
          <div>
            <Form.Label className='FormLabel'>Description</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              Please enter a description
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea {...stylex.props(form.input, form.textarea)} required />
          </Form.Control>
        </Form.Field>
        <div>
          <h3>Location</h3>
          <select
            {...stylex.props(form.select)}
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
}
export default function MultipleServiceRequests({
  locations,
  serviceTypeId,
  serviceDisplayName,
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
          serviceDisplayName={serviceDisplayName}></AddServiceRequest>
      )}
      <form {...stylex.props(requests.list)}>
        {serviceRequests.map((serviceRequest: any) => (
          <div key={serviceRequest.id} {...stylex.props(requestCard.base)}>
            <Checkbox.Root {...stylex.props(requestCard.checkboxRoot)} id={serviceRequest.id}>
              <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
                <CheckIcon {...stylex.props(requestCard.checkIcon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className='service-request-label' htmlFor={serviceRequest.id}>
              <Link href={`/servicerequests/${serviceRequest.id}`}>{serviceRequest.description}</Link>
            </label>
          </div>
        ))}
      </form>
    </div>
  )
}
