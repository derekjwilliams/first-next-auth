import MultipleServiceRequests from '@/components/MultipleServiceRequests'
import { createClient } from '@/lib/supabase/client'
import { serviceTypes } from '@/utils/serviceTypes'
import { redirect } from 'next/navigation'

const snakeToPascalCase = (value: string) => {
  let result = value.toLowerCase().replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''))
  return result.charAt(0).toUpperCase() + result.slice(1)
}

// the param id is a string like 'safety', 'refrigerator', etc.  To make the url friendly.  If there
// is no match in the database for the CamelCase version of this sting, then attempt with the id field
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id

  //TODO put this redirect into middleware

  const supabase = await createClient()

  const { data: service_type } = await supabase
    .from('service_types')
    .select()
    .eq('service_name', snakeToPascalCase(id))
    .single()

  return (
    <>
      <MultipleServiceRequests
        serviceTypeId={service_type?.id}
        serviceDisplayName={serviceTypes.get(snakeToPascalCase(id)).displayName}></MultipleServiceRequests>
    </>
  )
}
