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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useSupabase from '../hooks/useSupabase'
import { addServiceRequest } from '@/queries/addServiceRequest'
import { Database } from '@/utils/database.types'

type ServiceRequest = Database['public']['Tables']['service_requests']['Row']

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
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    fontSize: '15px',
    color: `${colors.gray10}`,
    backgroundColor: `${colors.gray2}`,
    borderColor: {
      default: 'black',
      ':hover': `${marigoldColors.flowerYellow}`,
    },
  },
  textarea: {
    padding: '10px',
    width: '500px',
    height: '200px',
  },

  requestButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: 18,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
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

const requestCard = stylex.create({
  checkboxRoot: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#556d55',
    borderStyle: 'solid',
    borderWidth: 2,
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

interface ServiceTypeProps {
  // hack, should be about to use ServiceRequest type with just one param specified
  service_type_id: string | null
}

function AddServiceRequest({ service_type_id }: ServiceTypeProps) {
  const client = useSupabase()

  const mutationFn = async (value: ServiceRequest) => {
    return addServiceRequest(client, value)?.then((result) => result.data)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.setQueryData(['service-requests'], (prevData: Array<ServiceRequest>) => [...prevData, data![0]])
    },
  })

  const onCreateServiceRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({
      description: e.currentTarget.description.value,
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
    <>
      <h1 {...stylex.props(header.base)}>Create Service Request</h1>
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
        <Form.Submit asChild>
          <button {...stylex.props(form.requestButton)} style={{ marginTop: 10 }}>
            Submit Service Request
          </button>
        </Form.Submit>
      </Form.Root>
    </>
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
      <AddServiceRequest service_type_id={safetyServiceTypeId}></AddServiceRequest>
      <form>
        {serviceRequests.map((serviceRequest) => (
          <div key={serviceRequest.id}>
            {/* <Checkbox.Root {...stylex.props(requestCard.checkboxRoot)} id='{serviceRequest.id}'>
              <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
                <CheckIcon {...stylex.props(requestCard.checkIcon)} />
              </Checkbox.Indicator>
            </Checkbox.Root> */}
            <label className='service-request-label' htmlFor='{serviceRequest.id}'>
              {/* todo make this a link to request details */}
              {serviceRequest.description} ({serviceRequest.id})
            </label>
          </div>
        ))}
      </form>
    </div>
  )
}
