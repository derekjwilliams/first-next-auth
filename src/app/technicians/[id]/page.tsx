import TechnicianDetail from '@/components/TechnicianDetail'

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  return <TechnicianDetail id={id}></TechnicianDetail>
}
