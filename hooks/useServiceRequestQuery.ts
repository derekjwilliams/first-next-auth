import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getServiceRequestById } from '@/queries/getServiceRequestById'

function useServiceRequestQuery(serviceRequestId: string) {
  const client = useSupabase()
  const id = serviceRequestId
  const queryKey = ['service-request', id]

  const queryFn = async () => {
    return getServiceRequestById(client, id!)?.then((result) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useServiceRequestQuery
