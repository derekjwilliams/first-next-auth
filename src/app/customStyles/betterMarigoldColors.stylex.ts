// marigoldColors.stylex.ts
import * as stylex from '@stylexjs/stylex'
import { colorPrimitives as c } from './colorPrimitives.stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'

const DARK = '@media (prefers-color-scheme: dark)'

export const marigoldColors = stylex.defineVars({
  background: {
    page: { default: c.marigoldGrayPage, [DARK]: c.marigoldNight },
    data: { default: c.marigoldGrayBorder, [DARK]: c.marigoldEggplant },
    card: { default: c.marigoldGrayLighter, [DARK]: c.marigoldEggplant },
    details: { default: c.marigoldGrayLight, [DARK]: c.marigoldEggplant },
    textarea: { default: c.marigoldGrayLight, [DARK]: c.marigoldCharcoal },
    button: { default: c.marigoldGrayMid, [DARK]: c.marigoldEggplant },
    buttonHover: { default: c.marigoldYellow, [DARK]: c.marigoldGold },
    linkButton: { default: 'transparent', [DARK]: 'transparent' },
    hoverLinkButton: { default: c.marigoldYellow, [DARK]: c.marigoldYellow },
  },
  text: {
    primary: { default: 'rgb(16 16 16)', [DARK]: c.marigoldMist },
    muted: { default: 'rgb(90,90,90)', [DARK]: c.marigoldFog },
    link: { default: c.marigoldPansy, [DARK]: 'rgb(221, 216, 247)' },
    linkHover: { default: 'rgb(79, 201, 79)', [DARK]: 'rgb(133, 239, 149)' },
    button: { default: 'rgb(16,16,16)', [DARK]: c.marigoldMist },
    linkButton: { default: c.marigoldBrown, [DARK]: c.marigoldGold },
    hoverLinkButton: { default: 'rgb(16 16 16)', [DARK]: 'rgb(16 16 16)' },
    primaryText: { default: colors.gray9, [DARK]: c.marigoldLeafLight },
  },
  border: {
    table: { default: c.marigoldPansy, [DARK]: c.marigoldPansyDark },
  },
  icon: {
    primary: { default: c.marigoldPansy, [DARK]: c.marigoldLeafLight },
  },
  state: {
    primary: { default: c.marigoldYellow, [DARK]: c.marigoldBrown },
    primaryDark: { default: c.marigoldGold, [DARK]: 'rgb(180 90 0)' },
    error: { default: c.marigoldRed, [DARK]: c.marigoldRed },
    success: { default: c.marigoldLeaf, [DARK]: c.marigoldLeafLight },
  },
  // Optionally expose primitives for rare direct use:
  primitives: {
    yellow: c.marigoldYellow,
    gold: c.marigoldGold,
    red: c.marigoldRed,
    brown: c.marigoldBrown,
    leaf: c.marigoldLeaf,
    leafLight: c.marigoldLeafLight,
    pansy: c.marigoldPansy,
    pansyDark: c.marigoldPansyDark,
    slate: c.marigoldSlate,
    grayLight: c.marigoldGrayLight,
    grayLighter: c.marigoldGrayLighter,
    grayMid: c.marigoldGrayMid,
    grayBorder: c.marigoldGrayBorder,
    grayPage: c.marigoldGrayPage,
    eggplant: c.marigoldEggplant,
    night: c.marigoldNight,
    mist: c.marigoldMist,
    fog: c.marigoldFog,
    charcoal: c.marigoldCharcoal,
  },
})
