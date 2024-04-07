import './globals.css'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
// import { Provider } from '@/utils/Provider'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Marigold',
  description:
    'Creating collaborative relationships between property owners and tenants',
}

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
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <main>
            <Toaster position='bottom-center' />
            {children}
          </main>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
