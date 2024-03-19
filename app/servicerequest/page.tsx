import AuthButton from '@/components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'

const service_card = stylex.create({
  base: {
    fontSize: '16px',
    backgroundColor: '#e9ecef',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
    borderRadius: '0.5rem',
    placeItems: 'center',
    display: 'grid',
    minWidth: '200px',
    minHeight: '200px',
    padding: '10px',
  },
})
const service_page = stylex.create({
  base: {
    display: 'flex',
    flex: '1 1 0%',
    width: '100%',
    flexDirection: 'column',
    gap: '5rem',
    alignItems: 'center',
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
    gap: '1.5rem',
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
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  //   if (!user) {
  //     return redirect('/login')
  //   }

  return (
    <div {...stylex.props(service_page.base)}>
      <div {...stylex.props(service_nav_container.base)}>
        <nav {...stylex.props(service_nav.base)}>
          <div {...stylex.props(service_auth_button.base)}>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div {...stylex.props(service_main_container.base)}>
        <main {...stylex.props(service_main.base)}>
          <div>Make a Service Request</div>
          <div {...stylex.props(service_card_grid.base)}>
            <div {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='safety' src='/safety.svg' />
              Safety
            </div>
            <div {...stylex.props(service_card.base)}>
              <Image
                height={160}
                width={160}
                alt='hvac'
                src='/heating_and_cooling.svg'
              />
              Heating and Cooling
            </div>
            <div {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='pests' src='/pests.svg' />
              Pests
            </div>
            <div {...stylex.props(service_card.base)}>
              <Image
                height={160}
                width={160}
                alt='doors and windows'
                src='/doors_and_windows.svg'
              />
              Walls, Doors, Windows
            </div>
            <div {...stylex.props(service_card.base)}>
              <Image
                height={160}
                width={160}
                alt='electrical'
                src='/electrical.svg'
              />
              Electrical
            </div>
            <div {...stylex.props(service_card.base)}>
              <Image
                height={160}
                width={160}
                alt='broadband'
                src='/broadband.svg'
              />
              Broadband
            </div>
            <div {...stylex.props(service_card.base)}>
              <Image
                height={160}
                width={160}
                alt='laundry'
                src='/laundry.svg'
              />
              Laundry
            </div>
            <div {...stylex.props(service_card.base)}>
              <Image height={160} width={160} alt='lock' src='/lock.svg' />
              Door and Lock
            </div>
            <div {...stylex.props(service_card.base)}>Kitchen Plumbing</div>
            <div {...stylex.props(service_card.base)}>Dishwasher</div>
            <div {...stylex.props(service_card.base)}>Refrigerator</div>
            <div {...stylex.props(service_card.base)}>Bathroom Plumbing</div>
            <div {...stylex.props(service_card.base)}>Water Heater</div>
            <div {...stylex.props(service_card.base)}>Roof</div>
            <div {...stylex.props(service_card.base)}>Gutters</div>
            <div {...stylex.props(service_card.base)}>
              Trees, Lawn, Landscaping
            </div>
          </div>
        </main>
      </div>

      <footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'></footer>
    </div>
  )
}
