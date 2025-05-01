//src/app/properties/[id]/page.tsx
import LocationDetailsPage from '../../../components/LocationDetailsPage'
type Params = Promise<{ id: string }>
export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  return <LocationDetailsPage locationId={id} />
}
