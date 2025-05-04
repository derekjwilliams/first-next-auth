'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import useLocationQuery from '../hooks/useLocationQuery'
import { useServiceRequestsByLocationId } from '../hooks/useServiceRequestsQuery' // Updated import
import LocationDetails from './LocationDetails'
import SimpleServiceRequestsTable from './SimpleServiceRequestsTable'
import * as stylex from '@stylexjs/stylex'
import { useEffect, useMemo } from 'react'

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
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sorting = useMemo(() => parseSortingFromURL(searchParams), [searchParams])
  const pagination = useMemo(() => parsePaginationFromURL(searchParams), [searchParams])

  // Debug log for sorting changes
  useEffect(() => {
    console.log('Current sorting state:', sorting)
  }, [sorting])


  const handleStateChange = (newState: { sorting?: SortingState; pagination?: PaginationState }) => {
    const params = new URLSearchParams(searchParams.toString())

    // Update sorting with debug logs
    if (newState.sorting !== undefined) {
      console.log('New sorting state:', newState.sorting)
      if (newState.sorting.length > 0) {
        const { id, desc } = newState.sorting[0]
        params.set('sort', id)
        params.set('order', desc ? 'desc' : 'asc')
        console.log(`Setting URL params: sort=${id}, order=${desc ? 'desc' : 'asc'}`)
      } else {
        params.delete('sort')
        params.delete('order')
        console.log('Clearing sort parameters')
      }
    }

    // Update pagination
    if (newState.pagination !== undefined) {
      params.set('page', (newState.pagination.pageIndex + 1).toString())
      params.set('pageSize', newState.pagination.pageSize.toString())
    }
    
    const newUrl = `${pathname}?${params.toString()}`
    console.log(`Navigating to: ${newUrl}`)
    router.replace(newUrl, { scroll: false })
  }

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
  } = useServiceRequestsByLocationId(locationId, {
    sorting,
    pagination,
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
            onSortingChange={(newSorting) => {
              console.log('Table sorting changed:', newSorting)
              handleStateChange({ sorting: newSorting })
            }}
            pagination={pagination}
            onPaginationChange={(pagination) => handleStateChange({ pagination })}
            isLoading={isLoadingServiceRequests}
          />
        )}
      </div>
    </div>
  )
}

function parseSortingFromURL(searchParams: URLSearchParams): SortingState {
  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  
  if (!sort) return []
  
  const isDesc = order === 'desc'
  console.log(`Parsing sort from URL: ${sort}, order: ${order}, isDesc: ${isDesc}`)
  
  return [{ id: sort, desc: isDesc }]
}

function parsePaginationFromURL(searchParams: URLSearchParams): PaginationState {
  return {
    pageIndex: Math.max(0, parseInt(searchParams.get('page') || '1', 10) - 1),
    pageSize: Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10))),
  }
}
