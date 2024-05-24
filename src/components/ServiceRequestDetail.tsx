'use client'

//import useNotesQuery from '@/hooks/useNotesQuery'
import useServiceRequestQuery from '@/hooks/useServiceRequestQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import * as stylex from '@stylexjs/stylex'

const requestCard = stylex.create({
  checkboxRoot: {
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
  checkboxIndicator: {
    padding: 0,
  },
  checkIcon: {
    color: '#1d2496',
    height: '100%',
    width: '100%',
  },
})

export default function ServiceRequestDetail({ id }: { id: string | null }) {
  const { data: serviceRequest, isLoading, isError } = useServiceRequestQuery(id!)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !serviceRequest) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }
  return (
    <form>
      <Checkbox.Root {...stylex.props(requestCard.checkboxRoot)} defaultChecked id='c1'>
        <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
          <CheckIcon {...stylex.props(requestCard.checkIcon)} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className='Label' htmlFor='c1'>
        {serviceRequest.description}
      </label>
    </form>
  )
}
