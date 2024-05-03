'use client'

import useMultipleServiceRequestsQuery from '@/hooks/useMultipleServiceRequestsQuery'
import useServiceRequestMutation from '@/hooks/useServiceRequestMutation'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as stylex from '@stylexjs/stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useSupabase from '../../hooks/useSupabase'
import { InferProps } from 'prop-types'

import { addServiceRequest } from '@/queries/addServiceRequest'

import { Database } from '@/utils/database.types'
type ServiceRequest = Database['public']['Tables']['service_requests']['Row']

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

function AddServiceRequest() {
  const [description, setDescription] = useState('')
  const client = useSupabase()

  const mutationFn = async (value: ServiceRequest) => {
    return addServiceRequest(client, value)?.then((result) => result.data)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
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
      service_type_id: null,
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

          <button type='submit'>Create Service Request</button>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
  } = useMultipleServiceRequestsQuery({ service_type_id: null })
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
    <div>
      <AddServiceRequest></AddServiceRequest>
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
