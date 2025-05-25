// src/types/index.ts
import { Tables } from '@/utils/database.types'
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

export type ServiceRequestRow = Tables<'service_requests'> & {
  service_types: Tables<'service_types'> | null
  technicians: Tables<'technicians'>[]
  locations: Tables<'locations'>
}

export interface ServiceRequestsResult {
  data: ServiceRequestRow[]
  totalCount: number
}

export type ServiceRequestForTechnicianRow = Tables<'service_requests'> & {
  service_types: Tables<'service_types'> | null
  technicians: Tables<'technicians'>[]
}

export interface ServiceRequestsForTechnicianResult {
  data: ServiceRequestForTechnicianRow[]
  totalCount: number
}
