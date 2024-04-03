'use client'

//import useNotesQuery from '@/hooks/useNotesQuery'
import useServiceRequestQuery from '@/hooks/useServiceRequestQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import * as stylex from '@stylexjs/stylex'

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

export default function ServiceRequestDetail({ id }: { id: string | null }) {
  const { data: note, isLoading, isError } = useServiceRequestQuery(id!)
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
        {note.description}
      </label>
    </form>
  )
}
