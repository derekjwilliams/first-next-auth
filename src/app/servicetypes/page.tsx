// src/app/servicetypes/page.tsx

import AuthButton from '../../components/AuthButton'
import { createClient } from '../../lib/supabase/client'
import Link from 'next/link'
import { marigoldColors } from '../customStyles/marigoldColors.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/colors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import { serviceTypes } from '../../utils/serviceTypes'
import { JSX } from 'react'
import { Plus } from 'lucide-react'

const serviceCard = stylex.create({
  linkOverlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    color: 'inherit',
  },
  base: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: {
      default: marigoldColors.foreground,
      ':hover': marigoldColors.foregroundButton,
    },
    fontSize: 16,
    boxShadow: {
      default: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
    },
    borderRadius: borders.radius4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 200,
    minHeight: 200,
    padding: sizes.spacing2,
    backgroundColor: {
      default: marigoldColors.background,
      ':hover': marigoldColors.flowerYellow,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
  },
  newRequest: {
    padding: `${sizes.spacing1}`,
    borderRadius: borders.radius6,
    // border: `2px solid ${colors.stone5}`,
    backgroundColor: {
      default: marigoldColors.backgroundButton,
      ':hover': marigoldColors.flowerGold,
    },
    color: marigoldColors.foregroundButton,
    cursor: 'pointer',
    fontSize: fonts.size1,
    textDecoration: 'none',

    ':disabled': {
      background: colors.stone0,
      cursor: 'not-allowed',
    },
    height: sizes.fluid4,
    width: sizes.fluid4,
    placeItems: 'center',
    display: 'grid',
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    alignSelf: 'flex-end',
  },
})
const servicePage = stylex.create({
  base: {
    display: 'flex',
    flex: '1 1 0%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: marigoldColors.backgroundTextarea,
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
    height: '4rem',
  },
  container: {
    width: '100%',
  },
})
const serviceAuthButton = stylex.create({
  base: {
    maxWidth: '20rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    position: 'absolute',
    top: 0,
    color: marigoldColors.foreground,
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
    paddingBottom: sizes.spacing7,
  },
})
const serviceMain = stylex.create({
  base: {
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'column',
    gap: 1.5,
  },
})
export default async function Page() {
  const supabase = await createClient()

  const { data: service_types } = await supabase.from('service_types').select()
  service_types?.forEach((service_type: { service_name: any; id: any }) => {
    if (serviceTypes.has(service_type.service_name)) {
      const serviceType = serviceTypes.get(service_type.service_name)
      if (serviceType) {
        serviceType.id = service_type.id
      }
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
  serviceTypes.forEach((serviceType: any, key: any) => {
    const snakeCaseKey = pascalToSnakeCase(key)

    serviceLinks.push(
      <div {...stylex.props(serviceCard.base)}>
        {/* Updated link to point to the new service request page with serviceTypeName parameter */}
        <Link
          href={`/servicerequests/new?serviceTypeName=${snakeCaseKey}`}
          key={`new-request-${snakeCaseKey}`}
          {...stylex.props(serviceCard.newRequest)}>
          <Plus size={20} />
        </Link>
        <Link href={`/servicetypes/${snakeCaseKey}`} {...stylex.props(serviceCard.linkOverlay)}>
          <Image
            draggable={false}
            height={160}
            width={160}
            alt={`${serviceType.displayName}`}
            src={`/images/${serviceType.image}`}
          />
          {serviceType.displayName}
        </Link>
      </div>,
    )
  })
  serviceLinks.push(
    <Link key='all' href={`/servicerequests`} {...stylex.props(serviceCard.base)}>
      All
    </Link>,
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
          <div {...stylex.props(servicePage.grid)}>{serviceLinks}</div>
        </main>
      </div>
      <footer></footer>
    </div>
  )
}
