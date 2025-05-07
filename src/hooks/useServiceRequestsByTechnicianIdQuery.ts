// src/hooks/useServiceRequestsByTechnicianIdQuery
import { useQuery } from '@tanstack/react-query'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import useSupabase from './useSupabase'
import { getServiceRequestsByTechnicianId } from '../queries/getServiceRequestsByTechnicianId'
import { PostgrestError } from '@supabase/supabase-js'
import { ServiceRequestRow, ServiceRequestsResult } from '../types'

export interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
}

function useServiceRequestsByTechnicianIdQuery(technicianId: string, options: QueryOptions = {}) {
  const client = useSupabase()

  const queryKey = [
    'serviceRequests',
    'serviceRequestsByTechnicianId',
    technicianId,
    JSON.stringify(options.sorting?.map(s => ({ id: s.id, desc: s.desc })) ?? []),
    JSON.stringify(options.pagination ?? {}),
  ]

  const queryFn = async (): Promise<ServiceRequestsResult> => {
    try {
      // Build the count query with the same filters
      const countQuery = await client
        .from('service_requests')
        .select(`
          id,
          technicians:service_request_technicians!inner(
            technician_id
          )
        `, { count: 'exact', head: true }) // `head: true` avoids fetching row data
        .eq('technicians.technician_id', technicianId)
        .throwOnError()
      
      const countResult = await countQuery
      const totalCount = countResult.count || 0

      const result = await getServiceRequestsByTechnicianId(
        client, 
        {
          sorting: options.sorting,
          pagination: options.pagination
        },
        technicianId
      )
      const rawData = result.data as any[];
      
      const normalizedData: ServiceRequestRow[] = rawData.map((sr: any) => ({
        ...sr,
        technicians: sr.technicians.map((t: any) => t.technician),
      }))
      return {
        data: normalizedData,
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
    enabled: !!technicianId,
  })
}
    
export default useServiceRequestsByTechnicianIdQuery