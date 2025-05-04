'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import useLocationQuery from '../hooks/useLocationQuery'
import useServiceRequestsByLocationIdQuery from '../hooks/useServiceRequestsByLocationIdQuery'
import LocationDetails from './LocationDetails'
import SimpleServiceRequestsTable from './SimpleServiceRequestsTable'
import * as stylex from '@stylexjs/stylex'
import { useMemo } from 'react'

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

  const handleStateChange = (newState: { sorting?: SortingState; pagination?: PaginationState }) => {
    const params = new URLSearchParams(searchParams.toString())

    // Update sorting
    if (newState.sorting) {
      if (newState.sorting.length > 0) {
        params.set('sort', newState.sorting[0].id)
        params.set('order', newState.sorting[0].desc ? 'desc' : 'asc')
      } else {
        params.delete('sort')
        params.delete('order')
      }
    }

    // Update pagination
    if (newState.pagination) {
      params.set('page', (newState.pagination.pageIndex + 1).toString())
      params.set('pageSize', newState.pagination.pageSize.toString())
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
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
  } = useServiceRequestsByLocationIdQuery(locationId, {
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
            onSortingChange={(sorting) => handleStateChange({ sorting })}
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
  return sort ? [{ id: sort, desc: order === 'desc' }] : []
}

function parsePaginationFromURL(searchParams: URLSearchParams): PaginationState {
  return {
    pageIndex: Math.max(0, parseInt(searchParams.get('page') || '1', 10) - 1),
    pageSize: Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10))),
  }
}
