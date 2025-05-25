// src/components/ServiceTypeDetailsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import ServiceTypeDetails from './ServiceTypeDetails'
import ServiceRequestTableContainer from './ServiceRequestTableContainer'
import * as stylex from '@stylexjs/stylex'
import { useStatusMapQuery } from '../hooks/useStatusMapQuery'
import { useServiceRequestsByServiceTypeId } from '../hooks/useServiceRequestsQuery'
import { useServiceTypeById, useServiceTypeByName, useServiceTypesQuery } from '../hooks/useServiceTypeQuery'
import { isUUID, snakeToPascalCase } from '../utils/stringUtils'

interface ServiceTypeDetailsContainerProps {
  serviceTypeIdentifier: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
  },
})

export default function ServiceTypeDetailsContainer({ serviceTypeIdentifier }: ServiceTypeDetailsContainerProps) {
  const [serviceTypeId, setServiceTypeId] = useState<string | null>(null)
  const [isLoadingIdentifier, setIsLoadingIdentifier] = useState(!isUUID(serviceTypeIdentifier))

  // If identifier is a UUID, use it directly
  const isIdDirectlyUsable = isUUID(serviceTypeIdentifier)

  // If not a UUID, fetch the ID from the name
  const { data: serviceTypeByName } = useServiceTypeByName(
    isIdDirectlyUsable ? null : snakeToPascalCase(serviceTypeIdentifier),
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

  const { data: serviceTypesResult = [] } = useServiceTypesQuery()

  const serviceTypeOptions = serviceTypesResult.map((type) => ({
    id: type.id,
    name: type.service_name || 'Unnamed Service',
  }))

  const statusOptions = Object.entries(statusMap).map(([id, name]) => ({
    id,
    name: name as string,
  }))

  if ((isLoadingIdentifier || isLoadingServiceType) && !serviceType) {
    return <div>Loading service type data...</div>
  }

  if (isErrorServiceType) {
    return <div>Error loading service type details: {errorServiceType?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <div>
      <div {...stylex.props(styles.detailsWrapper)}>
        {serviceType && <ServiceTypeDetails serviceType={serviceType} />}
        {!serviceType && <strong>{`Service Type "${serviceTypeIdentifier}" not found`}</strong>}
      </div>

      {/* Only render the table container when service type data is loaded */}
      {serviceType && serviceTypeId && (
        <ServiceRequestTableContainer
          entityId={serviceTypeId}
          statusMap={statusMap}
          isStatusMapLoading={statusMapLoading}
          useServiceRequestsQuery={useServiceRequestsByServiceTypeId}
          serviceTypeOptions={serviceTypeOptions}
          statusOptions={statusOptions}
          entityType='serviceType'
        />
      )}
    </div>
  )
}
