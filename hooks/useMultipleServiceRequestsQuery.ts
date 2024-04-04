//hooks/useMultipleServiceRequestsQuery.ts
import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getMultipleServiceRequests } from '@/queries/getMultipleServiceRequests'

function useMultipleServiceRequestsQuery() {
  const client = useSupabase()
  const queryKey = ['service-requests']

  const queryFn = async () => {
    return getMultipleServiceRequests(client)?.then((result) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useMultipleServiceRequestsQuery
