import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import SafetyServiceRequests from '@/components/SafetyServiceRequests'
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

  if (!user) {
    return redirect('/login')
  }
  //  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting

  return <SafetyServiceRequests></SafetyServiceRequests>
}
