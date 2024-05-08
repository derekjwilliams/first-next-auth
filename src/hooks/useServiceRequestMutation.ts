//hooks/useServiceRequestMutation.ts
import { useMutation } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { addServiceRequest } from '@/queries/addServiceRequest'
import { Database } from '@/utils/database.types'
type ServiceRequest = Database['public']['Tables']['service_requests']['Row']

function useServiceRequestMutation(value: ServiceRequest) {
  const client = useSupabase()

  const mutationFn = async () => {
    return addServiceRequest(client, value)?.then((result) => result.data)
  }
  return useMutation({ mutationFn })
}

export default useServiceRequestMutation
