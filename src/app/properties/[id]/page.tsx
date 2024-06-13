import LocationDetail from '@/components/LocationDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  // return <div>2</div>
  return <LocationDetail id={id}></LocationDetail>
}
