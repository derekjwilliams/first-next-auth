//TODO, get the columns from supabase types export const columns: ColumnDef<Tables<'clients'>>  see https://stackoverflow.com/questions/78523722/using-tanstack-table-in-nextjs-typeerror-that-i-cannot-solve

type Technician = {
  id: string
  name: string
  email: string
}
type ServiceRequest = {
  //location_id	service_type_id	status_id	completed	id	steps
  id: string // UUID type
  description: string
  date_created: string
  date_updated: string
  technicians: Technician[]
}

type ServiceType = {
  id: string // UUID type
  service_name: string
}

type Tenant = {
  id: string // UUID type
  name: string
  email: string
}

export type { Technician, ServiceRequest, ServiceType, Tenant }
