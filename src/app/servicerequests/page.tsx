import MultipleServiceRequests from '@/components/MultipleServiceRequests'
import { createClient } from '@/lib/supabase/client'

export default async function Page({ params }: { params: { predicate: string } }) {
  //  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting

  return (
    <>
      <MultipleServiceRequests serviceTypeId='' serviceDisplayName='All' />
    </>
  )
}
