'use client'

import useLocationQuery from '../hooks/useLocationQuery'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import * as stylex from '@stylexjs/stylex'
import Link from 'next/link'

const locations = stylex.create({
  base: {
    padding: 5,
    backgroundColor: marigoldColors.background,
  },
  assignments: {
    paddingLeft: sizes.spacing2,
  },
  list: {
    margin: 5,
  },
})

export default function LocationDetail({ id }: { id: string | null }) {
  const { data: location, isLoading, isError } = useLocationQuery(id!)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !location) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }
  return (
    <form>
      <div {...stylex.props(locations.base)}>
        <h2>
          {location.street_address} {location.unit_number}
        </h2>
        <h2>
          {location.city} {location.state_province} {location.postal_code}{' '}
        </h2>
        <div>
          <span>Bedrooms: </span>
          <span>{location.bedrooms.length}</span>
        </div>
        <div>
          <span>Bathrooms: </span>
          <span>{location.bathrooms.length}</span>
        </div>
        <div>
          {location.service_requests.map((serviceRequest: any, index: any) => {
            return (
              <div key={serviceRequest.id} {...stylex.props(locations.base)}>
                <Link href={`/servicerequests/${serviceRequest.id}`}>{serviceRequest.description}</Link>
                {serviceRequest.technicians.length > 0 && (
                  <div {...stylex.props(locations.assignments)}>
                    assigned to:
                    {serviceRequest.technicians.map((technician: any) => {
                      return (
                        <div key={technician.id} {...stylex.props(locations.assignments)}>
                          <Link {...stylex.props(locations.assignments)} href={`/technicians/${technician.id}`}>
                            {technician.name}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </form>
  )
}
