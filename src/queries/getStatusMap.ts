// src/queries/getStatusMap.ts
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../utils/database.types'

export async function getStatusMap(client: SupabaseClient<Database>) {
  const { data, error } = await client
    .from('statuses')
    .select('id, status_name')

  if (error || !data) {
    throw new Error('Failed to fetch status map')
  }

  const map: Record<string, string> = {}
  for (const status of data) {
    map[status.id] = status.status_name
  }

  return map
}
