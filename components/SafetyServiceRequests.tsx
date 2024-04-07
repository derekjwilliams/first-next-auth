'use client'

import useMultipleServiceRequestsQuery from '@/hooks/useMultipleServiceRequestsQuery'
import useServiceRequestMutation from '@/hooks/useServiceRequestMutation'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useSupabase from '../hooks/useSupabase'

import { addServiceRequest } from '@/queries/addServiceRequest'

import { Database } from '@/utils/database.types'
type ServiceRequest = Database['public']['Tables']['service_requests']['Row']

const request_button = stylex.create({
  base: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: 18,
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
    borderRadius: '0.5rem',
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    padding: 10,
    backgroundColor: {
      default: `${colors.gray2}`,
      ':hover': `${marigoldColors.flowerYellow}`,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
  },
})

const request_card = stylex.create({
  checkbox_root: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0 2px 10px black',
    borderColor: '#556d55',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  checkbox_indicator: {
    padding: 0,
  },
  check_icon: {
    color: '#1d2496',
    height: '100%',
    width: '100%',
  },
})

interface ServiceTypeProps {
  // hack, should be about to use ServiceRequest type with just one param specified
  service_type_id: string | null
}

function AddServiceRequest({ service_type_id }: ServiceTypeProps) {
  const [description, setDescription] = useState('')
  const client = useSupabase()

  const mutationFn = async (value: ServiceRequest) => {
    return addServiceRequest(client, value)?.then((result) => result.data)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      debugger
      queryClient.setQueryData(
        ['service-requests'],
        (prevData: Array<ServiceRequest>) => [...prevData, data![0]]
      )
    },
  })

  const onCreateServiceRequest = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    mutation.mutate({
      description: description,
      technician_id: null,
      location_id: null,
      status_id: null,
      service_type_id: service_type_id,
      completed: null,
      date_created: null,
      date_updated: null,
      id: '',
      requested_by: null,
      status__old_id: null,
    })
  }

  return (
    <form onSubmit={onCreateServiceRequest}>
      {mutation.isPending ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button {...stylex.props(request_button.base)} type='submit'>
            Create Safety Service Request
          </button>
        </>
      )}
    </form>
  )
}

export default function MultipleServiceRequests() {
  const {
    data: serviceRequests,
    isLoading,
    isError,
  } = useMultipleServiceRequestsQuery({
    service_type_id: '28bc6a2c-3b18-4fba-a954-766c0d7047c5', // hack todo get from supabase
  })
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
  const safetyServiceTypeId = '28bc6a2c-3b18-4fba-a954-766c0d7047c5' // todo get from supabase

  return (
    <div>
      <AddServiceRequest
        service_type_id={safetyServiceTypeId}
      ></AddServiceRequest>
      <form>
        {serviceRequests.map((serviceRequest) => (
          <div key={serviceRequest.id}>
            <Checkbox.Root
              {...stylex.props(request_card.checkbox_root)}
              id='{serviceRequest.id}'
            >
              <Checkbox.Indicator
                {...stylex.props(request_card.checkbox_indicator)}
              >
                <CheckIcon {...stylex.props(request_card.check_icon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className='service-request-label'
              htmlFor='{serviceRequest.id}'
            >
              {/* todo make this a link to request details */}
              {serviceRequest.description} ({serviceRequest.id})
            </label>
          </div>
        ))}
      </form>
    </div>
  )
}
