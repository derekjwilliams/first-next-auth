import AuthButton from '@/components/AuthButton'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
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

export default async function ProtectedPage() {
  const supabase = await createClient()

  return (
    <div>
      <div>
        <div {...stylex.props(message.base)}>
          This is a protected page that you can only see as an authenticated user
        </div>
        <nav>
          <div>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div>
        <Header />
        <main></main>
      </div>

      <footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'></footer>
    </div>
  )
}
