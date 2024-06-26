'use client'

import useServiceRequestQuery from '@/hooks/useServiceRequestQuery'

import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'

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
  h1: {
    fontSize: fonts.sizeFluid3,
    fontWeight: fonts.weight7,
  },
  description: {
    fontSize: fonts.sizeFluid1,
    fontWeight: fonts.weight2,
    lineHeight: fonts.lineHeight3,
    borderWidth: borders.size1,
    borderStyle: 'solid',
    borderColor: marigoldColors.pansy,
    borderRadius: borders.radius2,
    padding: sizes.spacing6,
    backgroundColor: {
      default: 'white',
    },
  },
})

const button = stylex.create({
  base: {
    display: 'inline-flex',
    whiteSpace: 'nowrap',
    fontSize: fonts.sizeFluid1,
    fontWeight: fonts.weight7,
    paddingInline: sizes.spacing6,
    paddingBlock: sizes.spacing3,
    color: {
      default:colors.blue9,
      ':hover': colors.blue0,
      ':focus': colors.blue0,
    },
    borderWidth: borders.size2,
    borderStyle: 'solid',
    borderColor: colors.blue5,
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.blue5,
      ':focus': colors.blue5,
    },
    borderRadius: borders.radius2,
    cursor: {
      ':hover': 'pointer',
      ':focus': 'pointer',
    },
  }
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

      <Link href={`/servicerequests/${id}/edit`}  {...stylex.props(button.base)}>Edit</Link>

      <div key={serviceRequest.locations?.id} {...stylex.props(requestCard.base)}>
        <h1 {...stylex.props(requestCard.h1)}>
          {` ${serviceRequest.locations?.street_address} ${
          serviceRequest.locations?.unit_number ? serviceRequest.locations?.unit_number : ''
        }`}
        </h1>
      </div>
      <div key={serviceRequest.id} {...stylex.props(requestCard.description)}>
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
