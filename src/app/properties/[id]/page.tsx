//src/app/properties/[id]/page.tsx
import LocationDetailsContainer from '../../../components/LocationDetailsContainer'
type Params = Promise<{ id: string }>
export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  return <LocationDetailsContainer locationId={id} />
}
