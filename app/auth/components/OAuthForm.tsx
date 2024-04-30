'use client'
import { createBrowserClient } from '@supabase/ssr'
import React from 'react'
import * as stylex from '@stylexjs/stylex'

const loginForm = stylex.create({
  base: {
    display: 'flex',
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '0.5rem',
    justifyContent: 'center',
    width: '100%',
    fontSize: '1.2rem',
    marginTop: '4rem',
  },
  input: {
    padding: '0.5rem 1rem',
    marginBottom: '1.5rem',
    borderRadius: '0.375rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    borderWidth: '1px',
    marginBottom: '0.5rem',
  },
})

export default function OAuthForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const loginWithGithub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/oauth-callback`,
      },
    })
  }
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/oauth-callback`,
      },
    })
  }
  return (
    <>
      <button {...stylex.props(loginForm.button)} onClick={loginWithGithub}>
        Login With Github
      </button>
      <button {...stylex.props(loginForm.button)} onClick={loginWithGoogle}>
        Login With Google
      </button>
    </>
  )
}
