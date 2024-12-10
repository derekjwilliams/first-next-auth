'use client'

import useTechnicianQuery from '../hooks/useTechnicianQuery'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '../app/open-props/lib/colors.stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'

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
const form = stylex.create({
  heading: {
    color: marigoldColors.foreground,
    fontWeight: fonts.weight7,
  },
  h1: {
    fontSize: fonts.size7,
  },
  h2: {
    fontSize: fonts.size5,
  },
})

const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
    color: marigoldColors.foreground,
    fontSize: fonts.size4,
  },
  checkboxRoot: {
    backgroundColor: 'white',
    minWidth: 25,
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
  requestLink: {
    color: {
      default: marigoldColors.foregroundLink,
      ':hover': marigoldColors.foregroundHoverLink,
    },
  },
})

export default function TechnicianDetail({ id }: { id: string | null }) {
  const { data: technician, isLoading, isError } = useTechnicianQuery(id!)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !technician) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }
  return (
    <form>
      <div {...stylex.props(requests.base)}>
        <h1 {...stylex.props(form.heading, form.h1)}>Technician Detail</h1>
        <div key={technician.id} {...stylex.props(requestCard.base)}>
          {technician.name} {technician.email}
        </div>
        <div>
          <h2 {...stylex.props(form.heading, form.h2)}>Service Requests</h2>
          <div>
            {technician.service_requests.map((serviceRequest: any) => (
              <div key={serviceRequest.id}>
                <Link href={`/servicerequests/${serviceRequest.id}`} {...stylex.props(requestCard.requestLink)}>
                  {`${serviceRequest.description} at ${serviceRequest.locations.street_address} ${
                    serviceRequest.locations.unit_number ?? ''
                  }`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
