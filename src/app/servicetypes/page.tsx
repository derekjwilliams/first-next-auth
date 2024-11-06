import ServiceTypeTable from '@/components/ServiceTypeTable'
import ServiceTypeTableSkeleton from '@/components/ServiceTypeTableSkeleton'
//import { createClient } from '@/lib/supabase/client'
import { createClient } from '@/utils/supabase/client'
import { Suspense } from 'react'
// interface PageProps {
//   searchParams: { page?: string }
// }

type SearchParams = Promise<{
  sortColumn?: string | string[] | undefined
  sortDirection?: 'asc' | 'desc' | undefined
  page?: string | string[] | undefined
}>

// See https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient()
  const resolvedSearchParams = await searchParams
  const pageSize = 10

  const currentPage = Number(resolvedSearchParams?.page) || 1

  const sortColumn =
    (Array.isArray(resolvedSearchParams.sortColumn)
      ? resolvedSearchParams.sortColumn[0]
      : resolvedSearchParams.sortColumn) ?? 'id'

  const sortDirection =
    (Array.isArray(resolvedSearchParams.sortDirection)
      ? resolvedSearchParams.sortDirection[0]
      : resolvedSearchParams.sortDirection) ?? 'asc'

  const page =
    (Array.isArray(resolvedSearchParams.page) ? resolvedSearchParams.page[0] : resolvedSearchParams.page) ?? 1

  const fetchServiceTypes = async () => {
    const { data, count, error } = await supabase
      .from('service_types')
      .select('*', { count: 'exact' })
      .order(sortColumn, { ascending: sortDirection === 'asc' })
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

    if (error) throw error
    return { data: data || [], count: count || 0 }
  }
  const { data: serviceTypes, count } = await fetchServiceTypes()

  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <div>
      <h1>Service Types Table</h1>
      <Suspense key={'' + currentPage + sortDirection + sortColumn} fallback={<ServiceTypeTableSkeleton />}>
        <ServiceTypeTable
          data={serviceTypes || []}
          count={count}
          currentPage={currentPage}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  )
}
