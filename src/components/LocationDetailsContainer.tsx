// src/components/LocationDetailsContainer.tsx
'use client'

import LocationDetails from './LocationDetails'
import ServiceRequestTableContainer from './ServiceRequestTableContainer'
import * as stylex from '@stylexjs/stylex'
import { useLocationQuery } from '../hooks/useLocationQuery'
import { useStatusMapQuery } from 'src/hooks/useStatusMapQuery'
import { useServiceRequestsByLocationId } from '../hooks/useServiceRequestsQuery'
import { useServiceTypesQuery } from 'src/hooks/useServiceTypeQuery'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'

interface LocationDetailsContainerProps {
  locationId: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
    color: marigoldColors.foreground,
  },
})

export default function LocationDetailsContainer({ locationId }: LocationDetailsContainerProps) {
  const {
    data: location,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    error: errorLocation,
  } = useLocationQuery(locationId)

  const { data: statusMap = {}, isLoading: statusMapLoading } = useStatusMapQuery()

  const { data: serviceTypes = [] } = useServiceTypesQuery()

  const serviceTypeOptions = serviceTypes.map((type) => ({
    id: type.id,
    name: type.service_name || 'Unnamed Service',
  }))

  const statusOptions = Object.entries(statusMap).map(([id, name]) => ({
    id,
    name: name as string,
  }))

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
          serviceTypeOptions={serviceTypeOptions}
          statusOptions={statusOptions}
          entityType='location'
        />
      )}
    </div>
  )
}
