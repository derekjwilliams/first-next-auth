import ServiceRequestDetail from '@/components/ServiceRequestDetail'
import MultipleServiceRequests from '@/components/MultipleServiceRequests'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import Navigation from '@/components/Navigation'

const styles = stylex.create({
  logo: {
    backgroundColor: 'rgb(255 213 95)',
    padding: '1rem',
  },
})
export default async function Page({ params }: { params: { predicate: string } }) {
  const header = (
    <div {...stylex.props(styles.logo)}>
      <Image alt='simple logo' width={492 / 8} height={492 / 8} src='/simple_logo.png' priority={true} />
      <Navigation></Navigation>
    </div>
  )

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
      {header}
      <MultipleServiceRequests></MultipleServiceRequests>
    </>
  )
}
