// components/AuthStatusDisplay.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase-api/client'
import type { User } from '@supabase/supabase-js'

export default function AuthStatusDisplay() {
  const supabase = getSupabaseBrowserClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (!error) {
        setUser(data.user)
      } else {
        console.log('Error fetching initial user state:', error.message)
      }
      setLoading(false)
    }

    fetchUser() // Get initial state

    // Listen for auth changes (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event)
      setUser(session?.user ?? null)
      setLoading(false) // Update loading state on change too
    })

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase.auth]) // Re-run if supabase.auth instance changes (shouldn't often)

  if (loading) {
    return <p>Loading auth status...</p>
  }

  return (
    <div>
      {user ? (
        <p>
          Logged in as: {user.email} (ID: {user.id})
        </p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  )
}
