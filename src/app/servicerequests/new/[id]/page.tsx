import MultipleServiceRequests from '../../../../components/MultipleServiceRequests'
import { createClient } from '../../../../lib/supabase/client'
import { serviceTypes } from '../../../../utils/serviceTypes'

const snakeToPascalCase = (value: string) => {
  const result = value.toLowerCase().replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''))
  return result.charAt(0).toUpperCase() + result.slice(1)
}

// the param id is a string like 'safety', 'refrigerator', etc.  To make the url friendly.  If there
// is no match in the database for the CamelCase version of this sting, then attempt with the id field

type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const supabase = await createClient()
  const { data: service_type } = await supabase
    .from('service_types')
    .select()
    .eq('service_name', snakeToPascalCase(id))
    .single()
  let { data: locations } = await supabase.from('locations').select('id, street_address, unit_number')
  if (locations === null) {
    locations = []
  }
  const serviceTypeEntry = serviceTypes.get(snakeToPascalCase(id))
  const displayName = serviceTypeEntry ? serviceTypeEntry.displayName : '--'

  return (
    <>
      <MultipleServiceRequests
        serviceTypeId={service_type?.id}
        locations={locations}
        serviceDisplayName={displayName}></MultipleServiceRequests>
    </>
  )
}
