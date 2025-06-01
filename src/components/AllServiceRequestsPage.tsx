'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import ServiceRequestsTable from './ServiceRequestsTable'
import { useStatusMapQuery } from '../hooks/useStatusMapQuery'
// import { useAllServiceRequests } from '../hooks/useAllServiceRequests'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import Link from 'next/link'
import { useAllServiceRequests } from 'src/hooks/useServiceRequestsQuery'

// Utility functions (same as in ServiceRequestTableContainer)
const parseSortingFromURL = (searchParams: URLSearchParams): SortingState => {
  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  if (sort && (order === 'asc' || order === 'desc')) {
    return [{ id: sort, desc: order === 'desc' }]
  }
  return []
}

const parsePaginationFromURL = (searchParams: URLSearchParams): PaginationState => {
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  return {
    pageIndex: page ? parseInt(page, 10) - 1 : 0,
    pageSize: pageSize ? parseInt(pageSize, 10) : 10,
  }
}

const parseIncludeArchivedFromURL = (searchParams: URLSearchParams): boolean => {
  return searchParams.get('includeArchived') === 'true'
}

const getCurrentPageSize = (paginationState: PaginationState, defaultSize = 10): number => {
  return paginationState?.pageSize || defaultSize
}

// Styles
const styles = stylex.create({
  serviceRequestsWrapper: {
    margin: '20px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  createButton: {
    padding: '10px 15px',
    // backgroundColor: marigoldColors.buttonBackgroundColor,
    color: 'white',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    ':hover': {
      // backgroundColor: marigoldColors.buttonPrimaryHover,
    },
  },
  tableContainer: {
    position: 'relative',
  },
})

export default function AllServiceRequestsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Parse initial state from URL
  const [sorting, setSorting] = useState<SortingState>(parseSortingFromURL(searchParams))
  const [pagination, setPagination] = useState<PaginationState>(parsePaginationFromURL(searchParams))
  const [includeArchived, setIncludeArchived] = useState<boolean>(parseIncludeArchivedFromURL(searchParams))

  // Handle state changes by updating URL
  const handleStateChange = (newState: {
    sorting?: SortingState
    pagination?: PaginationState
    includeArchived?: boolean
  }) => {
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
  }

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting)
    handleStateChange({
      sorting: newSorting,
      pagination: {
        pageIndex: 0,
        pageSize: getCurrentPageSize(pagination),
      },
    })
  }

  const handlePaginationChange = (newPagination: PaginationState) => {
    setPagination(newPagination)
    handleStateChange({ pagination: newPagination })
  }

  const handleIncludeArchivedToggle = (newIncludeArchivedValue: boolean) => {
    setIncludeArchived(newIncludeArchivedValue)
    handleStateChange({
      includeArchived: newIncludeArchivedValue,
      pagination: {
        pageIndex: 0,
        pageSize: getCurrentPageSize(pagination),
      },
    })
  }

  // Fetch data using the hook
  const { data: statusMap = {}, isLoading: statusMapLoading } = useStatusMapQuery()
  const {
    data: serviceRequestsData,
    isLoading: isLoadingServiceRequests,
    isError: isErrorServiceRequests,
    error: errorServiceRequests,
  } = useAllServiceRequests({
    sorting,
    pagination,
    includeArchived,
    statusMap,
    statusMapLoading,
  })

  const serviceRequests = serviceRequestsData?.data || []
  const totalCount = serviceRequestsData?.totalCount || 0

  return (
    <div {...stylex.props(styles.serviceRequestsWrapper)}>
      <div {...stylex.props(styles.headerContainer)}>
        <Link
          href='/servicerequests/new'
          {...stylex.props(styles.createButton)}>
          New Service Request
        </Link>
      </div>
      <div {...stylex.props(styles.tableContainer)}>
        {isErrorServiceRequests ? (
          <div>Error loading service requests: {errorServiceRequests?.message || 'An unknown error occurred.'}</div>
        ) : (
          <ServiceRequestsTable
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
