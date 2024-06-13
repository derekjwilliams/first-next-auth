import TechnicianDetail from '@/components/TechnicianDetail'

export default async function ServiceRequestPage({ params }: { params: { id: string } }) {
  const id = params.id

  return <TechnicianDetail id={id}></TechnicianDetail>
}
