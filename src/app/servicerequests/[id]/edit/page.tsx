import { createClient } from '@/utils/supabase/client'
import ServiceRequestEditForm from '@/components/ServiceRequestEditForm'

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  // get this service request by id
  const supabase = await createClient()
  const fetchSingleServiceRequest = async () => {
    const { data, count, error } = await supabase
      .from('service_requests')
      .select('*, technicians(id, name, email), service_types(id, service_name), tenants(*), locations(*)', {
        count: 'exact',
      })
      .eq(`id`, id)
      .single()

    if (error) throw error
    return { data: data || [], count: count || 0 }
  }

  let { data: serviceRequest } = await fetchSingleServiceRequest()
  let { data: technicians } = await supabase.from('technicians').select('*')
  let { data: serviceTypes } = await supabase.from('service_types').select('*')
  let { data: statuses } = await supabase.from('statuses').select('*')
  let { data: locations } = await supabase
    .from('locations')
    .select('*')
    .order('street_address', { ascending: true })
    .order('unit_number', { ascending: true })
  if (serviceRequest) {
    return (
      <ServiceRequestEditForm
        serviceRequest={serviceRequest}
        availableTechnicians={technicians ?? []}
        availableServiceTypes={serviceTypes ?? []}
        availableLocations={locations ?? []}
        availableStatuses={statuses ?? []}></ServiceRequestEditForm>
    )
  } else return <div>Error, no service request found</div>
}
