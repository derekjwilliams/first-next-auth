import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getLocationById } from '../queries/getLocationById'

function useLocationQuery(locationId: string) {
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

export default useLocationQuery
