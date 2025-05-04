// src/types/index.ts
import { Database, Tables } from '@/utils/database.types'
type ServiceRequest = Tables<'service_requests'>
export type ServiceType = Tables<'service_types'>

export type ServiceRequestsWithPagination = {
  data: ServiceRequest[]
  count: number
  currentPage: number
  totalPages: number
  sortColumn: string
  sortDirection: 'asc' | 'desc'
}
export type ServiceTypesWithPagination = {
  data: ServiceType[]
  count: number
  currentPage: number
  totalPages: number
  sortColumn: string
  sortDirection: 'asc' | 'desc'
}
export type ServiceRequestMutationInput = Partial<Tables<'service_requests'>>

export type ServiceRequestRow = Database['public']['Tables']['service_requests']['Row'] & {
  service_types: Database['public']['Tables']['service_types']['Row'] | null
  technicians: Database['public']['Tables']['technicians']['Row'][]
}

export interface ServiceRequestsResult {
  data: ServiceRequestRow[]
  totalCount: number
}
