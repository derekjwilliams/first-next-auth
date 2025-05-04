// src/hooks/useServiceRequestsByLocationIdQuery.ts
import { useQuery } from '@tanstack/react-query'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import useSupabase from './useSupabase'
import { getServiceRequestsByLocationId } from '../queries/getServiceRequestsByLocationId'
import { PostgrestError } from '@supabase/supabase-js' // Import PostgrestError
import { ServiceRequestsResult } from '../types'
import { useEffect } from 'react'

interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
}

function useServiceRequestsByLocationIdQuery(locationId: string, options: QueryOptions = {}) {
  const client = useSupabase()

  useEffect(() => {
    console.log('[Query Hook] locationId:', locationId)
  }, [locationId])
  const queryKey = [
  'serviceRequests',
  locationId,
  JSON.stringify(options.sorting?.map(s => ({ id: s.id, desc: s.desc })) ?? []),
  JSON.stringify(options.pagination ?? {}),
  ]
  const queryFn = async (): Promise<ServiceRequestsResult> => {
    if (!locationId) {
      return { data: [], totalCount: 0 }
    }
    try {
      // Get the total count first

      const countResult = await client
        .from('service_requests')
        .select('*', { count: 'exact', head: true })
        .eq('location_id', locationId!)

      const totalCount = countResult.count || 0

      const result = await getServiceRequestsByLocationId(client, locationId, {
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
    enabled: !!locationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export default useServiceRequestsByLocationIdQuery
