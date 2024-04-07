import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'

const auth_button_wrapper = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    color: '#005145',
    gap: '1rem',
  },
})
const auth_button = stylex.create({
  base: {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    borderColor: '#005145',
    borderWidth: '1px',
    backgroundColor: {
      ':hover': '#e9ecef',
    },
  },
})

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div {...stylex.props(auth_button_wrapper.base)}>
      Hey, {user.email}!
      <form action={signOut}>
        <button {...stylex.props(auth_button.base)}>Logout</button>
      </form>
    </div>
  ) : (
    <Link href='/login' {...stylex.props(auth_button.base)}>
      Login
    </Link>
  )
}
