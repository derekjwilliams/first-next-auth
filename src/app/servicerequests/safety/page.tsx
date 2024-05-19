import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import SafetyServiceRequests from '@/components/SafetyServiceRequests'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import Navigation from '@/components/Navigation'
import stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'

const servicePage = stylex.create({
  logo: {
    width: '100%',
    backgroundColor: '#ffd55f',
    padding: sizes.spacing3,
  },
})

export default async function ServiceRequestPage({ params }: { params: { predicate: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }
  //  const predicate = params.predicate //todo there will be a predicate here later for filtering and sorting
  const header = (
    <div {...stylex.props(servicePage.logo)}>
      <Image alt='simple logo' width={492 / 8} height={492 / 8} src='/simple_logo.png' />
      <Navigation></Navigation>
    </div>
  )
  return (
    <>
      {header}
      <SafetyServiceRequests></SafetyServiceRequests>
    </>
  )
}
