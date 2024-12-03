import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/client'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import * as stylex from '@stylexjs/stylex'
import OAuthForm from '../auth/components/OAuthForm'

const loginContainer = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    padding: `0 ${sizes.spacing5}`,
    maxWidth: sizes.spacing14,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  },
})

const loginForm = stylex.create({
  base: {
    display: 'flex',
    fontFamily: 'Figtree, Verdana, Geneva, Tahoma, sans-serif',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: sizes.spacing2,
    justifyContent: 'center',
    width: '100%',
    marginTop: sizes.spacing8,
  },
  input: {},
  button: {
    padding: `${sizes.spacing2} ${sizes.spacing3}`,
    borderRadius: borders.radius2,
    borderWidth: borders.size1,
    marginBottom: sizes.spacing2,
  },
  searchButton: {
    padding: sizes.spacing3,
    marginTop: sizes.spacing3,
    textAlign: 'center',
  },
})
type Params = Promise<{ message: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Login({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
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

    // const resolvedParams = await params
    const resolvedSearchParams = await searchParams
    // const message = resolvedSearchParams.message as string
    const redirectUrl = resolvedSearchParams.redirect as string
    return redirect(redirectUrl || '/')
  }

  const signUp = async (formData: FormData) => {
    'use server'
    const resolvedHeaders = await headers()
    const origin = resolvedHeaders.get('origin')
    // const origin = headers().get('origin')
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
      <form {...stylex.props(loginForm.base)}>
        <label htmlFor='email'>Email</label>
        <input {...stylex.props(loginForm.input)} type='text' name='email' placeholder='you@example.com' required />
        <label htmlFor='password'>Password</label>
        <input {...stylex.props(loginForm.input)} type='password' name='password' placeholder='••••••••' required />
        <SubmitButton formAction={signIn} {...stylex.props(loginForm.button)} pendingText='Signing In...'>
          Login with Email and Password
        </SubmitButton>
        <SubmitButton formAction={signUp} {...stylex.props(loginForm.button)} pendingText='Signing Up...'>
          Sign Up
        </SubmitButton>

        {/* {(await searchParams).message && (
          <p {...stylex.props(loginForm.searchButton)}>{(await searchParams).message}</p>
        )} */}
      </form>
      <OAuthForm />
    </div>
  )
}
