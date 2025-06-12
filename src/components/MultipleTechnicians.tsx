'use client'

import useMultipleTechniciansQuery from '../hooks/useMultipleTechniciansQuery'
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
import { addTechnician } from '../queries/addTechnician'
import { Tables } from '../utils/database.types'
import Link from 'next/link'
import { spacingPatterns } from '../app/customStyles/spacingPatterns.stylex'

const items = stylex.create({
  base: {
    padding: spacingPatterns.gapLarge,
    backgroundColor: marigoldColors.background,
  },
  list: {
    margin: spacingPatterns.gapLarge,
  },
})

const header = stylex.create({
  base: {
    fontSize: fonts.size4,
    color: marigoldColors.foreground,
  },
})

const form = stylex.create({
  root: {
    width: '260px',
  },
  field: {
    display: 'grid',
    marginBottom: spacingPatterns.gapLarge,
  },
  input: {
    borderStyle: 'solid',
    marginTop: spacingPatterns.gapSmall,
    marginBottom: spacingPatterns.gapSmall,
    padding: spacingPatterns.gapSmall,
    width: '400px',
    flex: '1',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    fontSize: fonts.size2,
    color: marigoldColors.textInputColor,
    backgroundColor: marigoldColors.textInputBackground,
    borderColor: {
      default: marigoldColors.foreground,
      ':hover': marigoldColors.borderAccent,
    },
  },
  link: {
    marginLeft: spacingPatterns.gapSmall,
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
    padding: spacingPatterns.gapSmall,
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
    margin: spacingPatterns.gapSmall,
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
    paddingTop: spacingPatterns.gapTiny,
  },
})

function AddTechnician() {
  const client = useSupabase()
  const mutationFn = async (value: Tables<'technicians'>) => {
    return addTechnician(client, value)?.then((result: any) => result.data)
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data: any) => {
      queryClient.setQueryData(['technicians'], (prevData: Array<Tables<'technicians'>>) => [...prevData, data![0]])
    },
  })
  const onCreateTechnician = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({
      name: e.currentTarget.technician_name.value,
      email: e.currentTarget.email.value,
      id: '',
      tenant_organization_id: null,
    })
  }
  return (
    <>
      <h1 {...stylex.props(header.base)}>Add Technician </h1>
      <Form.Root
        {...stylex.props(form.root)}
        onSubmit={onCreateTechnician}>
        <Form.Field
          {...stylex.props(form.field)}
          className='FormField'
          name='technician_name'>
          <div
            {...stylex.props(form.label)}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Name</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter technician name
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
          name='email'>
          <div
            {...stylex.props(form.label)}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Email</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter your email
            </Form.Message>
            <Form.Message
              className='FormMessage'
              match='typeMismatch'>
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              {...stylex.props(form.input)}
              type='email'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button {...stylex.props(form.submitButton)}>Add Technician</button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
export default function MultipleTechnicians() {
  const { data: technicians, isLoading, isError } = useMultipleTechniciansQuery()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !technicians) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }
  return (
    <div {...stylex.props(items.base)}>
      <AddTechnician></AddTechnician>
      <form {...stylex.props(items.list)}>
        {technicians.map((technician: any) => (
          <div
            key={technician.id}
            {...stylex.props(card.base)}>
            <Checkbox.Root
              {...stylex.props(card.checkboxRoot)}
              id={technician.id}>
              <Checkbox.Indicator {...stylex.props(card.checkboxIndicator)}>
                <CheckIcon {...stylex.props(card.icon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Link
              {...stylex.props(form.link)}
              href={`/technicians/${technician.id}`}>
              {technician.name} {technician.email}
            </Link>
          </div>
        ))}
      </form>
    </div>
  )
}
