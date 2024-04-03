import createSupabaseServerClient from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createSupabaseServerClient()
  const { data: locations } = await supabase.from('locations').select()

  return <pre>{JSON.stringify(locations, null, 2)}</pre>
}
