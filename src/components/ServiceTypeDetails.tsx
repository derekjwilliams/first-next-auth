'use client'

import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
import { ServiceTypeWithDetails } from 'src/queries/getServiceTypeById'

const requests = stylex.create({
  base: {
    padding: sizes.spacing2,
    backgroundColor: marigoldColors.background,
  },
  list: {
    // margin: sizes.spacing5,
  },
})
const form = stylex.create({
  heading: {
    color: marigoldColors.foreground,
    fontWeight: fonts.weight7,
  },
  h3: {
    fontSize: fonts.size5,
  },
})

const requestCard = stylex.create({
  base: {
    // margin: sizes.spacing2,
    display: 'flex',
    color: marigoldColors.foreground,
    fontSize: fonts.size4,
  },
})

interface ServiceTypeDetailsProps {
  serviceType: ServiceTypeWithDetails
}

export default function ServiceTypeDetails({ serviceType }: ServiceTypeDetailsProps) {
  if (!serviceType) {
    return <p>ServiceType not found.</p> // Improved message
  }
  return (
    <form>
      <div {...stylex.props(requests.base)}>
        <h3 key={serviceType.id} {...stylex.props(requestCard.base)}>
          {`${serviceType.service_name} Service Requests`}
        </h3>
      </div>
    </form>
  )
}
