//hooks/useMultipleServiceRequestsQuery.ts
import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getMultipleServiceRequests } from '@/queries/getMultipleServiceRequests'
interface ServiceTypeProps {
  // hack, should be about to use ServiceRequest type with just one param specified
  service_type_id: string | null
}

function useMultipleServiceRequestsQuery({ service_type_id }: ServiceTypeProps) {
  const client = useSupabase()
  const queryKey = ['service-requests']

  const queryFn = async () => {
    return getMultipleServiceRequests(client, service_type_id!)?.then((result) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useMultipleServiceRequestsQuery
