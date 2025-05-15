import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'
import * as stylex from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'
const environmentBrown = 'rgb(214 122 0)'
const pansy = 'rgb(168 0 173)'
const flowerYellow = 'rgb(255 213 95)'
const leaf = 'rgb(0 81 69)'
const leafHighlight = 'rgb(189 219 163)'
const flowerGold = 'rgb(255 194 0)'
const flowerRed = 'rgb(247 70 0)'
const slate = 'rgb(68, 68, 68)'

export const marigoldColors = stylex.defineVars({
  flowerYellow: flowerYellow,
  flowerGold: flowerGold,
  flowerRed: flowerRed,
  environmentBrown: environmentBrown,
  leaf: leaf,
  leafHighlight: leafHighlight,
  pansy: pansy,
  slate: slate,
  backgroundDetails: { default: 'rgb(245,245,245)', [DARK]: slate },
  backgroundTextarea: { default: 'rgb(245,245,245)', [DARK]: 'rgb(40, 40, 40)' },
  background: { default: 'rgb(222 222 222)', [DARK]: 'rgb(116 116 116)' },
  backgroundData: { default: 'rgb(240 240 240)', [DARK]: 'rgb(116 116 116)' },
  foreground: { default: 'rgb(16 16 16)', [DARK]: 'rgb(222 222 222)' },
  foregroundLink: { default: pansy, [DARK]: 'rgb(221, 216, 247)' },
  foregroundHoverLink: { default: 'rgb(79, 201, 79)', [DARK]: 'rgb(133, 239, 149)' },
  foregroundLinkButton: { default: environmentBrown, [DARK]: flowerGold },
  backgroundLinkButton: { default: 'transparent', [DARK]: 'transparent' },
  foregroundHoverLinkButton: { default: 'rgb(16 16 16)', [DARK]: 'rgb(16 16 16)' },
  backgroundHoverLinkButton: { default: flowerYellow, [DARK]: flowerYellow },
  foregroundButton: { default: 'rgb(16,16,16)', [DARK]: 'rgb(16,16,16)' },
  backgroundButton: { default: 'rgb(244,244,244)', [DARK]: 'rgb(244,244,244)' },
  backgroundHoverButton: { default: flowerYellow, [DARK]: flowerGold },
  navigationLink: { default: pansy, [DARK]: environmentBrown },
  tableBorder: { default: 'rgb(16 16 16)', [DARK]: 'rgb(16 16 16)' },
  link: { default: pansy, [DARK]: leafHighlight },
  primary: {
    default: 'rgb(255 213 95)', // Your flowerYellow softened
    [DARK]: 'rgb(214 122 0)',
  },
  primaryDark: {
    default: 'rgb(255 194 0)', // Your flowerGold
    [DARK]: 'rgb(180 90 0)',
  },
  primaryText: {
    default: colors.gray9, // Using Open Props dark gray
    [DARK]: leafHighlight,
  },
})
