import LocationDetail from '@/components/LocationDetail'
type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  return <LocationDetail id={id} />
}

// export default async function Page({ params }: { params: { id: string } }) {
//   const id = params.id
//   return <LocationDetail id={id}></LocationDetail>
// }
