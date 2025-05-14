// src/app/servicetypes/[id]/page.tsx
import ServiceTypeDetailsContainer from '../../../components/ServiceTypeDetailsContainer'
type Params = Promise<{ identifier: string }>
export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const identifier = resolvedParams.identifier

  return <ServiceTypeDetailsContainer serviceTypeIdentifier={identifier} />
}
