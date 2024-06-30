'use client'

import useMultipleLocationsQuery from '@/hooks/useMultipleLocationsQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useSupabase from '../hooks/useSupabase'
import { addLocation } from '@/queries/addLocation'
import { Tables } from '@/utils/database.types'
import Link from 'next/link'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'

const items = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
  },
  list: {
    margin: sizes.spacing5,
  },
})

const header = stylex.create({
  base: {
    fontSize: `${fonts.size2}`,
  },
})

const form = stylex.create({
  root: {
    width: '260px',
  },
  field: {
    display: 'grid',
    marginBottom: sizes.spacing5,
  },
  input: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.spacing00,
    fontSize: fonts.size8,
    color: colors.gray10,
    backgroundColor: colors.gray2,
    borderColor: {
      default: colors.gray12,
      ':hover': marigoldColors.flowerYellow,
    },
  },
  textarea: {
    padding: '10px',
    width: '500px',
    height: '200px',
  },

  requestButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: fonts.size2,
    borderRadius: borders.radius2,
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    padding: 10,
    backgroundColor: {
      default: colors.gray2,
      ':hover': marigoldColors.flowerYellow,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    marginTop: '10px',
  },
})

const card = stylex.create({
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

function AddLocation() {
  const client = useSupabase()
  const mutationFn = async (value: Tables<'locations'>) => {
    return addLocation(client, value)?.then((result: any) => result.data)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['locations'], (prevData: Array<Tables<'locations'>>) => [...prevData, data![0]])
    },
  })
  const onCreateLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({
      street_address: e.currentTarget.street_address.value,
      location_name: '',
      unit_number: e.currentTarget.unit.value,
      city: e.currentTarget.city.value,
      state_province: e.currentTarget.state.value,
      postal_code: e.currentTarget.postal_code.value,
      id: '',
      notes: null,
    })
  }
  return (
    <>
      <h1 {...stylex.props(header.base)}>Add Property</h1>
      <Form.Root {...stylex.props(form.root)} onSubmit={onCreateLocation}>
        <Form.Field className='FormField' name='location_address'>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Street Address</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              Please enter street address
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className='Input' type='text' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='FormField' name='email'>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Unit</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              Please enter unit number if applicable
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className='Input' type='email' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='FormField' name='city'>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>City</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              Please enter city
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className='Input' type='text' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='FormField' name='state_province'>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>State</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              Please enter state
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className='Input' type='text' required />
          </Form.Control>
        </Form.Field>
        <Form.Field className='FormField' name='postal_code'>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Zip Code</Form.Label>
            <Form.Message className='FormMessage' match='valueMissing'>
              Please enter zip code
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className='Input' type='text' required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button {...stylex.props(form.requestButton)}>Add Location</button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
export default function MultipleLocations() {
  const { data: locations, isLoading, isError } = useMultipleLocationsQuery()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !locations) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }
  return (
    <div {...stylex.props(items.base)}>
      <form {...stylex.props(items.list)}>
        {locations.map((location: any) => (
          <div key={location.id} {...stylex.props(card.base)}>
            <Checkbox.Root {...stylex.props(card.checkboxRoot)} id={location.id}>
              <Checkbox.Indicator {...stylex.props(card.checkboxIndicator)}>
                <CheckIcon {...stylex.props(card.checkIcon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Link href={`/properties/${location.id}`}>
              {location.street_address} {location.unit_number}
            </Link>
          </div>
        ))}
      </form>
      <AddLocation></AddLocation>
    </div>
  )
}
