import './globals.css'
import * as stylex from '@stylexjs/stylex'
import { fonts } from './globalTokens.stylex'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
import { Toaster } from 'react-hot-toast'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import Image from 'next/image'
import Navigation from '@/components/Navigation'

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

const logoSize = 492 / 8

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Marigold',
  description: 'Creating collaborative relationships between property owners and tenants',
}
const servicePage = stylex.create({
  logo: {
    width: '100%',
    backgroundColor: '#ffd55f',
    padding: sizes.spacing3,
  },
})
const s = stylex.create({
  html: {
    colorScheme: 'light dark',
  },
  reset: {
    minHeight: '100%',
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: `${fonts.appFont},Arial`,
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const header = (
    <div {...stylex.props(servicePage.logo)}>
      <Image alt='simple logo' width={logoSize} height={logoSize} src='/simple_logo.png' priority={true} />
      <Navigation></Navigation>
    </div>
  )
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body {...stylex.props(s.reset, s.body)}>
        {header}
        <ReactQueryClientProvider>
          <main>
            <Toaster position='bottom-center' />
            {children}
            <SpeedInsights />
          </main>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
