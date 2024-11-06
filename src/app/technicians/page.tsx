// import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import MultipleTechnicians from '@/components/MultipleTechnicians'
//import { createClient } from '@/lib/supabase/client'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

type Params = Promise<{ predicate: string }>

export default async function Page({ params }: { params: Params }) {
  const supabase = await createClient()

  //  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting

  return (
    <>
      <MultipleTechnicians />
    </>
  )
}
