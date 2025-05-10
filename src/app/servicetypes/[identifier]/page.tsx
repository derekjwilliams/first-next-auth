// src/app/servicetypes/[id]/page.tsx
import ServiceTypeDetailsPage from '../../../components/ServiceTypeDetailsPage'
type Params = Promise<{ identifier: string }>
export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const identifier = resolvedParams.identifier

  return <ServiceTypeDetailsPage serviceTypeIdentifier={identifier} />
}
