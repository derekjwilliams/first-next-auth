import Navigation from '@/components/Navigation'
import AuthButton from '@/components/AuthButton'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { marigoldColors } from '../../customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { serviceTypes } from '@/utils/serviceTypes'

const serviceCard = stylex.create({
  base: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: 16,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
    borderRadius: '0.5rem',
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    minHeight: 200,
    padding: 10,
    backgroundColor: {
      default: colors.gray2,
      ':hover': marigoldColors.flowerYellow,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
  },
})
const servicePage = stylex.create({
  base: {
    display: 'flex',
    flex: '1 1 0%',
    width: '100%',
    flexDirection: 'column',
    gap: '4rem',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    backgroundColor: '#ffd55f',
    padding: sizes.spacing3,
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    margin: '0 2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  },
})
const serviceNav = stylex.create({
  base: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(4, 9, 11, 0.1)',
    height: '4rem',
  },
  container: {
    width: '100%',
  },
})
const serviceAuthButton = stylex.create({
  base: {
    width: '100%',
    maxWidth: '20rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
})
const serviceMain_container = stylex.create({
  base: {
    display: 'flex',
    flex: '1 1 0%',
    width: '100%',
    flexDirection: 'column',
    gap: '5rem',
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
})
const serviceMain = stylex.create({
  base: {
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'column',
    gap: 1.5,
  },
  heading: {
    padding: '0 0 1rem 2rem',
  },
})
export default async function Page() {
  const supabase = await createClient()

  const { data: service_types } = await supabase.from('service_types').select()
  service_types?.forEach((service_type) => {
    if (serviceTypes.has(service_type.service_name)) {
      serviceTypes.get(service_type.service_name)['id'] = service_type.id
    } else {
      serviceTypes.set(service_type.service_name, {
        displayName: service_type.service_name,
        id: service_type.id,
        image: 'roof.svg',
      })
    }
  })

  // From https://stackoverflow.com/questions/54246477/how-to-convert-camelcase-to-snake-case
  const pascalToSnakeCase = (value: string) => {
    if (value) {
      return value.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, '$1_').toLowerCase()
    }
    return 'no_match'
  }

  const serviceLinks: JSX.Element[] = []
  serviceTypes.forEach((serviceType, key) => {
    serviceLinks.push(
      <Link
        key={`/servicerequests/new/${pascalToSnakeCase(key)}`}
        href={`/servicerequests/new/${pascalToSnakeCase(key)}`}
        {...stylex.props(serviceCard.base)}>
        <Image
          draggable={false}
          height={160}
          width={160}
          alt={`${serviceType.displayName}`}
          src={`/images/${serviceType.image}`}
        />
        {serviceType.displayName}
      </Link>
    )
  })
  serviceLinks.push(
    <Link key='all' href={`/servicerequests`} {...stylex.props(serviceCard.base)}>
      All
    </Link>
  )

  return (
    <div {...stylex.props(servicePage.base)}>
      <div {...stylex.props(serviceNav.container)}>
        <nav {...stylex.props(serviceNav.base)}>
          <div {...stylex.props(serviceAuthButton.base)}>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div {...stylex.props(serviceMain_container.base)}>
        <main {...stylex.props(serviceMain.base)}>
          <div {...stylex.props(serviceMain.heading)}>Make a Service Request</div>
          <div {...stylex.props(servicePage.grid)}>{serviceLinks}</div>
        </main>
      </div>
      <footer></footer>
    </div>
  )
}
