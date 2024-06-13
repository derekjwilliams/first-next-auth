import { useMutation } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { addServiceRequest } from '@/queries/addServiceRequest'
import { Tables } from '@/utils/database.types'
type ServiceRequest = Tables<'service_requests'>

function useServiceRequestMutation(value: ServiceRequest) {
  const client = useSupabase()

  const mutationFn = async () => {
    return addServiceRequest(client, value)?.then((result) => result.data)
  }
  return useMutation({ mutationFn })
}

export default useServiceRequestMutation
