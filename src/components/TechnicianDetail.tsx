'use client'

import useTechnicianQuery from '@/hooks/useTechnicianQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'

import * as stylex from '@stylexjs/stylex'

const requests = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
  },
  list: {
    margin: sizes.spacing5,
  },
})

const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
    alignItems: 'center',
  },
  checkboxRoot: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray6,
    borderStyle: 'solid',
    borderWidth: 2,
    marginRight: sizes.spacing2,
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

export default function TechnicianDetail({ id }: { id: string | null }) {
  const { data: technician, isLoading, isError } = useTechnicianQuery(id!)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !technician) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }
  return (
    <div {...stylex.props(requests.base)}>
      <form {...stylex.props(requests.list)}>
        <div key={technician.id} {...stylex.props(requestCard.base)}>
          <Checkbox.Root {...stylex.props(requestCard.checkboxRoot)} id={technician.id}>
            <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
              <CheckIcon {...stylex.props(requestCard.checkIcon)} />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label htmlFor={technician.id}>
            {technician.name} {technician.email}
          </label>
        </div>
      </form>
    </div>
  )
}
