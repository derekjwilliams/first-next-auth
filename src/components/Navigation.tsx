import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'

const styles = stylex.create({
  base: {
    backgroundColor: `${marigoldColors.flowerGold}`,
    padding: '1rem',
  },
  navigationList: {
    listStyle: 'none',
  },
  item: {
    margin: 100,
    whiteSpace: 'nowrap',
    backgroundColor: `${marigoldColors.flowerYellow}`,
    padding: 5,
    textDecoration: 'none',
  },
  itemNumber: {
    fontWeight: 700,
    marginInlineEnd: '0.5em',
  },
})
export default function Navigation() {
  return (
    <nav className='navigation' {...stylex.props(styles.base)}>
      <ul {...stylex.props(styles.navigationList)}>
        <li>
          <Link {...stylex.props(styles.item)} href='/rentals'>
            {/* prettier-ignore */}
            <span {...stylex.props(styles.itemNumber)} aria-hidden='true'>01</span>
            Available Rentals
          </Link>
        </li>
        <li>
          <Link {...stylex.props(styles.item)} href='/servicerequests'>
            {/* prettier-ignore */}
            <span {...stylex.props(styles.itemNumber)} aria-hidden='true'>02</span>
            Service Requests
          </Link>
        </li>
      </ul>
    </nav>
  )
}
