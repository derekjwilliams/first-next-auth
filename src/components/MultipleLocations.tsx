'use client'

import useMultipleLocationsQuery from '../hooks/useMultipleLocationsQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import * as Form from '@radix-ui/react-form'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useSupabase from '../hooks/useSupabase'
import { addLocation } from '../queries/addLocation'
import { Tables } from '../utils/database.types'
import Link from 'next/link'

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
    fontSize: `${fonts.size4}`,
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
    borderStyle: 'solid',
    marginTop: sizes.spacing2,
    marginBottom: sizes.spacing2,
    padding: sizes.spacing2,
    width: '400px',
    flex: '1',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.spacing00,
    fontSize: fonts.size2,
    color: marigoldColors.textInputColor,
    backgroundColor: marigoldColors.textInputBackground,
    borderColor: {
      default: marigoldColors.foreground,
      ':hover': marigoldColors.borderAccent,
    },
  },
  link: {
    marginLeft: sizes.spacing2,
    fontSize: fonts.size2,
    textDecoration: 'none',
    color: {
      default: marigoldColors.foregroundLink,
      ':hover': marigoldColors.foregroundHoverLink,
    },
  },
  label: {
    color: marigoldColors.foreground,
    fontSize: {
      default: fonts.size2,
      '@media (max-width: 600px)': fonts.size1,
    },
  },

  submitButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: fonts.size2,
    borderRadius: borders.radius2,
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    padding: sizes.spacing2,
    backgroundColor: {
      default: marigoldColors.backgroundButton,
      ':hover': marigoldColors.backgroundHoverButton,
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
    width: '25px',
    height: '25px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px var(--black-a7)',
    backgroundColor: {
      default: marigoldColors.checkboxInputBackground,
      ':hover': marigoldColors.backgroundHoverButton,
    },
  },

  checkboxIndicator: {
    color: marigoldColors.checkboxIcon,
  },
  icon: {
    color: marigoldColors.checkboxIcon,
    height: sizes.fluid2,
    width: sizes.fluid2,
    paddingTop: sizes.spacing1,
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
      unit_number: e.currentTarget.unit_number.value,
      city: e.currentTarget.city.value,
      state_province: e.currentTarget.state_province.value,
      postal_code: e.currentTarget.postal_code.value,
      id: '',
      notes: null,
      tenant_organization_id: null,
    })
  }
  return (
    <>
      <h1 {...stylex.props(header.base)}>Add Property</h1>
      <Form.Root
        {...stylex.props(form.root)}
        onSubmit={onCreateLocation}>
        <Form.Field
          className='FormField'
          name='street_address'>
          <div
            {...stylex.props(form.label)}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Street Address</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter street address
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              {...stylex.props(form.input)}
              type='text'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          className='FormField'
          name='unit_number'>
          <div
            {...stylex.props(form.label)}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Unit</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter unit number if applicable
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              {...stylex.props(form.input)}
              type='text'
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          className='FormField'
          name='city'>
          <div
            {...stylex.props(form.label)}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>City</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter city
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              {...stylex.props(form.input)}
              type='text'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          className='FormField'
          name='state_province'>
          <div
            {...stylex.props(form.label)}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>State</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter state
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              {...stylex.props(form.input)}
              type='text'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          className='FormField'
          name='postal_code'>
          <div
            {...stylex.props(form.label)}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Zip Code</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter zip code
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              {...stylex.props(form.input)}
              type='text'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button {...stylex.props(form.submitButton)}>Add Location</button>
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
      <AddLocation></AddLocation>
      <form {...stylex.props(items.list)}>
        {locations.map((location: any) => (
          <div
            key={location.id}
            {...stylex.props(card.base)}>
            <Checkbox.Root
              {...stylex.props(card.checkboxRoot)}
              id={location.id}>
              <Checkbox.Indicator {...stylex.props(card.checkboxIndicator)}>
                <CheckIcon {...stylex.props(card.icon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Link
              {...stylex.props(form.link)}
              href={`/properties/${location.id}`}>
              {location.street_address} {location.unit_number}
            </Link>
          </div>
        ))}
      </form>
    </div>
  )
}
