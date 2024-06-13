import TechnicianDetail from '@/components/TechnicianDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id

  return <TechnicianDetail id={id}></TechnicianDetail>
}
