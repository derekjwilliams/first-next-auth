// src/components/ServiceTypeDetailsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import ServiceTypeDetails from './ServiceTypeDetails'
import ServiceRequestTableContainer from './ServiceRequestTableContainer'
import * as stylex from '@stylexjs/stylex'
import { useStatusMapQuery } from '../hooks/useStatusMapQuery'
import { useServiceRequestsByServiceTypeId } from '../hooks/useServiceRequestsQuery'
import { useServiceTypeById, useServiceTypeByName } from '../hooks/useServiceTypeQuery'
import { isUUID } from '../utils/stringUtils'

interface ServiceTypeDetailsPageProps {
  serviceTypeIdentifier: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
  },
})

export default function ServiceTypeDetailsPage({ serviceTypeIdentifier }: ServiceTypeDetailsPageProps) {
  const [serviceTypeId, setServiceTypeId] = useState<string | null>(null)
  const [isLoadingIdentifier, setIsLoadingIdentifier] = useState(!isUUID(serviceTypeIdentifier))

  // If identifier is a UUID, use it directly
  const isIdDirectlyUsable = isUUID(serviceTypeIdentifier)

  // If not a UUID, fetch the ID from the name
  const { data: serviceTypeByName, isLoading: isLoadingByName } = useServiceTypeByName(
    isIdDirectlyUsable ? null : serviceTypeIdentifier,
  )

  // Set the service type ID once we have it (either directly or after lookup)
  useEffect(() => {
    if (isIdDirectlyUsable) {
      setServiceTypeId(serviceTypeIdentifier)
      setIsLoadingIdentifier(false)
    } else if (serviceTypeByName) {
      setServiceTypeId(serviceTypeByName.id)
      setIsLoadingIdentifier(false)
    }
  }, [isIdDirectlyUsable, serviceTypeIdentifier, serviceTypeByName])

  // Only run this query once we have the actual ID
  const {
    data: serviceType,
    isLoading: isLoadingServiceType,
    isError: isErrorServiceType,
    error: errorServiceType,
  } = useServiceTypeById(serviceTypeId || '')

  const { data: statusMap = {}, isLoading: statusMapLoading } = useStatusMapQuery()

  if ((isLoadingIdentifier || isLoadingServiceType) && !serviceType) {
    return <div>Loading service type data...</div>
  }

  if (isErrorServiceType) {
    return <div>Error loading service type details: {errorServiceType?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <div>
      <div {...stylex.props(styles.detailsWrapper)}>
        <h1>Service Type Details</h1>
        {serviceType && <ServiceTypeDetails serviceType={serviceType} />}
        {!serviceType && <strong>{`Service Type "${serviceTypeIdentifier}" not found`}</strong>}
      </div>

      {/* Only render the table container when service type data is loaded */}
      {serviceType && serviceTypeId && (
        <ServiceRequestTableContainer
          entityId={serviceTypeId} // Use the actual ID here, not the name
          statusMap={statusMap}
          isStatusMapLoading={statusMapLoading}
          useServiceRequestsQuery={useServiceRequestsByServiceTypeId}
        />
      )}
    </div>
  )
}
