// src/components/LocationDetailsPage.tsx
'use client'

import useLocationQuery from '../hooks/useLocationQuery'
import LocationDetails from './LocationDetails'
import ServiceRequestTableContainer from './ServiceRequestTableContainer'
import * as stylex from '@stylexjs/stylex'
import { useStatusMapQuery } from 'src/hooks/useStatusMapQuery'
import { useServiceRequestsByLocationId } from '../hooks/useServiceRequestsQuery'

interface LocationDetailsPageProps {
  locationId: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
  },
})

export default function LocationDetailsPage({ locationId }: LocationDetailsPageProps) {
  const {
    data: location,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    error: errorLocation,
  } = useLocationQuery(locationId)

  const { data: statusMap = {}, isLoading: statusMapLoading } = useStatusMapQuery()

  if (isLoadingLocation && !location) {
    return <div>Loading property data...</div>
  }

  if (isErrorLocation) {
    return <div>Error loading property details: {errorLocation?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <div>
      <div {...stylex.props(styles.detailsWrapper)}>
        <h1>Property Details</h1>
        {location && <LocationDetails location={location} />}
        {!location && <strong>{`Location with ${locationId} not found`}</strong>}
      </div>

      {/* Only render the table container when location data is loaded */}
      {location && (
        <ServiceRequestTableContainer
          entityId={locationId}
          statusMap={statusMap}
          isStatusMapLoading={statusMapLoading}
          useServiceRequestsQuery={useServiceRequestsByLocationId}
        />
      )}
    </div>
  )
}
