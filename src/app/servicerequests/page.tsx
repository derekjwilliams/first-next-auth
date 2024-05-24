import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import MultipleServiceRequests from '@/components/MultipleServiceRequests'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  logo: {
    backgroundColor: 'rgb(255 213 95)',
    padding: '1rem',
  },
})
export default async function Page({ params }: { params: { predicate: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }
  //  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting

  return (
    <>
      <MultipleServiceRequests></MultipleServiceRequests>
    </>
  )
}
