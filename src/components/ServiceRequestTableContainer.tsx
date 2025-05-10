// src/components/ServiceRequestTableContainer.tsx
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import SimpleServiceRequestsTable from './SimpleServiceRequestsTable'
import * as stylex from '@stylexjs/stylex'
import { useCallback, useMemo } from 'react'
import { parseIncludeArchivedFromURL, parsePaginationFromURL, parseSortingFromURL } from '../utils/serviceRequestUtils'

interface ServiceRequestTableContainerProps {
  entityId: string
  statusMap: Record<string, string>
  isStatusMapLoading: boolean
  useServiceRequestsQuery: (
    id: string,
    options: {
      sorting?: SortingState
      pagination?: PaginationState
      includeArchived?: boolean
    },
    statusMap: Record<string, string>,
    isStatusMapLoading: boolean,
  ) => any
}

const styles = stylex.create({
  serviceRequestsWrapper: {
    padding: '20px',
  },
})

const getCurrentPageSize = (paginationState: PaginationState, defaultSize = 10): number => {
  return paginationState?.pageSize || defaultSize
}

export default function ServiceRequestTableContainer({
  entityId,
  statusMap,
  isStatusMapLoading,
  useServiceRequestsQuery,
}: ServiceRequestTableContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sorting = useMemo(() => parseSortingFromURL(searchParams), [searchParams])
  const pagination = useMemo(() => parsePaginationFromURL(searchParams), [searchParams])
  const includeArchived = useMemo(() => parseIncludeArchivedFromURL(searchParams), [searchParams])

  const handleStateChange = useCallback(
    (newState: { sorting?: SortingState; pagination?: PaginationState; includeArchived?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString())

      if (newState.sorting !== undefined) {
        if (newState.sorting.length > 0) {
          const { id, desc } = newState.sorting[0]
          params.set('sort', id)
          params.set('order', desc ? 'desc' : 'asc')
        } else {
          params.delete('sort')
          params.delete('order')
        }
      }

      if (newState.pagination !== undefined) {
        params.set('page', (newState.pagination.pageIndex + 1).toString())
        params.set('pageSize', newState.pagination.pageSize.toString())
      }

      if (newState.includeArchived !== undefined) {
        if (newState.includeArchived) {
          params.set('includeArchived', 'true')
        } else {
          params.delete('includeArchived')
        }
      }

      const newUrl = `${pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const handleSortingChange = useCallback(
    (newSorting: SortingState) => {
      handleStateChange({
        sorting: newSorting,
        pagination: {
          pageIndex: 0,
          pageSize: getCurrentPageSize(pagination),
        },
      })
    },
    [handleStateChange, pagination],
  )

  const handlePaginationChange = useCallback(
    (newPagination: PaginationState) => {
      handleStateChange({ pagination: newPagination })
    },
    [handleStateChange],
  )

  const handleIncludeArchivedToggle = useCallback(
    (newIncludeArchivedValue: boolean) => {
      handleStateChange({
        includeArchived: newIncludeArchivedValue,
        pagination: {
          pageIndex: 0,
          pageSize: getCurrentPageSize(pagination),
        },
      })
    },
    [handleStateChange, pagination],
  )

  // Use the query hook passed as a prop
  const {
    data: serviceRequestsData,
    isLoading: isLoadingServiceRequests,
    isError: isErrorServiceRequests,
    error: errorServiceRequests,
  } = useServiceRequestsQuery(
    entityId,
    {
      sorting,
      pagination,
      includeArchived,
    },
    statusMap,
    isStatusMapLoading,
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const serviceRequests = serviceRequestsData?.data || []
  const totalCount = serviceRequestsData?.totalCount || 0

  return (
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
          isLoading={isLoadingServiceRequests || isStatusMapLoading}
          statusMap={statusMap}
        />
      )}
    </div>
  )
}
