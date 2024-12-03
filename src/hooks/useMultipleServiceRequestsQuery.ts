import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getMultipleServiceRequests } from '@/queries/getMultipleServiceRequests'

function useMultipleServiceRequestsQuery({ serviceTypeId }: { serviceTypeId: string }) {
  const client = useSupabase()
  const queryKey = ['service-requests']

  const queryFn = async () => {
    return getMultipleServiceRequests(client, serviceTypeId!)?.then((result: { data: any }) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useMultipleServiceRequestsQuery
