import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'

const authButtonWrapper = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
})
const authButton = stylex.create({
  base: {
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'grid',
    padding: sizes.spacing2,
    backgroundColor: {
      default: colors.gray0,
      ':hover': marigoldColors.flowerYellow,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    borderRadius: borders.radius2,
  },
})

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div {...stylex.props(authButtonWrapper.base)}>
      {user.email}
      <form action={signOut}>
        <button {...stylex.props(authButton.base)}>Logout</button>
      </form>
    </div>
  ) : (
    <Link href='/login' {...stylex.props(authButton.base)}>
      Login
    </Link>
  )
}
