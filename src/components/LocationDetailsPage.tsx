'use client'

import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { type SortingState } from '@tanstack/react-table'
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
  const router = useRouter()
  const searchParams = useSearchParams()

  // Parse sorting from URL
  const getSortingFromUrl = useCallback((): SortingState => {
    const sortField = searchParams.get('sortField')
    const sortDirection = searchParams.get('sortDir')

    if (!sortField) return []

    return [
      {
        id: sortField,
        desc: sortDirection === 'desc',
      },
    ]
  }, [searchParams])

  // Get current sorting from URL
  const sorting = getSortingFromUrl()

  // Update URL when sorting changes
  const handleSortingChange = useCallback(
    (newSorting: SortingState) => {
      const params = new URLSearchParams(searchParams.toString())

      if (newSorting.length === 0) {
        // Remove sorting parameters if no sorting
        params.delete('sortField')
        params.delete('sortDir')
      } else {
        // Update sorting parameters
        params.set('sortField', newSorting[0].id)
        params.set('sortDir', newSorting[0].desc ? 'desc' : 'asc')
      }

      // Update URL without refreshing the page
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const {
    data: location,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    error: errorLocation,
  } = useLocationQuery(locationId)

  const {
    data: serviceRequestsData,
    isLoading: isLoadingServiceRequests,
    isError: isErrorServiceRequests,
    error: errorServiceRequests,
  } = useServiceRequestsByLocationIdQuery(locationId, {
    sorting,
  })

  const isLoading = isLoadingLocation || isLoadingServiceRequests
  const serviceRequests = serviceRequestsData?.data || []
  const totalCount = serviceRequestsData?.totalCount || 0

  if (isLoading && !serviceRequests.length) {
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
      <div {...stylex.props(styles.serviceRequestsWrapper)}>
        <h2>Service Requests</h2>
        {isErrorServiceRequests ? (
          <div>Error loading service requests: {errorServiceRequests?.message || 'An unknown error occurred.'}</div>
        ) : (
          <SimpleServiceRequestsTable
            serviceRequests={serviceRequests}
            totalCount={totalCount}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            isLoading={isLoadingServiceRequests}
          />
        )}
      </div>
    </div>
  )
}
