'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useNotesQuery from '@/hooks/useNotesQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

const Note = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error: AuthError } =
          await supabase.auth.getUserIdentities()
        if (data === null) {
          router.push('/login')
        }
      } catch (e) {
        console.log(JSON.stringify(e))
        router.push('/login')
      }
    }

    fetchData()
  }, [router])

  const { data: note, isLoading, isError } = useNotesQuery(params.id)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !note) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }

  return (
    <>
      <form>
        <Checkbox.Root className='CheckboxRoot' defaultChecked id='c1'>
          <Checkbox.Indicator className='CheckboxIndicator'>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </form>
      <div>{note.title}</div>
    </>
  )
}

export default Note
