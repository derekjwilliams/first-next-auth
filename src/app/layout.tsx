import './uploadthing.css'
import './globals.css'
import * as stylex from '@stylexjs/stylex'
import { spacingPatterns } from '../app/customStyles/spacingPatterns.stylex'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import Link from 'next/link'
import { colorPrimitives } from '../app/customStyles/colorPrimitives.stylex'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from './api/uploadthing/core'
// TODO import { PermissionsProvider } from '@/context/PermissionsContext'
// import LoginButtons from '@/components/LoginButtons'; // Keep or modify as needed
import { marigoldColors } from './customStyles/marigoldColors.stylex'

// import { Analytics } from '@vercel/analytics/react'

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
    background: marigoldColors.backgroundCard,
  },
  top: {
    width: '100%',
    backgroundColor: colorPrimitives.marigoldYellow,
    paddingLeft: spacingPatterns.gapSmall,
    paddingTop: spacingPatterns.gapSmall,
    display: 'flex',
  },
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const userAttributes = await getCurrentUserAttributes()
  const header = (
    <div {...stylex.props(styles.top)}>
      <Link href='/'>
        <Image
          alt='simple logo'
          width={logoSize}
          height={logoSize}
          src='/simple_logo.png'
          priority={true}
        />
      </Link>
      <Navigation></Navigation>
    </div>
  )
  return (
    <html lang='en'>
      <head>
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
      </head>
      <body {...stylex.props(styles.reset, styles.body)}>
        {/* <PermissionsProvider initialUser={userAttributes}> */}
        {header}
        <ReactQueryClientProvider>
          <main>
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            {/* <Toaster position='bottom-center' /> */}
            {children}

            {/* <Analytics /> seems to slow things down*/}
            {/* <SpeedInsights /> */}
          </main>
        </ReactQueryClientProvider>
        {/* </PermissionsProvider> */}
      </body>
    </html>
  )
}
