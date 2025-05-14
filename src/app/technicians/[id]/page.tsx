import TechnicianDetailsContainer from '@/components/TechnicianDetailsContainer'

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  return <TechnicianDetailsContainer technicianId={id}></TechnicianDetailsContainer>
}
