// src/components/ServiceRequestTableContainer.tsx (modified)
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import SimpleServiceRequestsTable from './SimpleServiceRequestsTable'
import CreateServiceRequestDialog from './CreateServiceRequestDialog'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '../app/open-props/lib/colors.stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { borders } from '../app/open-props/lib/borders.stylex'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { parseIncludeArchivedFromURL, parsePaginationFromURL, parseSortingFromURL } from '../utils/serviceRequestUtils'
import { useLocationsQuery } from 'src/hooks/useLocationQuery'
import { useTechniciansQuery } from 'src/hooks/useTechnicianQuery'

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
  entityType: 'location' | 'serviceType' | 'technician' // required to determine context
}

const styles = stylex.create({
  serviceRequestsWrapper: {
    padding: '20px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  createButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: fonts.size2,
    borderRadius: borders.radius2,
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    padding: sizes.spacing2,
    backgroundColor: {
      default: colors.gray2,
      ':hover': marigoldColors.flowerYellow,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    marginTop: '10px',
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
  serviceTypeOptions = [],
  statusOptions = [],
  locationOptions = [],
  technicianOptions = [],
  entityType,
}: ServiceRequestTableContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const { data: locations = [] } = useLocationsQuery()
  const { data: technicians = [] } = useTechniciansQuery()
  const dialogOpenInUrl = searchParams.get('createDialog') === 'open'
  const [isDialogOpen, setIsDialogOpen] = useState(dialogOpenInUrl)
  // const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setIsDialogOpen(dialogOpenInUrl)
  }, [dialogOpenInUrl])

  const sorting = useMemo(() => parseSortingFromURL(searchParams), [searchParams])
  const pagination = useMemo(() => parsePaginationFromURL(searchParams), [searchParams])
  const includeArchived = useMemo(() => parseIncludeArchivedFromURL(searchParams), [searchParams])

  const formattedLocationOptions =
    locationOptions.length > 0
      ? locationOptions
      : locations.map((loc) => ({ id: loc.id, name: loc.location_name || loc.street_address || `Location ${loc.id}` }))

  const formattedTechOptions =
    technicianOptions.length > 0
      ? technicianOptions
      : technicians.map((tech) => ({ id: tech.id, name: tech.name || `Technician ${tech.id}` }))

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

  // Dialog handlers
  // Open dialog handler - updates URL
  const openDialog = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('createDialog', 'open')
    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
    // State will be updated via the effect that watches dialogOpenInUrl
  }, [pathname, router, searchParams])

  // Close dialog handler - updates URL
  const closeDialog = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('createDialog')
    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl, { scroll: false })
    // State will be updated via the effect that watches dialogOpenInUrl
  }, [pathname, router, searchParams])

  const handleCreateSuccess = useCallback(() => {
    // Reset to first page
    handleStateChange({
      pagination: {
        pageIndex: 0,
        pageSize: getCurrentPageSize(pagination),
      },
    })

    // Create a filter string matching what your hook uses
    const filterString = JSON.stringify(
      entityType === 'location'
        ? { locationId: entityId }
        : entityType === 'serviceType'
          ? { serviceTypeId: entityId }
          : entityType === 'technician'
            ? { statusId: entityId }
            : {},
    )

    // Force an immediate refetch with the current filters
    queryClient.refetchQueries({
      predicate: (query) => {
        return (
          Array.isArray(query.queryKey) && query.queryKey[0] === 'serviceRequests' && query.queryKey[1] === filterString
        )
      },
    })
    closeDialog()
  }, [handleStateChange, pagination, queryClient, entityType, entityId, closeDialog])
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

  const serviceRequests = serviceRequestsData?.data || []
  const totalCount = serviceRequestsData?.totalCount || 0

  return (
    <div {...stylex.props(styles.serviceRequestsWrapper)}>
      <div {...stylex.props(styles.headerContainer)}>
        {/* <h2>Service Requests</h2> */}
        <button {...stylex.props(styles.createButton)} onClick={openDialog}>
          New Service Request
        </button>
      </div>
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
      {/* Dialog for creating new service requests */}
      <CreateServiceRequestDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onSuccess={handleCreateSuccess}
        // Pass IDs based on context
        locationId={entityType === 'location' ? entityId : undefined}
        serviceTypeId={entityType === 'serviceType' ? entityId : undefined}
        technicianId={entityType === 'technician' ? entityId : undefined}
        // Pass options lists
        statusOptions={statusOptions}
        serviceTypeOptions={serviceTypeOptions}
        locationOptions={formattedLocationOptions}
        technicianOptions={formattedTechOptions}
        // Hide selects based on context
        hideLocationSelect={entityType === 'location'}
        hideServiceTypeSelect={entityType === 'serviceType'}
        hideTechnicianSelect={false}
      />
    </div>
  )
}
