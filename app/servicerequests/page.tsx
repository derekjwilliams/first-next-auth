import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import MultipleServiceRequests from '@/components/MultipleServiceRequests'

export default async function ServiceRequestPage({
  params,
}: {
  params: { predicate: string }
}) {
  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting

  return <MultipleServiceRequests></MultipleServiceRequests>
}
