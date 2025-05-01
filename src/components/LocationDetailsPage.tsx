'use client'

import useLocationQuery from '../hooks/useLocationQuery'
import useServiceRequestsByLocationIdQuery from '../hooks/useServiceRequestsByLocationIdQuery'
import LocationDetails from './LocationDetails'
import SimpleServiceRequestsTable from './SimpleServiceRequestsTable'
import * as stylex from '@stylexjs/stylex'

interface LocationDetailsPageProps {
  locationId: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
  },
  serviceRequestsWrapper: {
    padding: '20px',
  },
})

export default function LocationDetailsPage({ locationId }: LocationDetailsPageProps) {
  const {
    data: location,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    error: errorLocation,
  } = useLocationQuery(locationId)

  const {
    data: serviceRequests,
    isLoading: isLoadingServiceRequests,
    isError: isErrorServiceRequests,
    error: errorServiceRequests,
  } = useServiceRequestsByLocationIdQuery(locationId)

  const isLoading = isLoadingLocation || isLoadingServiceRequests

  if (isLoading) {
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
        {!!location && <strong>{`Location with ${locationId} not found`}</strong>}
      </div>
      <div {...stylex.props(styles.serviceRequestsWrapper)}>
        <h2>Service Requests</h2>
        {isErrorServiceRequests ? (
          <div>Error loading service requests: {errorServiceRequests?.message || 'An unknown error occurred.'}</div>
        ) : (
          <SimpleServiceRequestsTable serviceRequests={serviceRequests || []} />
        )}
      </div>
    </div>
  )
}
