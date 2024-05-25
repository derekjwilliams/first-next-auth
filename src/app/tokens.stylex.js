import * as stylex from '@stylexjs/stylex'
const DARK = '@media (prefers-color-scheme: dark)';
export const marigoldColors = stylex.defineVars({
  flowerYellow: 'rgb(255 213 95)',
  flowerGold: 'rgb(255 194 0)',
  flowerRed: 'rgb(247 70 0)',
  environmentBrown: 'rgb(214 122 0)',
  leaf: 'rgb(0 81 69)',
  pansy: 'rgb(168 0 173)',
  background: {default: 'rgb(222 222 222)',[DARK]: 'rgb(116 116 116)'},
})
