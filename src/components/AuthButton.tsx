import { createClient } from '../lib/supabase/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colorPrimitives } from '../app/customStyles/colorPrimitives.stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/colors.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'

const authButtonWrapper = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '20%',
    color: colorPrimitives.marigoldSlate,
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
      ':hover': colorPrimitives.marigoldYellow,
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
    <Link
      href='/login'
      {...stylex.props(authButton.base)}>
      Login
    </Link>
  )
}
