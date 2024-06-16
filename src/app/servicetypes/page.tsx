import ServiceTypeTable from '@/components/ServiceTypeTable'
import ServiceTypeTableSkeleton from '@/components/ServiceTypeTableSkeleton'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'
interface PageProps {
  searchParams: { page?: string }
}

// See https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    //   query?: string;
    sortColumn?: string
    sortDirection?: string
    page?: string
  }
}) {
  const supabase = await createClient()
  const pageSize = 10 // Define the number of items per page

  //   const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1
  const sortColumn = searchParams?.sortColumn || 'id'
  const sortDirection = searchParams?.sortDirection || 'asc'

  const { data: serviceTypes, count } = await supabase
    .from('service_types')
    .select('*', { count: 'exact' })
    .order(sortColumn, { ascending: sortDirection === 'asc' })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <div>
      <h1>Service Types Table</h1>
      <Suspense key={'' + currentPage + sortDirection + sortColumn} fallback={<ServiceTypeTableSkeleton />}>
        <ServiceTypeTable
          data={serviceTypes || []}
          currentPage={currentPage}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  )
}
