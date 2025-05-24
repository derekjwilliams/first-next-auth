'use client'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import React, { useState } from 'react'
import { colorPrimitives } from '../app/customStyles/colorPrimitives.stylex'

const menuStyles = stylex.create({
  showNav: (display) => ({
    display: {
      default: display,
      '@media (min-width: 768px)': 'block',
    },
  }),
  showHamburger: (display) => ({
    display,
  }),
  showClosedBurger: (display) => ({
    display,
  }),
})

const styles = stylex.create({
  responsiveNavButton: {
    display: {
      default: 'block',
      '@media (min-width: 768px)': 'none',
    },
    marginTop: {
      default: '28px',
      '@media (min-width: 768px)': '0',
    },
  },
  base: {
    paddingBottom: sizes.spacing1,
    fontSize: fonts.size2,
  },
  header: {
    display: 'inline-flex',
    // width: '100%',
    backgroundColor: colorPrimitives.marigoldYellow,
  },
  navigationList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: '28px',
    backgroundColor: colorPrimitives.marigoldYellow,
  },

  item: {
    margin: '5px',
    whiteSpace: 'nowrap',
    backgroundColor: colorPrimitives.marigoldYellow,
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
    setHamburgerVisible(hamburger !== 'block' ? 'block' : 'none')
    setClosedBurgerVisible(closedBurger !== 'block' ? 'block' : 'none')
  }

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.responsiveNavButton)}>
        <button
          {...stylex.props(styles.mobileNavigationToggle)}
          id='navigation__toggle'
          aria-controls='primary-navigation'
          onClick={toggleMenu}>
          <div {...stylex.props(styles.iconHamburger, menuStyles.showHamburger(hamburger))}>
            <img
              src='/images/icon-hamburger.svg'
              alt=''></img>
          </div>
          <div {...stylex.props(styles.iconClosedBurger, menuStyles.showClosedBurger(closedBurger))}>
            <img
              src='/images/icon-close.svg'
              alt=''></img>
          </div>
          <span {...stylex.props(styles.visuallyHidden)}>Menu</span>
        </button>
      </div>
      <nav
        id='primary-navigation'
        {...stylex.props(styles.base, menuStyles.showNav(closedBurger))}>
        <ul {...stylex.props(styles.navigationList)}>
          <li
            key='properties'
            {...stylex.props(styles.item)}>
            <Link
              {...stylex.props(styles.link)}
              href='/properties'>
              Properties
            </Link>
          </li>
          <li
            key='servicerequests'
            {...stylex.props(styles.item)}>
            <Link
              {...stylex.props(styles.link)}
              href='/servicetypes'>
              Service Requests
            </Link>
          </li>
          <li
            key='technicians'
            {...stylex.props(styles.item)}>
            <Link
              {...stylex.props(styles.link)}
              href='/technicians'>
              Technicians
            </Link>
          </li>
          <li
            key='rentals'
            {...stylex.props(styles.item)}>
            <Link
              {...stylex.props(styles.link)}
              href='/rentals'>
              Available Rentals
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
