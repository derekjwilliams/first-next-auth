import ServiceRequestTable from '@/components/ServiceRequestTable'
import ServiceRequestTableSkeleton from '@/components/ServiceRequestTableSkeleton'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'

// See https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    //   query?: string; // TODO add filtering
    sortColumn?: string
    sortDirection?: string
    page?: string
  }
}) {
  const supabase = await createClient()
  const pageSize = 5

  const currentPage = Number(searchParams?.page) || 1
  const sortColumn = searchParams?.sortColumn || 'id'
  const sortDirection = searchParams?.sortDirection || 'asc'

  const { data: serviceRequests, count } = await supabase
    .from('service_requests')
    .select('*, technicians(id, name, email)', { count: 'exact' })
    .order(sortColumn, { ascending: sortDirection === 'asc' })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <div>
      <Suspense key={'' + currentPage + sortDirection + sortColumn} fallback={<ServiceRequestTableSkeleton />}>
        <ServiceRequestTable
          data={serviceRequests || []}
          currentPage={currentPage}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  )
}
