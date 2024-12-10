import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getLocationById } from '../queries/getLocationById'

function useLocationQuery(locationId: string) {
  const client = useSupabase()
  const id = locationId

  const queryKey = ['location', id]

  const queryFn = async () => {
    return getLocationById(client, id!)?.then((result: { data: any }) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useLocationQuery
