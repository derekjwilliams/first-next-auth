// src/hooks/useServiceRequestsQuery.ts
import { useQuery } from '@tanstack/react-query'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import useSupabase from './useSupabase'
import { getServiceRequests, FilterParams } from '../queries/getServiceRequests'
import { ServiceRequestsResult } from '../types'
import { useMemo } from 'react'

export interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
  includeArchived?: boolean
}

const findArchivedStatusId = (statusMap: Record<string, string> | undefined): string | undefined => {
  if (!statusMap) return undefined
  for (const id in statusMap) {
    if (statusMap[id].toLowerCase() === 'archived') {
      return id
    }
  }
  return undefined
}

function useServiceRequestsQuery(
  filters: FilterParams = {},
  options: QueryOptions = {},
  statusMap: Record<string, string> | undefined,
  statusMapLoading: boolean,
) {
  const client = useSupabase()

  const { sorting, pagination, includeArchived = false } = options

  const archivedStatusId = useMemo(() => findArchivedStatusId(statusMap), [statusMap])

  const queryKey = [
    'multipleServiceRequests',
    JSON.stringify(filters),
    JSON.stringify(sorting?.map((s) => ({ id: s.id, desc: s.desc })) ?? []),
    JSON.stringify(pagination ?? {}),
    `includeArchived:${includeArchived}`,
    `archivedStatusId:${archivedStatusId ?? 'none'}`,
  ]

  const queryFn = async (): Promise<ServiceRequestsResult> => {
    // This initial check can remain or be adjusted based on desired behavior for empty filters
    if (Object.keys(filters).length === 0 && !includeArchived) {
      // If no filters and we are not specifically asked to include archived
      // (which might imply fetching all non-archived), this could be a valid scenario.
      // For now, let's assume it means "don't fetch yet".
      return { data: [], totalCount: 0 }
    }

    // Short-circuit if trying to filter by 'Archived' status but also excluding archived items.
    if (!includeArchived && archivedStatusId && filters.statusId === archivedStatusId) {
      console.warn("Query contradiction: Filtering by 'Archived' status while also excluding archived items.")
      return { data: [], totalCount: 0 }
    }

    try {
      // --- Build the count query progressively ---
      let countQueryBuilder = client.from('service_requests').select('*', { count: 'exact', head: true }) // Select can be minimal like 'id'

      // Apply standard filters from 'filters' object
      if (filters.locationId) {
        countQueryBuilder = countQueryBuilder.eq('location_id', filters.locationId)
      }
      if (filters.serviceTypeId) {
        countQueryBuilder = countQueryBuilder.eq('service_type_id', filters.serviceTypeId)
      }

      // Apply status filtering logic for the count
      if (filters.statusId) {
        // If a specific statusId is provided in filters, it takes precedence.
        // The contradiction (filters.statusId IS archivedStatusId AND !includeArchived)
        // is handled by the short-circuit above.
        countQueryBuilder = countQueryBuilder.eq('status_id', filters.statusId)
      } else if (!includeArchived && archivedStatusId) {
        // If no specific statusId filter from 'filters',
        // but we need to exclude archived items (and we know the archivedStatusId).
        countQueryBuilder = countQueryBuilder.not('status_id', 'eq', archivedStatusId)
      }
      // If includeArchived is true AND no filters.statusId, then no status-specific
      // filter is applied here for the count (it counts all statuses matching other filters).
      // --- End of count query building ---

      const countResult = await countQueryBuilder.throwOnError()
      const totalCount = countResult.count || 0

      if (totalCount === 0) {
        return { data: [], totalCount: 0 }
      }

      // Call getServiceRequests, passing all necessary options
      const result = await getServiceRequests(
        client,
        filters, // Original filters from the hook's parameters
        {
          // Options for getServiceRequests
          sorting: sorting,
          pagination: pagination,
          includeArchived: includeArchived,
          archivedStatusId: archivedStatusId,
        },
      )

      return {
        data: result.data ?? [],
        totalCount,
      }
    } catch (error) {
      console.error('Error fetching service requests:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unknown error occurred while fetching service requests.')
    }
  }

  return useQuery<ServiceRequestsResult>({
    queryKey,
    queryFn,
    enabled: Object.keys(filters).length > 0 && !statusMapLoading,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export default useServiceRequestsQuery

// For backward compatibility and convenience, create specialized hooks
export function useServiceRequestsByLocationId(
  locationId: string,
  options: QueryOptions = {},
  statusMap: Record<string, string> | undefined,
  statusMapLoading: boolean,
) {
  return useServiceRequestsQuery({ locationId }, options, statusMap, statusMapLoading)
}

export function useServiceRequestsByServiceTypeId(
  serviceTypeId: string,
  options: QueryOptions = {},
  statusMap: Record<string, string> | undefined,
  statusMapLoading: boolean,
) {
  return useServiceRequestsQuery({ serviceTypeId }, options, statusMap, statusMapLoading)
}

export function useServiceRequestsByStatusId(
  statusId: string,
  options: QueryOptions = {},
  statusMap: Record<string, string> | undefined,
  statusMapLoading: boolean,
) {
  return useServiceRequestsQuery({ statusId }, options, statusMap, statusMapLoading)
}
