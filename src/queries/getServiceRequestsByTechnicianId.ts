// src/queries/getServiceRequestsByTechnicianId.ts
import { SupabaseClient } from '@supabase/supabase-js'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import { Database } from '../utils/database.types'

export interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
  includeArchived?: boolean // To indicate if archived items should be included
  archivedStatusId?: string // The actual ID of the "Archived" status
}

const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE, 5)
  : 5

export async function getServiceRequestsByTechnicianId(
  supabase: SupabaseClient<Database>,
  options: QueryOptions = {},
  id: string,
) {
  const pageSize = options.pagination?.pageSize || DEFAULT_PAGE_SIZE
  const pageIndex = options.pagination?.pageIndex || 0

  // Now get the service requests with all their technicians
  const { data: serviceRequestIds } = await supabase
    .from('service_request_technicians')
    .select('service_request_id')
    .eq('technician_id', id)
    .throwOnError()

  if (!serviceRequestIds || serviceRequestIds.length === 0) {
    return {
      data: [],
      totalCount: 0,
    }
  }

  // Extract just the IDs
  const ids = serviceRequestIds.map((item) => item.service_request_id)

  // Now query the service requests with these IDs
  let query = supabase
    .from('service_requests')
    .select(
      `
      *,
      service_types(*),
      status:statuses(*),
      locations(*),
      technicians:service_request_technicians(
        technician:technicians(*)
      )
    `,
    )
    .in('id', ids)

  // Apply archived filter
  if (!options.includeArchived && options.archivedStatusId) {
    query = query.not('status_id', 'eq', options.archivedStatusId)
  }
  // Apply sorting
  if (options.sorting && options.sorting.length > 0) {
    const sort = options.sorting[0] // Use the first sort criteria
    if (sort.id === 'service_type') {
      query = query.order('service_types(service_name)', {
        ascending: !sort.desc,
      })
    } else if (sort.id === 'locations') {
      query = query.order('locations(street_address)', { ascending: !sort.desc })
      query = query.order('locations(unit_number)', { ascending: !sort.desc })
    } else {
      // For other columns, sort directly
      query = query.order(sort.id, { ascending: !sort.desc })
    }
  } else {
    // Default order if no sorting is specified
    query = query.order('description', { ascending: false })
  }

  // Apply pagination
  query = query.range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
  const result = await query.throwOnError()

  return {
    data: result?.data || [],
    // totalCount: count || 0,
  }
}
