import './globals.css'
import * as stylex from '@stylexjs/stylex'
import { fonts } from './globalTokens.stylex'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Marigold',
  description:
    'Creating collaborative relationships between property owners and tenants',
}

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
      </head>
      <body {...stylex.props(s.reset, s.body)}>
        <main>{children}</main>
      </body>
    </html>
  )
}
