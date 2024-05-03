'use server'
import createSupabaseServerClient from '../supabase/server'
import { unstable_noStore as noStore } from 'next/cache'

export default async function readUserSession() {
  noStore()
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}
