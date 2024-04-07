import Link from 'next/link'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/client'

import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import OAuthForm from '../auth/components/OAuthForm'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/protected')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div>
      <Link href='/'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='15 18 9 12 15 6' />
        </svg>{' '}
        Back
      </Link>

      <form>
        <label htmlFor='email'>Email</label>
        <input name='email' placeholder='you@example.com' required />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='••••••••'
          required
        />
        <SubmitButton formAction={signIn} pendingText='Signing In...'>
          Sign In
        </SubmitButton>
        <SubmitButton formAction={signUp} pendingText='Signing Up...'>
          Sign Up
        </SubmitButton>
        {searchParams?.message && <p>{searchParams.message}</p>}
      </form>
      <OAuthForm />
    </div>
  )
}
