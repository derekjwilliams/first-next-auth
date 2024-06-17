import ServiceRequestTable from '@/components/ServiceRequestTable'
import ServiceRequestTableSkeleton from '@/components/ServiceRequestTableSkeleton'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'
// interface PageProps { // TODO add filtering
//   searchParams: { page?: string }
// }

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
  const pageSize = 5 // Define the number of items per page

  //   const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1
  const sortColumn = searchParams?.sortColumn || 'id'
  const sortDirection = searchParams?.sortDirection || 'asc'

  const { data: serviceRequests, count } = await supabase
    .from('service_requests')
    .select('*, technicians(id, name, email)', { count: 'exact' })
    // .eq(`id`, 'ba9c1ee3-644f-4d83-b2b8-c592edd35ae4')
    .order(sortColumn, { ascending: sortDirection === 'asc' })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

  console.log(serviceRequests)
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
