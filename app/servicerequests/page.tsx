import React from 'react'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation'
import { readServiceRequests } from './actions'
import CreateForm from './components/CreateForm'

export default async function Page() {
  const { data } = await readUserSession()
  if (!data.session) {
    return redirect('/auth-server-action')
  }
  const { data: serviceRequests } = await readServiceRequests()
  return (
    <div>
      <CreateForm></CreateForm>
      <pre>{JSON.stringify(serviceRequests, null, 2)}</pre>
    </div>
  )
}

// import createSupabaseServerClient from '@/lib/supabase/server'

// export default async function Page() {
//   const supabase = await createSupabaseServerClient()
//   const { data: serviceRequests } = await supabase
//     .from('service_requests')
//     .select(*)

//   return <pre>{JSON.stringify(serviceRequests, null, 2)}</pre>
// }
