'use client'

import useMultipleServiceRequestsQuery from '@/hooks/useMultipleServiceRequestsQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'

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

export default function AllServiceRequests() {
  const { data: serviceRequests, isLoading, isError } = useMultipleServiceRequestsQuery({ serviceTypeId: '' })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !serviceRequests) {
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
        {serviceRequests.map((serviceRequest: any) => (
          <div key={serviceRequest.id} {...stylex.props(requestCard.base)}>
            <Checkbox.Root {...stylex.props(requestCard.checkboxRoot)} id='{serviceRequest.id}'>
              <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
                <CheckIcon {...stylex.props(requestCard.checkIcon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className='service-request-label' htmlFor='{serviceRequest.id}'>
              {/* todo make this a link to request details */}
              {serviceRequest.description} ({serviceRequest.id})
            </label>
          </div>
        ))}
      </form>
    </div>
  )
}
