import { createClient } from '@/lib/supabase/client'

export default async function Page() {
  const supabase = await createClient()
  const { data: locations } = await supabase.from('locations').select()

  return <pre>{JSON.stringify(locations, null, 2)}</pre>
}
