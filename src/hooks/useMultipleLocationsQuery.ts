import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getMultipleLocations } from '@/queries/getMultipleLocations'

function useMultipleLocationsQuery() {
  const client = useSupabase()
  const queryKey = ['locations']

  const queryFn = async () => {
    return getMultipleLocations(client)?.then((result) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useMultipleLocationsQuery
