import * as stylex from '@stylexjs/stylex'
const DARK = '@media (prefers-color-scheme: dark)';
const environmentBrown = 'rgb(214 122 0)'
const pansy = 'rgb(168 0 173)'
const flowerYellow='rgb(255 213 95)'
const leaf = 'rgb(0 81 69)'
const leafHighlight = 'rgb(189 219 163)'
const flowerGold = 'rgb(255 194 0)'
const flowerRed = 'rgb(247 70 0)'
export const marigoldColors = stylex.defineVars({
  flowerYellow: flowerYellow,
  flowerGold: flowerGold,
  flowerRed: flowerRed,
  environmentBrown: environmentBrown,
  leaf: leaf,
  leafHighlight: leafHighlight,
  pansy: pansy,
  background: {default: 'rgb(222 222 222)',[DARK]: 'rgb(116 116 116)'},
  foreground: {default: 'rgb(16 16 16)',[DARK]: 'rgb(222 222 222)'},
  navigationLink: {default: pansy,[DARK]: environmentBrown},
  link: {default: pansy,[DARK]: leafHighlight},
})
