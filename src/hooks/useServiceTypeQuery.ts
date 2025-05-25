import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getServiceTypeById } from '../queries/getServiceTypeById'

export function useServiceTypeById(serviceTypeId: string) {
  const client = useSupabase()
  const queryKey = ['serviceType', 'byId', , serviceTypeId]
  const queryFn = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getServiceTypeById(client, serviceTypeId!)?.then((result: { data: any }) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export function useServiceTypeByName(serviceName: string | null) {
  const client = useSupabase()

  return useQuery({
    queryKey: ['serviceType', 'byName', serviceName],
    queryFn: async () => {
      if (!serviceName) throw new Error('Service name is required')

      const { data, error } = await client.from('service_types').select('id').eq('service_name', serviceName).single()

      if (error) throw error
      return data
    },
    enabled: !!serviceName,
    staleTime: 60 * 60 * 24000, // 1 day - since service types rarely change
  })
}

export function useServiceTypesQuery() {
  const client = useSupabase()

  return useQuery({
    queryKey: ['serviceTypes'],
    queryFn: async () => {
      const { data, error } = await client.from('service_types').select('*').order('service_name')

      if (error) throw error

      return data || []
    },
  })
}
