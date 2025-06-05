// src/components/ServiceRequestTableContainer.tsx
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import ServiceRequestsTable from './ServiceRequestsTable'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { parseIncludeArchivedFromURL, parsePaginationFromURL, parseSortingFromURL } from '../utils/serviceRequestUtils'
import Link from 'next/link'

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any
  serviceTypeOptions?: { id: string; name: string }[]
  statusOptions?: { id: string; name: string }[]
  locationOptions?: { id: string; name: string }[]
  technicianOptions?: { id: string; name: string }[]
  entityType: 'location' | 'serviceType' | 'technician'
}

const styles = stylex.create({
  serviceRequestsWrapper: {
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    padding: {
      default: sizes.spacing4,
      '@media (max-width: 768px)': sizes.spacing2,
    },
    backgroundColor: marigoldColors.backgroundPage,
    overflow: 'hidden',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.spacing4,
    width: '100%',
    boxSizing: 'border-box',
  },
  createButton: {
    paddingTop: {
      default: sizes.spacing2,
      '@media (max-width: 600px)': sizes.spacing2,
    },
    paddingBottom: {
      default: sizes.spacing2,
      '@media (max-width: 600px)': sizes.spacing2,
    },
    paddingLeft: {
      default: sizes.spacing4,
      '@media (max-width: 600px)': sizes.spacing3,
    },
    paddingRight: {
      default: sizes.spacing4,
      '@media (max-width: 600px)': sizes.spacing3,
    },
    borderRadius: borders.radius2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    backgroundColor: {
      default: marigoldColors.backgroundButton,
      ':hover': marigoldColors.backgroundHoverButton,
    },
    color: {
      default: marigoldColors.foregroundButton,
      ':hover': marigoldColors.foregroundHoverButton,
    },
    cursor: 'pointer',
    fontSize: fonts.size1,
    textDecoration: 'none',
    fontWeight: fonts.weight5,
    minWidth: {
      '@media (max-width: 600px)': sizes.spacing8,
    },
    ':disabled': {
      backgroundColor: marigoldColors.backgroundButton,
      color: marigoldColors.textMuted,
      borderColor: marigoldColors.borderSubtle,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.05)',
      ':hover': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: marigoldColors.textAccent,
      outlineOffset: '2px',
    },
  },
  tableContainer: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
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
  entityType,
}: ServiceRequestTableContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sorting = parseSortingFromURL(searchParams)
  const pagination = parsePaginationFromURL(searchParams)
  const includeArchived = parseIncludeArchivedFromURL(searchParams)

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
    handleStateChange({
      sorting: newSorting,
      pagination: {
        pageIndex: 0,
        pageSize: getCurrentPageSize(pagination),
      },
    })
  }

  const handlePaginationChange = (newPagination: PaginationState) => {
    handleStateChange({ pagination: newPagination })
  }

  const handleIncludeArchivedToggle = (newIncludeArchivedValue: boolean) => {
    handleStateChange({
      includeArchived: newIncludeArchivedValue,
      pagination: {
        pageIndex: 0,
        pageSize: getCurrentPageSize(pagination),
      },
    })
  }

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

  const serviceRequests = serviceRequestsData?.data || []
  const totalCount = serviceRequestsData?.totalCount || 0

  return (
    <div {...stylex.props(styles.serviceRequestsWrapper)}>
      <div {...stylex.props(styles.headerContainer)}>
        <Link
          href={`/servicerequests/new?${
            entityType === 'location'
              ? `locationId=${entityId}`
              : entityType === 'serviceType'
                ? `serviceTypeId=${entityId}`
                : entityType === 'technician'
                  ? `technicianId=${entityId}`
                  : ''
          }`}
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
            isLoading={isLoadingServiceRequests || isStatusMapLoading}
            statusMap={statusMap}
            entityType={entityType}
          />
        )}
      </div>
    </div>
  )
}
