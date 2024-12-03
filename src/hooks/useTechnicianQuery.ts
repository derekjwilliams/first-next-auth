import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getTechnicianById } from '@/queries/getTechnicianById'

function useTechnicianQuery(technicianId: string) {
  const client = useSupabase()
  const id = technicianId
  const queryKey = ['technician', id]

  const queryFn = async () => {
    return getTechnicianById(client, id!)?.then((result: { data: any }) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useTechnicianQuery
