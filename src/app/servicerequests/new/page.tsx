// src/app/servicerequests/new/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CreateServiceRequestForm from '@/components/CreateServiceRequestForm'
import { useStatusMapQuery } from 'src/hooks/useStatusMapQuery'
import { useLocationsQuery } from 'src/hooks/useLocationQuery'
import { useTechniciansQuery } from 'src/hooks/useTechnicianQuery'
import { useServiceTypesQuery } from 'src/hooks/useServiceTypeQuery'
import { snakeToPascalCase } from 'src/utils/stringUtils'
import * as stylex from '@stylexjs/stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'

const styles = stylex.create({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    padding: sizes.spacing6,
  },
  errorContainer: {
    padding: sizes.spacing6,
    maxWidth: '800px',
    margin: '0 auto',
    color: 'red',
  },
})

export default function NewServiceRequestPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get context parameters
  const locationId = searchParams.get('locationId') || undefined
  const serviceTypeId = searchParams.get('serviceTypeId') || undefined
  const technicianId = searchParams.get('technicianId') || undefined

  // For handling service type by name
  const serviceTypeName = searchParams.get('serviceTypeName') || undefined
  const [resolvedServiceTypeId, setResolvedServiceTypeId] = useState<string | undefined>(serviceTypeId)

  // Get data from your existing hooks
  const { data: statusMap = {}, isLoading: statusMapLoading } = useStatusMapQuery()
  const { data: locations = [], isLoading: locationsLoading } = useLocationsQuery()
  const { data: technicians = [], isLoading: techniciansLoading } = useTechniciansQuery()
  const { data: serviceTypes = [], isLoading: serviceTypesLoading } = useServiceTypesQuery()

  // Format status options from status map
  const statusOptions = Object.entries(statusMap).map(([id, name]) => ({
    id,
    name: name as string,
  }))

  // Format location options
  const locationOptions = locations.map((loc) => {
    let locationDisplay
    if (loc.location_name) {
      locationDisplay = loc.location_name
    } else if (loc.street_address) {
      locationDisplay = loc.street_address + (loc.unit_number ? ', Unit ' + loc.unit_number : '')
    } else {
      locationDisplay = `Location ${loc.id}`
    }
    return {
      id: loc.id,
      name: locationDisplay,
    }
  })

  // Format service type options
  const serviceTypeOptions = serviceTypes.map((type) => ({
    id: type.id,
    name: type.service_name || 'Unnamed Service',
  }))

  // Format technician options
  const technicianOptions = technicians.map((tech) => ({
    id: tech.id,
    name: tech.name || `Technician ${tech.id}`,
  }))

  // If we have a service type name but not an ID, resolve it
  useEffect(() => {
    if (serviceTypeName && !serviceTypeId) {
      const formattedName = snakeToPascalCase(serviceTypeName)
      const matchingType = serviceTypes.find((type) => type.service_name === formattedName)

      if (matchingType) {
        setResolvedServiceTypeId(matchingType.id)
      }
    }
  }, [serviceTypeName, serviceTypeId, serviceTypes])

  // Determine if we're still loading essential data
  const isLoading =
    statusMapLoading ||
    locationsLoading ||
    serviceTypesLoading ||
    techniciansLoading ||
    (serviceTypeName && !resolvedServiceTypeId)

  // Check if we have the minimum required data
  const hasRequiredData =
    statusOptions.length > 0 &&
    (locationId || locationOptions.length > 0) &&
    (resolvedServiceTypeId || serviceTypeOptions.length > 0)

  if (isLoading) {
    return (
      <div {...stylex.props(styles.loadingContainer)}>
        <h2>Loading form data...</h2>
      </div>
    )
  }

  if (!hasRequiredData) {
    return (
      <div {...stylex.props(styles.errorContainer)}>
        <h2>Error</h2>
        <p>Could not load the required data to create a service request.</p>
        <button onClick={() => router.back()}>Go Back</button>
      </div>
    )
  }

  return (
    <CreateServiceRequestForm
      locationId={locationId}
      serviceTypeId={resolvedServiceTypeId || serviceTypeId}
      technicianId={technicianId}
      statusOptions={statusOptions}
      serviceTypeOptions={serviceTypeOptions}
      locationOptions={locationOptions}
      technicianOptions={technicianOptions}
      hideLocationSelect={!!locationId}
      hideServiceTypeSelect={!!resolvedServiceTypeId || !!serviceTypeId}
      hideTechnicianSelect={false}
    />
  )
}
