// src/queries/getServiceRequestsByLocationId.ts
import { SupabaseClient } from '@supabase/supabase-js'
import { type SortingState } from '@tanstack/react-table'
import { Database } from '../utils/database.types' // Adjust import path as needed

interface QueryOptions {
  sorting?: SortingState
  pageSize?: number
}

export async function getServiceRequestsByLocationId(
  supabase: SupabaseClient<Database>,
  locationId: string,
  options: QueryOptions = {},
) {
  let query = supabase
    .from('service_requests')
    .select(
      `
      *,
      service_types (*),
      technicians (*)
    `,
    )
    .eq('location_id', locationId)

  // Apply sorting if provided
  if (options.sorting && options.sorting.length > 0) {
    const sort = options.sorting[0] // Use the first sort criteria

    // Handle special cases for relations
    if (sort.id === 'service_type') {
      query = query.order('service_types(service_name)', { ascending: sort.desc === false })
    } else if (sort.id === 'technicians') {
      // Sorting by technicians might be complex - you may need a different approach
      console.warn('Sorting by technicians is not supported')
    } else {
      query = query.order(sort.id, { ascending: sort.desc === false })
    }
  }

  // Apply limit if specified
  if (options.pageSize) {
    query = query.limit(options.pageSize)
  }

  return await query
}
