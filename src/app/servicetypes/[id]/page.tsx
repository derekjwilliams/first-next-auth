//src/app/properties/[id]/page.tsx
import ServiceTypeDetailsPage from '../../../components/ServiceTypeDetailsPage'
type Params = Promise<{ id: string }>
export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  return <ServiceTypeDetailsPage serviceTypeId={id} />
}
