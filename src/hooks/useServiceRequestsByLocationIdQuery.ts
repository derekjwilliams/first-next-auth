// src/hooks/useServiceRequestsByLocationIdQuery.ts
import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import {
  getServiceRequestsByLocationId,
  // ServiceRequestWithTechnicians,// TODO this should work
} from '../queries/getServiceRequestsByLocationId'
import { PostgrestError } from '@supabase/supabase-js' // Import PostgrestError

function useServiceRequestsByLocationIdQuery(locationId: string) {
  const client = useSupabase()
  const id = locationId
  const queryKey = ['serviceRequests', id]

  const queryFn = async (): Promise<any[]> => {
    //TODO don't use any
    try {
      const result = await getServiceRequestsByLocationId(client, id!)
      if (result) return result.data || []
      else return []
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

  return useQuery<any[]>({
    //TODO don't use any
    queryKey,
    queryFn,
    enabled: !!locationId,
  })
}

export default useServiceRequestsByLocationIdQuery
