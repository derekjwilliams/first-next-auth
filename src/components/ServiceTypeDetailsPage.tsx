'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import useServiceTypeQuery from '../hooks/useServiceTypeQuery'
import { useServiceRequestsByServiceTypeId } from '../hooks/useServiceRequestsQuery' // Updated import
import ServiceTypeDetails from './ServiceTypeDetails'
import SimpleServiceRequestsTable from './SimpleServiceRequestsTable'
import * as stylex from '@stylexjs/stylex'
import { useCallback, useMemo } from 'react'
import { useStatusMapQuery } from 'src/hooks/useStatusMapQuery'
import { parseIncludeArchivedFromURL, parsePaginationFromURL, parseSortingFromURL} from '../utils/serviceRequestUtils'

interface ServicedTypeDetailsPageProps {
  serviceTypeId: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
  },
  serviceRequestsWrapper: {
    padding: '20px',
  },
})

// Helper to get current page size, falling back to a default
const getCurrentPageSize = (
  paginationState: PaginationState,
  defaultSize = 10,
): number => {
  return paginationState?.pageSize || defaultSize;
}

export default function ServiceTypeDetailsPage({ serviceTypeId }: ServicedTypeDetailsPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sorting = useMemo(() => parseSortingFromURL(searchParams), [searchParams])
  const pagination = useMemo(() => parsePaginationFromURL(searchParams), [searchParams])
  const includeArchived = useMemo(
    () => parseIncludeArchivedFromURL(searchParams),
    [searchParams],
  );

  const handleStateChange = useCallback(
    (newState: {
      sorting?: SortingState;
      pagination?: PaginationState;
      includeArchived?: boolean;
    }) => {
      const params = new URLSearchParams(searchParams.toString())

      // Update sorting with debug logs
      if (newState.sorting !== undefined) {
        console.log('New sorting state:', newState.sorting)
        if (newState.sorting.length > 0) {
          const { id, desc } = newState.sorting[0]
          params.set('sort', id)
          params.set('order', desc ? 'desc' : 'asc')
        } else {
          params.delete('sort')
          params.delete('order')
        }
      }

      // Update pagination
      if (newState.pagination !== undefined) {
        params.set('page', (newState.pagination.pageIndex + 1).toString())
        params.set('pageSize', newState.pagination.pageSize.toString())
      }

      if (newState.includeArchived !== undefined) {
        if (newState.includeArchived) {
          params.set("includeArchived", "true")
        } else {
          params.delete("includeArchived")
        }
      }
      
      const newUrl = `${pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  // --- Specific event handlers for the table ---
  const handleSortingChange = useCallback(
    (newSorting: SortingState) => {
      handleStateChange({
        sorting: newSorting,
        // Reset to page 1 when sorting changes, keep current page size
        pagination: {
          pageIndex: 0,
          pageSize: getCurrentPageSize(pagination),
        },
      });
    },
    [handleStateChange, pagination],
  )

  const handlePaginationChange = useCallback(
    (newPagination: PaginationState) => {
      handleStateChange({ pagination: newPagination });
    },
    [handleStateChange],
  )
  
  const handleIncludeArchivedToggle = useCallback(
    (newIncludeArchivedValue: boolean) => {
      handleStateChange({
        includeArchived: newIncludeArchivedValue,
        // Reset to page 1 when 'includeArchived' changes, keep current page size
        pagination: {
          pageIndex: 0,
          pageSize: getCurrentPageSize(pagination),
        },
      });
    },
    [handleStateChange, pagination],
  )

  const {
    data: serviceType,
    isLoading: isLoadingServiceType,
    isError: isErrorServiceType,
    error: errorServiceType,
  } = useServiceTypeQuery(serviceTypeId)

  const { data: statusMap = {}, isLoading: statusMapLoading } =
    useStatusMapQuery();

  const {
    data: serviceRequestsData,
    isLoading: isLoadingServiceRequests,
    isError: isErrorServiceRequests,
    error: errorServiceRequests,
  } = useServiceRequestsByServiceTypeId(serviceTypeId, {
    sorting,
    pagination,
    includeArchived
  }, 
    statusMap,
    statusMapLoading,
  )

  const isLoading =
    isLoadingServiceType || isLoadingServiceRequests || statusMapLoading;

  const serviceRequests = serviceRequestsData?.data || []
  const totalCount = serviceRequestsData?.totalCount || 0

  if (isLoading && !serviceRequests.length) {
    return <div>Loading property data...</div>
  }

  if (isErrorServiceType) {
    return <div>Error loading service type details: {errorServiceType?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <div>
      <div {...stylex.props(styles.detailsWrapper)}>
        <h1>Service Type Details</h1>
        {serviceType && <ServiceTypeDetails serviceType={serviceType} />}
        {!serviceType && <strong>{`Service Type with ${serviceTypeId} not found`}</strong>}
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
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            includeArchived={includeArchived}
            onIncludeArchivedChange={handleIncludeArchivedToggle}
            isLoading={isLoadingServiceRequests}
            statusMap={statusMap}
          />
        )}
      </div>
    </div>
  )
}
