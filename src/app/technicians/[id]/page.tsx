import TechnicianDetailsPage from '@/components/TechnicianDetailsPage'

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  return <TechnicianDetailsPage technicianId={id}></TechnicianDetailsPage>
}
