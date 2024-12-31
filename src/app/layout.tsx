import './globals.css'
import * as stylex from '@stylexjs/stylex'
// import { fonts } from './globalTokens.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
// import toast, { Toaster } from 'react-hot-toast'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import Link from 'next/link'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
// import '@uploadthing/react/styles.css'

import { Analytics } from '@vercel/analytics/react'

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

const logoSize = 492 / 8

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Marigold',
  description: 'Creating collaborative relationships between property owners and tenants',
}
const styles = stylex.create({
  html: {
    colorScheme: 'light dark',
  },
  reset: {
    minHeight: '100%',
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: `-apple-system, BlinkMacSystemFont, Arial`,
  },
  top: {
    width: '100%',
    backgroundColor: marigoldColors.flowerYellow,
    paddingLeft: sizes.spacing2,
    paddingTop: sizes.spacing2,
    display: 'flex',
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const header = (
    <div {...stylex.props(styles.top)}>
      <Link href='/'>
        <Image alt='simple logo' width={logoSize} height={logoSize} src='/simple_logo.png' priority={true} />
      </Link>
      <Navigation></Navigation>
    </div>
  )
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body {...stylex.props(styles.reset, styles.body)}>
        {header}
        <ReactQueryClientProvider>
          <main>
            {/* <Toaster position='bottom-center' /> */}
            {children}
            {/* <Analytics /> seems to slow things down*/}
            <SpeedInsights />
          </main>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
