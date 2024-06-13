import ServiceRequestDetail from '@/components/ServiceRequestDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id

  return <ServiceRequestDetail id={id}></ServiceRequestDetail>
}
