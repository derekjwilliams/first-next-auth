//src/hooks/useLocationQuery.ts
import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getLocationById } from '../queries/getLocationById'

export function useLocationsQuery() {
  const client = useSupabase()

  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await client.from('locations').select('*').order('location_name')

      if (error) throw error

      return data || []
    },
  })
}

export function useLocationQuery(locationId: string) {
  const client = useSupabase()
  const id = locationId

  const queryKey = ['location', id]

  const queryFn = async () => {
    const result = await getLocationById(client, id!)

    if (result.error || !result.data) {
      throw new Error(result.error?.message || 'Location not found')
    }

    return result.data
  }

  return useQuery({ queryKey, queryFn })
}
