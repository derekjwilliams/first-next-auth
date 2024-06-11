import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import MultipleServiceRequests from '@/components/MultipleServiceRequests'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { predicate: string } }) {
  const supabase = await createClient()

  //  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting

  return (
    <>
      <MultipleServiceRequests serviceTypeId='' serviceDisplayName='All' />
    </>
  )
}
