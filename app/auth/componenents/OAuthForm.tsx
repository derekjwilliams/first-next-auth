'use client'
import { createBrowserClient } from '@supabase/ssr'
import React from 'react'

export default function OAuthForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const loginWithGithub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }
  return (
    <>
      <button className='w-full' onClick={loginWithGithub}>
        Login With Github
      </button>
      <button className='w-full' onClick={loginWithGoogle}>
        Login With Google
      </button>
    </>
  )
}
