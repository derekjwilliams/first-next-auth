import Navigation from '@/components/Navigation'
import AuthButton from '@/components/AuthButton'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { marigoldColors } from '../../customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'

const serviceCard = stylex.create({
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

export default async function ProtectedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  //   if (!user) {
  //     return redirect('/login')
  //   }

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
          <div {...stylex.props(servicePage.grid)}>
            <Link draggable={false} href='/servicerequests/safety' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='safety' src='/images/safety.svg' />
              Safety
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='hvac' src='/images/heating_and_cooling.svg' />
              Heating and Cooling
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='pests' src='/images/pests.svg' />
              Pests
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image
                draggable={false}
                height={160}
                width={160}
                alt='doors and windows'
                src='/images/doors_and_windows.svg'
              />
              Walls, Doors, Windows
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='electrical' src='/images/electrical.svg' />
              Electrical
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='broadband' src='/images/broadband.svg' />
              Broadband
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='laundry' src='/images/laundry.svg' />
              Laundry
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/lock.svg' />
              Door and Lock
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/dishwasher.svg' />
              Dishwasher
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/refrigerator.svg' />
              Refrigerator
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/kitchen_under_plumbing.svg' />
              Kitchen Plumbing
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/bathroom_plumbing.svg' />
              Bathroom Plumbing
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/water_heater.svg' />
              Water Heater
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/roof.svg' />
              Roof and Gutters
            </Link>
            <Link draggable={false} href='/servicerequests' {...stylex.props(serviceCard.base)}>
              <Image draggable={false} height={160} width={160} alt='lock' src='/images/tree.svg' />
              Lawn and Landscaping
            </Link>
          </div>
        </main>
      </div>

      <footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'></footer>
    </div>
  )
}
