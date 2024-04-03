import createSupabaseServerClient from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createSupabaseServerClient()
  const { data: serviceTypes } = await supabase.from('service_types').select()

  return <pre>{JSON.stringify(serviceTypes, null, 2)}</pre>
}
