// src/hooks/useServiceRequestQuery.ts
import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getServiceRequestById } from '../queries/getServiceRequestById'

function useServiceRequestQuery(serviceRequestId: string) {
  const client = useSupabase()
  const id = serviceRequestId
  const queryKey = ['service-request', id]

  const queryFn = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getServiceRequestById(client, id!)?.then((result: { data: any }) => result.data)
  }
  return useQuery({ queryKey, queryFn, staleTime: 10 * 1000 }) // 10 second stale time
}

export default useServiceRequestQuery
