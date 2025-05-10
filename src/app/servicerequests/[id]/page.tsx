// src/app/servicerequests/[id]/page.tsx
import ServiceRequestDetail from '../../../components/ServiceRequestDetail'
type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  return <ServiceRequestDetail id={id}></ServiceRequestDetail>
}
