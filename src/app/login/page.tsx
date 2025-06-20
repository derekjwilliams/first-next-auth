import { headers } from 'next/headers'
import { createClient } from '../../lib/supabase/client'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import * as stylex from '@stylexjs/stylex'
import OAuthForm from '../auth/components/OAuthForm'
import { spacingPatterns } from '../customStyles/spacingPatterns.stylex'

// export const dynamic = 'force-dynamic'

const loginContainer = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    padding: '0 ' + spacingPatterns.gapLarge,
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
    gap: spacingPatterns.gapMedium,
    justifyContent: 'center',
    width: '100%',
    marginTop: spacingPatterns.gapXLarge,
  },
  input: {},
  button: {
    padding: [spacingPatterns.gapSmall, spacingPatterns.gapMedium].join(' '),
    borderRadius: borders.radius2,
    borderWidth: borders.size1,
    marginBottom: spacingPatterns.gapSmall,
  },
  searchButton: {
    padding: spacingPatterns.gapMedium,
    marginTop: spacingPatterns.gapMedium,
    textAlign: 'center',
  },
})

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
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
    if (!error) {
      const redirectTo = (resolvedSearchParams['redirect'] as string) || '/servicetypes' // Redirect parameter fallback
      redirect(redirectTo || '/')
    }
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
          pendingText='Signing In...'>
          Login with Email and Password
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          {...stylex.props(loginForm.button)}
          pendingText='Signing Up...'>
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
