import AuthButton from '../components/AuthButton'
import { createClient } from '../lib/supabase/client'
import Header from '../components/Header'
import stylex from '@stylexjs/stylex'
// import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import React from 'react'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { spacingPatterns } from './customStyles/spacingPatterns.stylex'

const pageStyle = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: spacingPatterns.gapXLarge,
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
    padding: spacingPatterns.gapMedium,
    justifyContent: 'space-between',
    maxWidth: '56rem',
    alignItems: 'flex-end',
  },
})

const pageHeaderContainer = stylex.create({
  base: {
    display: 'flex',
    paddingLeft: spacingPatterns.gapMedium,
    paddingRight: spacingPatterns.gapMedium,
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: spacingPatterns.gapXLarge,
    maxWidth: '56rem',
  },
})

const pageMain = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    gap: spacingPatterns.gapLarge,
  },
})

const pageFooter = stylex.create({
  base: {
    display: 'flex',
    padding: spacingPatterns.gapXLarge,
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
