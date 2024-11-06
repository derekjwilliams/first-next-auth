import AuthButton from '../components/AuthButton'
//import { createClient } from '@/lib/supabase/client'
import { createClient } from '@/utils/supabase/client'
import Header from '@/components/Header'
import stylex from '@stylexjs/stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'
import Navigation from '@/components/Navigation'
import React from 'react'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'

const pageStyle = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: sizes.spacing10,
    alignItems: 'center',
    width: '100%',
    color: marigoldColors.foreground,
    backgroundColor: marigoldColors.background,
    fontSize: fonts.size2,
  },
})
const pageNav = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottomWidth: borders.size1,
    width: '100%',
  },
})
const pageNavContent = stylex.create({
  base: {
    display: 'flex',
    padding: sizes.spacing3,
    justifyContent: 'space-between',
    maxWidth: '56rem',
    alignItems: 'flex-end',
  },
})

const pageHeaderContainer = stylex.create({
  base: {
    display: 'flex',
    paddingLeft: sizes.spacing3,
    paddingRight: sizes.spacing3,
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: sizes.spacing10,
    maxWidth: '56rem',
  },
})

const pageMain = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: sizes.spacing5,
  },
})

const pageFooter = stylex.create({
  base: {
    display: 'flex',
    padding: sizes.spacing8,
    justifyContent: 'center',
    borderTopWidth: borders.size1,
    width: '100%',
    fontSize: fonts.size1,
    lineHeight: fonts.lineHeight2,
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
    <React.StrictMode>
      <div {...stylex.props(pageStyle.base)}>
        {/* <Navigation /> */}
        <nav {...stylex.props(pageNav.base)}>
          <div {...stylex.props(pageNavContent.base)}>{isSupabaseConnected && <AuthButton />}</div>
        </nav>
        <div {...stylex.props(pageHeaderContainer.base)}>
          <Header />
          <main {...stylex.props(pageMain.base)}>
            {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
          </main>
        </div>
        <footer {...stylex.props(pageFooter.base)}></footer>
      </div>
    </React.StrictMode>
  )
}
