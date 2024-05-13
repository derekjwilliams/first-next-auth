import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import AuthButton from '../components/AuthButton'

const styles = stylex.create({
  bar: {
    backgroundColor: `${marigoldColors.flowerGold}`,
    padding: '1rem',
  },
  item: {
    margin: 100,
    whiteSpace: 'nowrap',
    backgroundColor: `${marigoldColors.flowerYellow}`,
    padding: 5,
  },
})
export default function Navigation() {
  return (
    <div {...stylex.props(styles.bar)}>
      <Link {...stylex.props(styles.item)} href='/rentals'>
        Available Rentals
      </Link>
      <Link {...stylex.props(styles.item)} href='/servicerequests'>
        Service Requests
      </Link>
    </div>
  )
}
