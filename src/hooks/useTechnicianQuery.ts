import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getTechnicianById } from '../queries/getTechnicianById'

function useTechnicianQuery(technicianId: string) {
  const client = useSupabase()
  const id = technicianId
  const queryKey = ['technician', id]

  const queryFn = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getTechnicianById(client, id!)?.then((result: { data: any }) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export function useTechniciansQuery() {
  const client = useSupabase()

  return useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await client.from('technicians').select('*').order('name')

      if (error) throw error

      return data || []
    },
  })
}

export default useTechnicianQuery
