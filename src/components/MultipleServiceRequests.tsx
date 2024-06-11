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
    fontSize: fonts.size8,
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

  requestButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: fonts.size2,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
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

function AddServiceRequest({ serviceTypeId, serviceDisplayName }: MultipleServiceRequestsProps) {
  const client = useSupabase()
  const mutationFn = async (value: Tables<'service_requests'>) => {
    return addServiceRequest(client, value)?.then((result) => result.data)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
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
      technician_id: null,
      location_id: null,
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
        <Form.Submit asChild>
          <button {...stylex.props(form.requestButton)}>Submit Service Request</button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
interface MultipleServiceRequestsProps {
  serviceTypeId: string
  serviceDisplayName: string
}
export default function MultipleServiceRequests({ serviceTypeId, serviceDisplayName }: MultipleServiceRequestsProps) {
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
      <AddServiceRequest serviceTypeId={serviceTypeId} serviceDisplayName={serviceDisplayName}></AddServiceRequest>
      <form {...stylex.props(requests.list)}>
        {serviceRequests.map((serviceRequest) => (
          <div key={serviceRequest.id} {...stylex.props(requestCard.base)}>
            <Checkbox.Root {...stylex.props(requestCard.checkboxRoot)} id='{serviceRequest.id}'>
              <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
                <CheckIcon {...stylex.props(requestCard.checkIcon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
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
