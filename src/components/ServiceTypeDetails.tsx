'use client'

import { serviceTypes } from '../utils/serviceTypes'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
import { ServiceTypeWithDetails } from 'src/queries/getServiceTypeById'

const requests = stylex.create({
  base: {
    padding: sizes.spacing2,
    backgroundColor: marigoldColors.background,
  },
})
const requestCard = stylex.create({
  base: {
    display: 'flex',
    color: marigoldColors.foreground,
    fontSize: fonts.size4,
  },
})

interface ServiceTypeDetailsProps {
  serviceType: ServiceTypeWithDetails
}

export default function ServiceTypeDetails({ serviceType }: ServiceTypeDetailsProps) {
  const serviceTypeDisplayName = serviceTypes.get(serviceType.service_name)?.displayName ?? serviceType.service_name

  if (!serviceType) {
    return <p>ServiceType not found.</p> // Improved message
  }
  return (
    <form>
      <div {...stylex.props(requests.base)}>
        <h3
          key={serviceType.id}
          {...stylex.props(requestCard.base)}>
          {`${serviceTypeDisplayName} Service Requests`}
        </h3>
      </div>
    </form>
  )
}
