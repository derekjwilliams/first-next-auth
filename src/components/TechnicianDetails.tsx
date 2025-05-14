'use client'

import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
import { TechnicianWithDetails } from 'src/queries/getTechnicianById'

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
  h3: {
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
})

interface TechnicianDetailsProps {
  technician: TechnicianWithDetails
}

export default function TechnicianDetails({ technician }: TechnicianDetailsProps) {
  if (!location) {
    return <p>Location not found.</p> // Improved message
  }
  return (
    <form>
      <div {...stylex.props(requests.base)}>
        <h3 {...stylex.props(form.heading, form.h3)}>Technician Detail</h3>
        <div key={technician.id} {...stylex.props(requestCard.base)}>
          {technician.name} {technician.email}
        </div>
      </div>
    </form>
  )
}
