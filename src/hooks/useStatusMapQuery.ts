// src/hooks/useStatusMapQuery.ts
import { useQuery } from '@tanstack/react-query'
import { getStatusMap } from 'src/queries/getStatusMap'
import useSupabase from './useSupabase'

export function useStatusMapQuery() {
  const client = useSupabase()
  return useQuery({
    queryKey: ['statusMap'],
    queryFn: () => getStatusMap(client),
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}