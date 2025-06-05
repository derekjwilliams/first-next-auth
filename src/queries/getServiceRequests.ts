// src/queries/getServiceRequests.ts
import { SupabaseClient } from '@supabase/supabase-js'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import { Database } from '../utils/database.types'

export interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
  includeArchived?: boolean
  archivedStatusId?: string
}

export interface FilterParams {
  locationId?: string
  technicianId?: string
  serviceTypeId?: string
  statusId?: string
}

const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE, 5)
  : 5

export async function getServiceRequests(
  supabase: SupabaseClient<Database>,
  filters: FilterParams = {},
  options: QueryOptions = {},
) {
  const pageSize = options.pagination?.pageSize || DEFAULT_PAGE_SIZE
  const pageIndex = options.pagination?.pageIndex || 0

  let query = supabase.from('service_requests').select(
    `
      *,
      service_types(*),
      status:statuses(*),
      technicians(*),
      locations(*)
    `,
  )

  if (filters.locationId) {
    query = query.eq('location_id', filters.locationId)
  }

  if (filters.serviceTypeId) {
    query = query.eq('service_type_id', filters.serviceTypeId)
  }

  if (filters.statusId) {
    query = query.eq('status_id', filters.statusId)
  }

  if (!options.includeArchived && options.archivedStatusId) {
    query = query.not('status_id', 'eq', options.archivedStatusId)
  }

  // Apply sorting if provided
  if (options.sorting && options.sorting.length > 0) {
    const sort = options.sorting[0] // Use the first sort criteria

    if (sort.id === 'service_type') {
      query = query.order('service_types(service_name)', {
        ascending: !sort.desc,
      })
    } else if (sort.id === 'locations') {
      query = query.order('locations(street_address), locations(unit_number)', {
        ascending: !sort.desc,
      })
    } else {
      query = query.order(sort.id, { ascending: !sort.desc })
    }
  }

  query = query.range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
  return await query
}
// For backward compatibility
export async function getServiceRequestsByLocationId(
  supabase: SupabaseClient<Database>,
  locationId: string,
  options: QueryOptions = {},
) {
  return getServiceRequests(supabase, { locationId }, options)
}
