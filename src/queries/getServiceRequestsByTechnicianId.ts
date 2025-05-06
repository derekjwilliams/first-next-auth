// src/queries/getServiceRequestsByTechnicianId
import { SupabaseClient } from '@supabase/supabase-js'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import { Database } from '../utils/database.types'

export interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
}

const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE, 5)
  : 5

export async function getServiceRequestsByTechnicianId(
  supabase: SupabaseClient<Database>, 
  options: QueryOptions = {},
  id: string) {

  const pageSize = options.pagination?.pageSize || DEFAULT_PAGE_SIZE
  const pageIndex = options.pagination?.pageIndex || 0
  let query

  if (options.sorting && options.sorting.length > 0) {
    const sort = options.sorting[0] // Use the first sort criteria
    if (sort.id === 'service_type') {
      query = supabase
      ?.from('service_requests')
        .select(`
          *,
          service_types(*),
          technicians:service_request_technicians!inner(
            technician_id,
            technician:technicians(*)
          )
        `)
        .eq('technicians.technician_id', id)
        .order('service_types(service_name)', { ascending: !sort.desc }) // Replace 'created_at' with your desired field
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .throwOnError();
    } else if (sort.id === 'technicians') {
      console.warn('Sorting by technicians is not supported')
      query = supabase
        ?.from('technicians')
        .select('service_requests(*, service_types(*), technicians(*))')
        .eq('id', id)
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .throwOnError()
        .single();
    } else {
      query = supabase
      ?.from('service_requests')
        .select(`
          *,
          service_types(*),
          technicians:service_request_technicians!inner(
            technician_id,
            technician:technicians(*)
          )
        `)
        .eq('technicians.technician_id', id)
        .order(sort.id, { ascending: !sort.desc }) // Replace 'created_at' with your desired field
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .throwOnError();

    }
  } else { // unordered
    query = supabase
      ?.from('service_requests')
        .select(`
          *,
          service_types(*),
          technicians:service_request_technicians!inner(
            technician_id,
            technician:technicians(*)
          )
        `)
        .eq('technicians.technician_id', id)
        .order('description', { ascending: false }) // Replace 'created_at' with your desired field
        .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
        .throwOnError();
  }
  
  const result = await query;

  return {
    data: result?.data || []
  };
}
