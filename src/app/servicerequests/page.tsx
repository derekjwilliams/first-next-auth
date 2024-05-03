import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import MultipleServiceRequests from '@/components/MultipleServiceRequests'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export default async function ServiceRequestPage({
  params,
}: {
  params: { predicate: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log('here1------------------')
  // console.log(JSON.stringify(user, null, 2))

  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log('here1------------------')
  console.log(session?.access_token)

  if (!user) {
    return redirect('/login')
  }
  //  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting

  return <MultipleServiceRequests></MultipleServiceRequests>
}
