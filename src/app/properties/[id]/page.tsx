import LocationDetail from '@/components/LocationDetail'
//TODO consider using a tree, see the Canto tree implementation
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  return <LocationDetail id={id}></LocationDetail>
}
