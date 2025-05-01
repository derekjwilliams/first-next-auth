import AuthButton from '../../components/AuthButton'
import { createClient } from '../../lib/supabase-api/client'
import Header from '../../components/Header'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import { colors } from '../open-props/lib/colors.stylex'
import { marigoldColors } from '../customStyles/marigoldColors.stylex'

const message = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    marginBottom: '8px',
    padding: '4px',
    alignItems: 'center',
    fontSize: '1rem',
    color: colors.gray1,
    backgroundColor: marigoldColors.flowerRed,
  },
})

const styles = stylex.create({
  nav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: '1px solid var(--foreground/10)',
    height: '16',
  },
  navInner: {
    width: '100%',
    maxWidth: '4xl',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3',
    fontSize: 'sm',
  },
  mainContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '20',
    maxWidth: '4xl',
    paddingLeft: '3',
    paddingRight: '3',
  },
  mainContent: { flex: '1', display: 'flex', flexDirection: 'column', gap: '6' },
  footer: {
    width: '100%',
    borderTop: '1px solid var(--foreground/10)',
    padding: '8',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 'xs',
  },
})

export default async function ProtectedPage() {
  const supabase = await createClient()

  return (
    <div>
      <div>
        <div {...stylex.props(message.base)}>
          This is a protected page that you can only see as an authenticated user
        </div>
        <nav {...stylex.props(styles.nav)}>
          <div {...stylex.props(styles.navInner)}>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div {...stylex.props(styles.mainContainer)}>
        <Header />
        <main {...stylex.props(styles.mainContent)}>
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <FetchDataSteps /> */}
        </main>
      </div>

      <footer {...stylex.props(styles.footer)}></footer>
    </div>
  )
}
