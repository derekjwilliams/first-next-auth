// src/hooks/useServiceRequestsByLocationIdQuery.ts
import { useQuery } from '@tanstack/react-query'
import { type SortingState } from '@tanstack/react-table'
import useSupabase from './useSupabase'
import { getServiceRequestsByLocationId } from '../queries/getServiceRequestsByLocationId'
import { PostgrestError } from '@supabase/supabase-js' // Import PostgrestError
import { useEffect } from 'react'

interface QueryOptions {
  sorting?: SortingState
  pageSize?: number
}

interface ServiceRequestsResult {
  data: any[] // TODO: Replace with proper type
  totalCount: number
}

function useServiceRequestsByLocationIdQuery(locationId: string, options: QueryOptions = {}) {
  const client = useSupabase()
  const id = locationId
  const queryKey = ['serviceRequests', locationId, options.sorting]
  const pageSize = options.sorting?.length ? 2 : undefined // Only limit if sorting is applied

  useEffect(() => {
    console.log('Query key changed:', JSON.stringify(queryKey))
  }, [JSON.stringify(queryKey)])

  const queryFn = async (): Promise<ServiceRequestsResult> => {
    try {
      // Get the total count first
      const countResult = await client
        .from('service_requests')
        .select('*', { count: 'exact', head: true })
        .eq('location_id', id!)

      const totalCount = countResult.count || 0

      // Then get the data with sorting and pagination
      const result = await getServiceRequestsByLocationId(client, id!, {
        sorting: options.sorting,
        pageSize: 10,
      })

      return {
        data: [...(result?.data || [])],
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
  })
}

export default useServiceRequestsByLocationIdQuery
