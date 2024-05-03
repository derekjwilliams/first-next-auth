import React from 'react'
import { createServiceRequest } from '../actions'
// import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex' // todo use imported colors

const create_service_request_button_wrapper = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    color: '#005145',
    gap: '1rem',
  },
})
const create_service_request_button = stylex.create({
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
  //   const supabase = await createSupabaseServerClient()

  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser()

  //   const signOut = async () => {
  //     'use server'

  //     const supabase = await createSupabaseServerClient()
  //     await supabase.auth.signOut()
  //     return redirect('/login')
  //   }
  const create = createServiceRequest.bind(null, 'first service request')
  return (
    <form action={create}>
      <button>new service request</button>
    </form>
  )
}
