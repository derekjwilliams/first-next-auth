'use client'

import useServiceRequestQuery from '@/hooks/useServiceRequestQuery'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'

import * as stylex from '@stylexjs/stylex'
import Link from 'next/link'

const requests = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
  },
  list: {
    margin: sizes.spacing5,
  },
})

const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
    alignItems: 'center',
  },
})

export default function ServiceRequestDetail({ id }: { id: string | null }) {
  const { data: serviceRequest, isLoading, isError } = useServiceRequestQuery(id!)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !serviceRequest) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }

  console.log(serviceRequest)
  return (
    <div {...stylex.props(requests.base)}>
      <Link href={`/servicerequests/${id}/edit`}>Edit</Link>

      <div key={serviceRequest.locations?.id} {...stylex.props(requestCard.base)}>
        {` ${serviceRequest.locations?.street_address} ${
          serviceRequest.locations?.unit_number ? serviceRequest.locations?.unit_number : ''
        }`}
      </div>
      <div key={serviceRequest.id} {...stylex.props(requestCard.base)}>
        {serviceRequest.description}
      </div>
      <div>
        <h2>Technicians Assigned</h2>
        <div>
          {serviceRequest.technicians.map((technician: any) => (
            <div key={technician.id}>
              <Link href={`/technicians/${technician.id}`}>{technician.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
