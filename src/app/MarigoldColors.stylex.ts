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

export const tokens = stylex.defineVars({
  flowerYellow: flowerYellow,
  flowerGold: flowerGold,
  flowerRed: flowerRed,
  environmentBrown: environmentBrown,
  leaf: leaf,
  leafHighlight: leafHighlight,
  pansy: pansy,
  slate: slate,
  backgroundDetails: 'rgb(245,245,245)',
  backgroundTextarea: 'rgb(245,245,245)',
  background: 'rgb(222 222 222)',
  backgroundData: 'rgb(240 240 240)',
  foreground: 'rgb(16 16 16)',
  foregroundLink: pansy,
  foregroundHoverLink: 'rgb(79, 201, 79)',
  foregroundLinkButton: environmentBrown,
  backgroundLinkButton: 'transparent',
  foregroundHoverLinkButton: 'rgb(16 16 16)',
  backgroundHoverLinkButton: flowerYellow,
  foregroundButton: 'rgb(16,16,16)',
  backgroundButton: 'rgb(244,244,244)',
  backgroundHoverButton: flowerYellow,
  navigationLink: pansy,
  tableBorder: 'rgb(16 16 16)',
  link: pansy,
})
