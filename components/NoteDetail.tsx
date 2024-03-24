'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useNotesQuery from '@/hooks/useNotesQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'

const note_card = stylex.create({
  checkbox_root: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0 2px 10px black',
    borderColor: '#556d55',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  checkbox_indicator: {
    padding: 0,
  },
  check_icon: {
    color: '#1d2496',
    height: '100%',
    width: '100%',
  },
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export default function NoteDetail({ id }: { id: number | null }) {
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

  const { data: note, isLoading, isError } = useNotesQuery(id)
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
    <form>
      <Checkbox.Root
        {...stylex.props(note_card.checkbox_root)}
        defaultChecked
        id='c1'
      >
        <Checkbox.Indicator {...stylex.props(note_card.checkbox_indicator)}>
          <CheckIcon {...stylex.props(note_card.check_icon)} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className='Label' htmlFor='c1'>
        {note.title}
      </label>
    </form>
  )
}

// export default function NoteDetail({ title }: { title: string | null }) {
//   return <div>note title: {title}</div>
// }
