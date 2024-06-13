'use client'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { borders } from '@stylexjs/open-props/lib/borders.stylex'
import React, { useState } from 'react'

const menuStyles = stylex.create({
  showHamburger: (display) => ({
    display: {
      default: display,
      '@media (min-width: 768px)': 'block',
    },
  }),
  showClosedBurger: (display) => ({
    display,
  }),
})

const styles = stylex.create({
  base: {
    backgroundColor: marigoldColors.flowerGold,
    padding: sizes.spacing2,
    fontSize: fonts.size3,
  },
  header: {
    width: '100%',
  },
  navigationList: {
    listStyle: 'none',
    padding: sizes.spacing2,
    margin: 0,
    backgroundColor: marigoldColors.flowerYellow,
  },

  item: {
    margin: '5px',
    whiteSpace: 'nowrap',
    backgroundColor: marigoldColors.flowerYellow,
    textDecoration: 'none',
    display: {
      default: 'inline-block',
      '@media (max-width: 768px)': 'block',
    },
    paddingLeft: {
      default: sizes.spacing2,
      '@media (max-width: 768px)': 0,
    },
  },
  link: {
    textDecoration: 'none',
    color: marigoldColors.navigationLink,
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
      '@media (max-width: 768px)': 'block',
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
})
export default function Navigation() {
  const [hamburger, setHamburgerVisible] = useState('block')
  const [closedBurger, setClosedBurgerVisible] = useState('none')
  const toggleMenu = () => {
    if (window.innerWidth <= 768) {
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
          <li {...stylex.props(styles.item)}>
            <Link {...stylex.props(styles.link)} href='/technicians'>
              Technicians
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
