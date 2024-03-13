import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import Header from '@/components/Header'
// import * as stylex from "@stylexjs/stylex";
import stylex from '@stylexjs/stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'

const pageStyle = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '5rem',
    alignItems: 'center',
    width: '100%',
    color: colors.gray9,
    fontSize: '16px',
  },
})
const pageNav = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottomWidth: '1px',
    width: '100%',
    height: '4rem',
  },
})
const pageNavContent = stylex.create({
  base: {
    display: 'flex',
    padding: '0.75rem',
    justifyContent: 'space-between',
    maxWidth: '56rem',
    alignItems: 'flex-end',
  },
})

const pageHeaderContainer = stylex.create({
  base: {
    display: 'flex',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '5rem',
    maxWidth: '56rem',
    // opacity: 0
  },
})

const pageMain = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: '1.5rem',
  },
})

const pageFooter = stylex.create({
  base: {
    display: 'flex',
    padding: '2rem',
    justifyContent: 'center',
    borderTopWidth: '1px',
    width: '100%',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    textAlign: 'center',
  },
})

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient()
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className={stylex(pageStyle.base)}>
      <nav className={stylex(pageNav.base)}>
        <div className={stylex(pageNavContent.base)}>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className={stylex(pageHeaderContainer.base)}>
        <Header />
        <main className={stylex(pageMain.base)}>
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        </main>
      </div>
      <footer className={stylex(pageFooter.base)}></footer>
    </div>
  )
}
