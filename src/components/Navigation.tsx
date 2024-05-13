'use client'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import React, { useState } from 'react'

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
  iconOpen: {},
  iconClosed: {
    display: 'none',
  },
  primaryNavigation: {
    marginTop: '45px',
  },
  mobileNavigationToggle: {
    cursor: 'pointer',
    background: 'transparent',
    borderWidth: 0,
    padding: '0.5em',
  },
  screenReaderOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
  navigationButton: {
    display: {
      '@media (min-width: 1400px)': 'none',
    },
    cursor: 'pointer',
    textDecoration: 'none',
    borderWidth: 0,
    borderRadius: '100vmax',
    padding: '1.25em 2.5em',
    fontWeight: 700,
    fontSize: '0.8125rem',
    lineHeight: 1,
    backgroundColor: 'hsl(12, 88%, 59%)',
    boxShadow: '0 1.125em 1em -1em hsl(12, 60%, 45%)',
  },
})
export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false)
    }
  }

  return (
    <header>
      <button
        {...stylex.props(styles.navigationButton, styles.mobileNavigationToggle)}
        id='navigation__toggle'
        aria-controls='primary-navigation'>
        <span {...stylex.props(styles.screenReaderOnly)}>Menu</span>
      </button>
      <nav className='navigation' id='primary-navigation' {...stylex.props(styles.base)}>
        <ul {...stylex.props(styles.navigationList)}>
          <li>
            <Link {...stylex.props(styles.item)} href='/rentals' onClick={closeMenuOnMobile}>
              {/* prettier-ignore */}
              Available Rentals
            </Link>
          </li>
          <li>
            <Link {...stylex.props(styles.item)} href='/servicerequests' onClick={closeMenuOnMobile}>
              {/* prettier-ignore */}
              Service Requests
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
