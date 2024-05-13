'use client'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import React, { useState } from 'react'

const menuStyles = stylex.create({
  showHamburger: (display) => ({
    display: {
      default: display,
      '@media (min-width: 800px)': 'block',
    },
  }),
  showClosedBurger: (display) => ({
    display,
  }),
})

const styles = stylex.create({
  base: {
    backgroundColor: `${marigoldColors.flowerGold}`,
    padding: '0.5rem',
  },
  header: {
    width: '100%',
  },
  navigationList: {
    listStyle: 'none',
    padding: '0.5rem',
    margin: 0,
    backgroundColor: `${marigoldColors.flowerYellow}`,
  },

  item: {
    margin: 5,
    whiteSpace: 'nowrap',
    backgroundColor: `${marigoldColors.flowerYellow}`,
    // padding: 5,
    textDecoration: 'none',
  },
  link: {
    textDecoration: 'none',
  },

  iconHamburger: {
    display: 'block',
  },
  iconClosedBurger: {
    display: 'none',
  },
  primaryNavigation: {
    marginTop: '45px',
  },
  mobileNavigationToggle: {
    display: {
      default: 'none',
      '@media (max-width: 800px)': 'block',
    },
    cursor: 'pointer',
    background: 'transparent',
    borderWidth: 0,
    padding: '0.5em',
  },
  /**from ally-guildlines */
  visuallyHidden: {
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
      '@media (min-width: 800px)': 'none',
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
  const [hamburger, setHamburgerVisible] = useState('block')
  const [closedBurger, setClosedBurgerVisible] = useState('none')
  const toggleMenu = () => {
    console.log(window.innerWidth)
    if (window.innerWidth <= 800) {
      setHamburgerVisible(hamburger !== 'block' ? 'block' : 'none')
      setClosedBurgerVisible(closedBurger !== 'block' ? 'block' : 'none')
    }
  }

  return (
    <header {...stylex.props(styles.header)}>
      <button
        {...stylex.props(styles.mobileNavigationToggle)}
        id='navigation__toggle'
        aria-controls='primary-navigation'
        onClick={toggleMenu}>
        <img
          src='/images/icon-hamburger.svg'
          alt=''
          {...stylex.props(styles.iconHamburger, menuStyles.showHamburger(hamburger))}></img>
        <img
          src='/images/icon-close.svg'
          alt=''
          {...stylex.props(styles.iconClosedBurger, menuStyles.showClosedBurger(closedBurger))}></img>
        <span {...stylex.props(styles.visuallyHidden)}>Menu</span>
      </button>
      <nav
        className='navigation'
        id='primary-navigation'
        {...stylex.props(styles.base, menuStyles.showHamburger(closedBurger))}>
        <ul {...stylex.props(styles.navigationList)}>
          <li {...stylex.props(styles.item)}>
            <Link {...stylex.props(styles.link)} href='/rentals'>
              Available Rentals
            </Link>
          </li>
          <li {...stylex.props(styles.item)}>
            <Link {...stylex.props(styles.link)} href='/servicerequests/new'>
              Service Requests
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
