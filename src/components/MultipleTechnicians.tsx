'use client'

import useMultipleTechniciansQuery from '../hooks/useMultipleTechniciansQuery'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as Form from '@radix-ui/react-form'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colorPrimitives } from '../app/customStyles/colorPrimitives.stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/colors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useSupabase from '../hooks/useSupabase'
import { addTechnician } from '../queries/addTechnician'
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
    backgroundColor: colors.gray0,
    borderColor: {
      default: colors.gray12,
      ':hover': colorPrimitives.marigoldYellow,
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
    padding: sizes.spacing2,
    backgroundColor: {
      default: colors.gray0,
      ':hover': colorPrimitives.marigoldYellow,
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
  icon: {
    color: '#1d2496',
    height: '100%',
    width: '100%',
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
          className='FormField'
          name='technician_name'>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className='FormLabel'>Name</Form.Label>
            <Form.Message
              className='FormMessage'
              match='valueMissing'>
              Please enter technician name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className='Input'
              type='text'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          className='FormField'
          name='email'>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
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
              className='Input'
              type='email'
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button {...stylex.props(form.requestButton)}>Add Technician</button>
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
                <Check {...stylex.props(card.icon)} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Link href={`/technicians/${technician.id}`}>
              {technician.name} {technician.email}
            </Link>
          </div>
        ))}
      </form>
    </div>
  )
}
