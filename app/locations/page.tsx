import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: locations } = await supabase.from('locations').select()

  return <pre>{JSON.stringify(locations, null, 2)}</pre>
}
