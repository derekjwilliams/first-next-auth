import { createClient } from '@/lib/supabase/client'
import ServiceRequestEditForm from '@/components/ServiceRequestEditForm'
import { QueryData } from '@supabase/supabase-js'
import RichTextEditor from '@/components/lexical/RichTextEditor'
import '@/components/lexicalstyles.css'
type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  // get this service request by id
  const supabase = await createClient()
  // let { data: serviceRequest }
  const serviceRequestWithChildrenQuery = supabase
    .from('service_requests')
    .select('*, technicians(id, name, email), service_types(id, service_name), tenants(*), locations(*)', {
      count: 'exact',
    })
    .eq(`id`, id)
    .single()

  type ServiceRequestWithChildren = QueryData<typeof serviceRequestWithChildrenQuery>
  const { data: serviceRequest, error }: { data: ServiceRequestWithChildren; error: any } =
    await serviceRequestWithChildrenQuery

  let { data: technicians } = await supabase.from('technicians').select('*')
  let { data: serviceTypes } = await supabase.from('service_types').select('*')
  let { data: statuses } = await supabase.from('statuses').select('*')
  let { data: locations } = await supabase
    .from('locations')
    .select('*')
    .order('street_address', { ascending: true })
    .order('unit_number', { ascending: true })

  return (
    <>
      <RichTextEditor />
      <ServiceRequestEditForm
        serviceRequest={serviceRequest}
        availableTechnicians={technicians ?? []}
        availableServiceTypes={serviceTypes ?? []}
        availableLocations={locations ?? []}
        availableStatuses={statuses ?? []}></ServiceRequestEditForm>
    </>
  )
}
