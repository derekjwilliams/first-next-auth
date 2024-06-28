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
  const pageSize = 10

  const currentPage = Number(searchParams?.page) || 1
  let sortColumn = searchParams?.sortColumn || 'id'
  const sortDirection = searchParams?.sortDirection || 'asc'

  let serviceRequestsCount = 0
  let sortedBy = ''

  switch (sortColumn) {
    case 'service_types':
      sortedBy = 'service_types(service_name)'
      break
    case 'statuses':
      sortedBy = 'statuses(status_name)'
      break
    case 'locations':
      sortedBy = 'locations(street_address)'
      break
    default:
      sortedBy = sortColumn
  }

  let { data: serviceRequests, count } = await supabase
    .from('service_requests')
    .select(
      '*, technicians(id, name, email), service_types(id, service_name), tenants(*), statuses(*), locations(id, street_address, unit_number)',
      {
        count: 'exact',
      }
    )
    .order(sortedBy, { ascending: sortDirection === 'asc' })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
  serviceRequestsCount = count || 0

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
