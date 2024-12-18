import ServiceRequestTable from '../../components/ServiceRequestTable'
import ServiceRequestTableSkeleton from '../../components/ServiceRequestTableSkeleton'
import { createClient } from '../../lib/supabase/client'
import stylex from '@stylexjs/stylex'
import { Suspense } from 'react'
import { marigoldColors } from '../customStyles/marigoldColors.stylex'

const styles = stylex.create({
  tableWrapper: {
    backgroundColor: marigoldColors.backgroundData,
  },
})

type SearchParams = Promise<{
  sortColumn?: string | string[] | undefined
  sortDirection?: string | string[] | undefined
  page?: string | string[] | undefined
}>

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient()

  const resolvedSearchParams = await searchParams

  const sortColumn = Array.isArray(resolvedSearchParams.sortColumn)
    ? resolvedSearchParams.sortColumn[0]
    : resolvedSearchParams.sortColumn || ''

  const sortDirection = Array.isArray(resolvedSearchParams.sortDirection)
    ? resolvedSearchParams.sortDirection[0]
    : resolvedSearchParams.sortDirection || 'asc'

  const page = Array.isArray(resolvedSearchParams.page)
    ? Number(resolvedSearchParams.page[0])
    : Number(resolvedSearchParams.page) || 1

  const pageSize = 25
  const currentPage = page

  let serviceRequestsCount = 0
  let sortedBy = 'statuses(status_name)'

  switch (sortColumn) {
    case 'status':
      sortedBy = 'statuses(status_name)'
      break
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
      sortedBy = Array.isArray(sortColumn) ? sortColumn[0] : sortColumn || 'locations(street_address)'
  }

  let { data: serviceRequests, count } = await supabase
    .from('service_requests')
    .select(
      '*, technicians(id, name, email), service_types(id, service_name), tenants(*), statuses(*), locations(id, street_address, unit_number)',
      {
        count: 'exact',
      },
    )
    .order(sortedBy, { ascending: sortDirection === 'asc' })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
  serviceRequestsCount = count || 0

  const totalPages = Math.ceil(serviceRequestsCount / pageSize)
  return (
    <div {...stylex.props(styles.tableWrapper)}>
      <Suspense key={'' + currentPage + sortDirection + sortedBy} fallback={<ServiceRequestTableSkeleton />}>
        <ServiceRequestTable
          data={serviceRequests || []}
          currentPage={currentPage}
          totalPages={totalPages}
          sortColumn={sortedBy}
          sortDirection={sortDirection}
        />
      </Suspense>
    </div>
  )
}
