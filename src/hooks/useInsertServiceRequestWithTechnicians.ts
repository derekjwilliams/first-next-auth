import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query'
import { createBrowserClient } from '@supabase/ssr'

const client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface InsertServiceRequestParams {
  description: string
  technicianIds: string[]
  completed: boolean | null
  details: string | null
  locationId: string
  requestedBy: string | null
  serviceTypeId: string
  statusId: string | null
}

const insertServiceRequestWithTechnicians = async (params: InsertServiceRequestParams): Promise<any> => {
  const {
    data: { user },
  } = await client.auth.getUser()

  let reqBy
  if (params.requestedBy) {
    reqBy = params.requestedBy
  } else {
    if (user) {
      reqBy = user.id
    } else {
      reqBy = params.requestedBy
    }
  }

  const { data, error } = await client.rpc('insert_service_request_with_technicians', {
    service_description: params.description,
    technician_ids: params.technicianIds,
    completed: params.completed,
    details: params.details,
    location_id: params.locationId,
    requested_by: reqBy,
    service_type_id: params.serviceTypeId,
    status_id: params.statusId,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const useInsertServiceRequestWithTechnicians = () => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, InsertServiceRequestParams>({
    mutationFn: insertServiceRequestWithTechnicians,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['insert-service-requests-with-technicians'] })
    },
  })
}
