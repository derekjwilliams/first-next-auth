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
  let sortColumn = searchParams?.sortColumn || 'id'
  const sortDirection = searchParams?.sortDirection || 'asc'

  let serviceRequests
  let serviceRequestsCount = 0

  if (sortColumn === 'service_types') {
    let { data: sr, count } = await supabase
      .from('service_requests')
      .select('*, technicians(id, name, email), service_types(id, service_name), tenants(*)', { count: 'exact' })
      .order('service_types(service_name)', { ascending: sortDirection === 'asc' })
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
    serviceRequests = sr
    serviceRequestsCount = count || 0
  } else {
    let { data: sr, count } = await supabase
      .from('service_requests')
      .select('*, technicians(id, name, email), service_types(id, service_name), tenants(*)', { count: 'exact' })
      .order(sortColumn, { ascending: sortDirection === 'asc' })
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
    serviceRequests = sr
    serviceRequestsCount = count || 0
  }

  const totalPages = Math.ceil(serviceRequestsCount / pageSize)
  return (
    <div>
      <Suspense key={'' + currentPage + sortDirection + sortColumn} fallback={<ServiceRequestTableSkeleton />}>
        <ServiceRequestTable
          data={serviceRequests || []}
          currentPage={currentPage}
          totalPages={totalPages}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
      </Suspense>
    </div>
  )
}
