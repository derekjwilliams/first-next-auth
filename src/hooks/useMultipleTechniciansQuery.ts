import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getMultipleTechnicians } from '@/queries/getMultipleTechnicians'

function useMultipleTechniciansQuery() {
  const client = useSupabase()
  const queryKey = ['technicians']

  const queryFn = async () => {
    return getMultipleTechnicians(client)?.then((result) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useMultipleTechniciansQuery
