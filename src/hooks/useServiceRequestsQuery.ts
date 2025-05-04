// src/hooks/useServiceRequestsQuery.ts
import { useQuery } from '@tanstack/react-query'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import useSupabase from './useSupabase'
import { getServiceRequests, FilterParams } from '../queries/getServiceRequests'
import { PostgrestError } from '@supabase/supabase-js'
import { ServiceRequestsResult } from '../types'
import { useEffect } from 'react'

export interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
}

function useServiceRequestsQuery(filters: FilterParams = {}, options: QueryOptions = {}) {
  const client = useSupabase()

  useEffect(() => {
    console.log('[Query Hook] filters:', filters)
    if (options.sorting) {
      console.log('[Query Hook] sorting:', options.sorting)
    }
  }, [filters, options.sorting])

  const queryKey = [
    'serviceRequests',
    JSON.stringify(filters),
    JSON.stringify(options.sorting?.map(s => ({ id: s.id, desc: s.desc })) ?? []),
    JSON.stringify(options.pagination ?? {}),
  ]

  const queryFn = async (): Promise<ServiceRequestsResult> => {
    // Skip if no filters are provided
    if (Object.keys(filters).length === 0) {
      return { data: [], totalCount: 0 }
    }

    try {
      // Build the count query with the same filters
      let countQuery = client.from('service_requests').select('*', { count: 'exact', head: true })
      
      if (filters.locationId) {
        countQuery = countQuery.eq('location_id', filters.locationId)
      }
      
      if (filters.technicianId) {
        countQuery = countQuery.contains('technicians.id', [filters.technicianId])
      }
      
      if (filters.serviceTypeId) {
        countQuery = countQuery.eq('service_type_id', filters.serviceTypeId)
      }
      
      if (filters.statusId) {
        countQuery = countQuery.eq('status_id', filters.statusId)
      }

      const countResult = await countQuery
      const totalCount = countResult.count || 0

      const result = await getServiceRequests(client, filters, {
        sorting: options.sorting,
        pagination: options.pagination,
      })

      return {
        data: result.data ?? [],
        totalCount,
      }
    } catch (error) {
      console.error('Error fetching service requests:', error)
      if (error instanceof Error) {
        throw error
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        throw new Error(String((error as PostgrestError).message || 'Unknown error fetching service requests'))
      } else {
        throw new Error('An unknown error occurred while fetching service requests.')
      }
    }
  }

  return useQuery<ServiceRequestsResult>({
    queryKey,
    queryFn,
    enabled: Object.keys(filters).length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export default useServiceRequestsQuery

// For backward compatibility and convenience, create specialized hooks
export function useServiceRequestsByLocationId(locationId: string, options: QueryOptions = {}) {
  return useServiceRequestsQuery({ locationId }, options)
}

export function useServiceRequestsByTechnicianId(technicianId: string, options: QueryOptions = {}) {
  return useServiceRequestsQuery({ technicianId }, options)
}

export function useServiceRequestsByServiceTypeId(serviceTypeId: string, options: QueryOptions = {}) {
  return useServiceRequestsQuery({ serviceTypeId }, options)
}

export function useServiceRequestsByStatusId(statusId: string, options: QueryOptions = {}) {
  return useServiceRequestsQuery({ statusId }, options)
}
