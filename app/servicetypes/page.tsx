import { createClient } from '@/lib/supabase/client'
export default async function Page() {
  const supabase = await createClient()
  const { data: serviceTypes } = await supabase.from('service_types').select()

  return <pre>{JSON.stringify(serviceTypes, null, 2)}</pre>
}
