import { createClient } from '@/lib/supabase/client'
import ServiceTypeTable from '@/components/ServiceTypeTable'
import { ServiceType } from '@/utils/servicetype.types'

export default async function Page() {
  const supabase = await createClient()
  const values: ServiceType[] = (await supabase.from('service_types').select()).data ?? []
  return (
    <div>
      <ServiceTypeTable data={values} />
    </div>
  )
}
