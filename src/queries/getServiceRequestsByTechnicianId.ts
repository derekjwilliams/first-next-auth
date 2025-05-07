// src/queries/getServiceRequestsByTechnicianId
import { SupabaseClient } from '@supabase/supabase-js'
import { type SortingState, type PaginationState } from '@tanstack/react-table'
import { Database } from '../utils/database.types'

export interface QueryOptions {
  sorting?: SortingState
  pagination?: PaginationState
  includeArchived?: boolean; // To indicate if archived items should be included
  archivedStatusId?: string; // The actual ID of the "Archived" status
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
  // let query

  // if (options.sorting && options.sorting.length > 0) {
  //   const sort = options.sorting[0] // Use the first sort criteria
  //   if (sort.id === 'service_type') {
  //     query = supabase
  //     ?.from('service_requests')
  //       .select(`
  //         *,
  //         service_types(*),
  //         status:statuses(*),
  //         technicians:service_request_technicians!inner(
  //           technician_id,
  //           technician:technicians(*)
  //         )
  //       `)
  //       .eq('technicians.technician_id', id)
  //       .order('service_types(service_name)', { ascending: !sort.desc }) // Replace 'created_at' with your desired field
  //   } else if (sort.id === 'technicians') { // TODO, sort by first name of technician with the lexigraphically lower first name
  //     console.warn('Sorting by technicians is not supported')
  //     query = supabase
  //       ?.from('technicians')
  //       .select('service_requests(*, service_types(*), status:statuses(*), technicians(*))')
  //       .eq('id', id)
  //   } else {
  //     query = supabase
  //     ?.from('service_requests')
  //       .select(`
  //         *,
  //         service_types(*),
  //         status:statuses(*),
  //         technicians:service_request_technicians!inner(
  //           technician_id,
  //           technician:technicians(*)
  //         )
  //       `)
  //       .eq('technicians.technician_id', id)
  //       .order(sort.id, { ascending: !sort.desc }) 
  //   }
  // } else { // unordered
  //   query = supabase
  //     ?.from('service_requests')
  //       .select(`
  //         *,
  //         service_types(*),
  //         status:statuses(*),
  //         technicians:service_request_technicians!inner(
  //           technician_id,
  //           technician:technicians(*)
  //         )
  //       `)
  //       .eq('technicians.technician_id', id)
  //       .order('description', { ascending: false })
  // }
  
  // if (excludeArchived) {
  //   const archivedStatusId = await getArchivedStatusId(supabase);
  //   query = query.neq('status_id', archivedStatusId);
  //   //query = query.neq('status.status_name', 'closed');
  // }
  //   query = query.range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)
  //       .throwOnError();

  let query = supabase
    .from("service_requests")
    .select(
      `
      *,
      service_types(*),
      status:statuses(*),
      technicians:service_request_technicians!inner(
        technician_id,
        technician:technicians(*)
      )
    `,
    )
    .eq("technicians.technician_id", id);

  // Apply archived filter
  // If we are NOT including archived, and we have an ID for the archived status,
  // then filter out records with that status_id.
  if (!options.includeArchived && options.archivedStatusId) {
    query = query.not("status_id", "eq", options.archivedStatusId);
  }

  // Apply sorting
  if (options.sorting && options.sorting.length > 0) {
    const sort = options.sorting[0]; // Use the first sort criteria
    if (sort.id === "service_type") {
      query = query.order("service_types(service_name)", {
        ascending: !sort.desc,
        // foreignTable: 'service_types' // Not strictly needed if path is unique
      });
    } else if (sort.id === "technicians") {
      // Sorting by a joined/nested field like technician name directly in the main query
      // can be complex or not directly supported for ordering the primary table's rows.
      // Supabase's .order() typically works on columns of the 'from' table or direct foreign table paths.
      // For complex sorting (e.g., by a specific technician's name in a list),
      // you might need a database function/view or client-side sorting after fetching.
      // For now, we'll log a warning and apply a default sort or no sort.
      console.warn(
        "Sorting by 'technicians' (e.g., by technician name) is complex and not fully implemented here. Applying default sort.",
      );
      query = query.order("description", { ascending: false }) // Default sort
    } else {
      // Ensure sort.id is a valid column name for 'service_requests' table
      // or a valid path for a directly joined table if Supabase supports it for ordering.
      // Example: 'status_id' or 'description' from 'service_requests'
      query = query.order(sort.id, { ascending: !sort.desc })
    }
  } else {
    // Default order if no sorting is specified
    query = query.order("description", { ascending: false })
  }

  // Apply pagination
  query = query.range(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize - 1,
  )
  const result = await query.throwOnError()

  return {
    data: result?.data || []
  };
}
