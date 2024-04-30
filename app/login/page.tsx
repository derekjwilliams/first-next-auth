import Link from 'next/link'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/client'

import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import * as stylex from '@stylexjs/stylex'
import OAuthForm from '../auth/components/OAuthForm'

const loginContainer = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    padding: '0 2rem',
    maxWidth: '20rem',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  },
})

const loginBackLink = stylex.create({
  base: {
    display: 'flex',
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    padding: '0.5rem',
    alignItems: 'center',
    textDecoration: 'none',
  },
})
const backIcon = stylex.create({
  base: {
    marginRight: '0.5rem',
    width: '1rem',
    height: '1rem',
  },
})

const loginForm = stylex.create({
  base: {
    display: 'flex',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '0.5rem',
    justifyContent: 'center',
    width: '100%',
    marginTop: '4rem',
  },
  input: {},
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    borderWidth: '1px',
    marginBottom: '0.5rem',
  },
  searchButton: {
    padding: '1rem',
    marginTop: '1rem',
    textAlign: 'center',
  },
})

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
    <div {...stylex.props(loginContainer.base)}>
      <Link href='/' {...stylex.props(loginBackLink.base)}>
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
          {...stylex.props(backIcon.base)}
        >
          <polyline points='15 18 9 12 15 6' />
        </svg>{' '}
        Back
      </Link>

      <form {...stylex.props(loginForm.base)}>
        <label htmlFor='email'>Email</label>
        <input
          {...stylex.props(loginForm.input)}
          type='text'
          name='email'
          placeholder='you@example.com'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          {...stylex.props(loginForm.input)}
          type='password'
          name='password'
          placeholder='••••••••'
          required
        />
        <SubmitButton
          formAction={signIn}
          {...stylex.props(loginForm.button)}
          pendingText='Signing In...'
        >
          Login with Email and Password
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          {...stylex.props(loginForm.button)}
          pendingText='Signing Up...'
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p {...stylex.props(loginForm.searchButton)}>
            {searchParams.message}
          </p>
        )}
      </form>
      <OAuthForm />
    </div>
  )
}
