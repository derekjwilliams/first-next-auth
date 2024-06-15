//TODO, get the columns from supabase types export const columns: ColumnDef<Tables<'clients'>>  see https://stackoverflow.com/questions/78523722/using-tanstack-table-in-nextjs-typeerror-that-i-cannot-solve

export type ServiceType = {
  id: string // UUID type
  service_name: string
}
