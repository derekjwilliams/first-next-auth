import { createClient } from '@/lib/supabase/client'
import ServiceRequestEditForm from '@/components/ServiceRequestEditForm'
import { QueryData } from '@supabase/supabase-js'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  // get this service request by id
  const supabase = await createClient()
  // let { data: serviceRequest }
  const serviceRequestWithChildrenQuery = supabase
    .from('service_requests')
    .select('*, technicians(id, name, email), service_types(id, service_name), tenants(*)', { count: 'exact' })
    .eq(`id`, id)
    .single()

  type ServiceRequestWithChildren = QueryData<typeof serviceRequestWithChildrenQuery>
  const { data: serviceRequest, error }: { data: ServiceRequestWithChildren; error: any } =
    await serviceRequestWithChildrenQuery

  let { data: technicians } = await supabase.from('technicians').select('*')

  let { data: serviceTypes } = await supabase.from('service_types').select('*')

  return (
    <ServiceRequestEditForm
      serviceRequest={serviceRequest}
      availableTechnicians={technicians ?? []}
      availableServiceTypes={serviceTypes ?? []}></ServiceRequestEditForm>
  )
}
