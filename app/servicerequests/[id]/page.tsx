import ServiceRequestDetail from '@/components/ServiceRequestDetail'

export default async function ServiceRequestPage({
  params,
}: {
  params: { id: number }
}) {
  const id = params.id

  return <ServiceRequestDetail id={id}></ServiceRequestDetail>
}
