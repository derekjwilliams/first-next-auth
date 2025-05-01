// components/AuthButtons.tsx
'use client'

import React, { useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase-api/client' // Use browser client
import { useRouter } from 'next/navigation'

export default function AuthButtons() {
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) throw signInError
      setMessage('Login successful! Refreshing...')
      // Refresh the page/layout to update server components based on new auth state
      router.refresh()
      // You might redirect here instead: router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Failed to log in.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      setMessage('Logout successful! Refreshing...')
      // Refresh the page/layout
      router.refresh()
    } catch (err: any) {
      console.error('Logout error:', err)
      setError(err.message || 'Failed to log out.')
    } finally {
      setLoading(false)
    }
  }

  // Basic Signup Example (Add UI if needed)
  const handleSignup = async () => {
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        // Add options like redirect URL if needed
        // options: { emailRedirectTo: `${location.origin}/auth/callback` }
      })
      if (signUpError) throw signUpError
      setMessage('Signup successful! Check your email for verification (if enabled).')
      // Optionally refresh or redirect
      // router.refresh();
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'Failed to sign up.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {/* Basic Signup Button Example */}
        <button type='button' onClick={handleSignup} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <button onClick={handleLogout} disabled={loading} style={{ marginTop: '10px' }}>
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  )
}
