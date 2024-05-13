import Navigation from '@/components/Navigation'
import AuthButton from '@/components/AuthButton'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { marigoldColors } from '../../customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'

const logoSize = 492 / 8

const service_card = stylex.create({
  base: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    fontSize: 18,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
    borderRadius: '0.5rem',
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    minHeight: 200,
    padding: 10,
    backgroundColor: {
      default: `${colors.gray2}`,
      ':hover': `${marigoldColors.flowerYellow}`,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
  },
})
const service_page = stylex.create({
  base: {
    display: 'flex',
    flex: '1 1 0%',
    width: '100%',
    flexDirection: 'column',
    gap: '4rem',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#ffd55f',
    padding: sizes.spacing3,
  },
})
const service_nav_container = stylex.create({
  base: {
    width: '100%',
  },
})
const service_nav = stylex.create({
  base: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(4, 9, 11, 0.1)',
    height: '4rem',
  },
})
const service_auth_button = stylex.create({
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
const service_main_container = stylex.create({
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
const service_main = stylex.create({
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

const service_card_grid = stylex.create({
  base: {
    display: 'grid',
    gap: '2rem',
    margin: '0 2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  },
})

export default async function ProtectedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  //   if (!user) {
  //     return redirect('/login')
  //   }

  return (
    <div {...stylex.props(service_page.base)}>
      <div {...stylex.props(service_page.logo)}>
        <Image alt='simple logo' width={logoSize} height={logoSize} src='/simple_logo.png' />
        <Navigation></Navigation>
      </div>
      <div {...stylex.props(service_nav_container.base)}>
        <nav {...stylex.props(service_nav.base)}>
          <div {...stylex.props(service_auth_button.base)}>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div {...stylex.props(service_main_container.base)}>
        <main {...stylex.props(service_main.base)}>
          <div {...stylex.props(service_main.heading)}>Make a Service Request</div>
          <div {...stylex.props(service_card_grid.base)}>
            <Link href='/servicerequests/safety' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='safety' src='/images/safety.svg' />
              Safety
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='hvac' src='/images/heating_and_cooling.svg' />
              Heating and Cooling
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='pests' src='/images/pests.svg' />
              Pests
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='doors and windows' src='/images/doors_and_windows.svg' />
              Walls, Doors, Windows
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='electrical' src='/images/electrical.svg' />
              Electrical
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='broadband' src='/images/broadband.svg' />
              Broadband
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='laundry' src='/images/laundry.svg' />
              Laundry
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/lock.svg' />
              Door and Lock
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/dishwasher.svg' />
              Dishwasher
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/refrigerator.svg' />
              Refrigerator
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/kitchen_under_plumbing.svg' />
              Kitchen Plumbing
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/bathroom_plumbing.svg' />
              Bathroom Plumbing
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/water_heater.svg' />
              Water Heater
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/roof.svg' />
              Roof and Gutters
            </Link>
            <Link href='/servicerequests' {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/images/tree.svg' />
              Lawn and Landscaping
            </Link>
          </div>
        </main>
      </div>

      <footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'></footer>
    </div>
  )
}
