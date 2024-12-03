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