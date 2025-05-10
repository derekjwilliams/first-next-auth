import { snakeToPascalCase } from '@/utils/stringUtils'
import MultipleServiceRequests from '../../../../components/MultipleServiceRequests'
import { createClient } from '../../../../lib/supabase/client'
import { serviceTypes } from '../../../../utils/serviceTypes'

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
