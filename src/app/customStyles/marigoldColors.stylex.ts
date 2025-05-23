import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'
import * as stylex from '@stylexjs/stylex'
import { colorPrimitives } from './colorPrimitives.stylex'

const DARK = '@media (prefers-color-scheme: dark)'
const environmentBrown = 'rgb(214 122 0)'
const pansy = 'rgb(168 0 173)'
const pansyDark = 'rgb(160 90 170)'
const flowerYellow = 'rgb(255 213 95)'
const leaf = 'rgb(0 81 69)'
const leafHighlight = 'rgb(189 219 163)'
const flowerGold = 'rgb(255 194 0)'
const flowerRed = 'rgb(247 70 0)'
const slate = 'rgb(68, 68, 68)'

// New/adjusted colors for better dark mode
const darkCard = 'rgb(36, 36, 40)' // Card background in dark mode
const darkPage = 'rgb(24, 24, 28)' // Page background in dark mode
const darkText = 'rgb(235, 230, 255)' // Light text for dark mode
const darkMuted = 'rgb(180, 180, 200)' // Muted text for dark mode

export const marigoldColors = stylex.defineVars({
  flowerYellow,
  flowerGold,
  flowerRed,
  environmentBrown,
  leaf: { default: leaf, [DARK]: leafHighlight },
  leafHighlight,
  pansy: { default: pansy, [DARK]: pansyDark },
  tableBorder: { default: pansy, [DARK]: pansyDark },
  slate,
  backgroundTextarea: { default: 'rgb(245,245,245)', [DARK]: 'rgb(40, 40, 40)' },
  navigationLink: { default: pansy, [DARK]: environmentBrown },

  // Label
  label: { default: colorPrimitives.marigoldStoneMid, [DARK]: colorPrimitives.marigoldStoneLight },

  // Text input
  textInputBorder: { default: colorPrimitives.marigoldStoneMid, [DARK]: colorPrimitives.marigoldStoneLight },
  textInputBackground: { default: colorPrimitives.marigoldStoneLighter, [DARK]: colorPrimitives.marigoldStoneDarker },
  textInputColor: { default: colorPrimitives.marigoldStoneDarker, [DARK]: colorPrimitives.marigoldStoneLight },

  // Select input
  selectInputBorder: { default: colorPrimitives.marigoldStoneMid, [DARK]: colorPrimitives.marigoldStoneLight },
  selectBackground: { default: colorPrimitives.marigoldStoneLightest, [DARK]: colorPrimitives.marigoldStoneDarker },
  selectInputColor: { default: colorPrimitives.marigoldStoneDarker, [DARK]: colorPrimitives.marigoldStoneLight },

  // Checkbox input
  checkboxInputBorder: { default: colorPrimitives.marigoldStoneDark, [DARK]: colorPrimitives.marigoldStoneLight },
  checkboxIcon: { default: colorPrimitives.marigoldStoneDarker, [DARK]: colorPrimitives.marigoldStoneLight },
  checkboxInputBackground: {
    default: colorPrimitives.marigoldStoneLighter,
    [DARK]: colorPrimitives.marigoldStoneDarker,
  },

  // Text area
  textAreaBorder: { default: colorPrimitives.marigoldStoneMid, [DARK]: colorPrimitives.marigoldStoneLight },
  textAreaBackground: { default: colorPrimitives.marigoldStoneLighter, [DARK]: colorPrimitives.marigoldStoneDarker },
  textAreaColor: { default: colorPrimitives.marigoldStoneDarker, [DARK]: colorPrimitives.marigoldStoneLight },

  // Page backgrounds
  background: { default: 'rgb(222 222 222)', [DARK]: darkPage },
  backgroundData: { default: 'rgb(240 240 240)', [DARK]: darkCard },

  // Card/surface backgrounds
  backgroundDetails: { default: 'rgb(245,245,245)', [DARK]: darkCard },
  backgroundCard: { default: 'rgb(255,255,255)', [DARK]: darkCard }, // new

  // Text
  textAccent: { default: colorPrimitives.marigoldRust, [DARK]: colorPrimitives.marigoldRustDesaturated },
  foreground: { default: 'rgb(16 16 16)', [DARK]: darkText },
  foregroundMuted: { default: 'rgb(90,90,90)', [DARK]: darkMuted }, // new
  foregroundLink: { default: pansy, [DARK]: 'rgb(221, 216, 247)' },
  foregroundHoverLink: { default: 'rgb(79, 201, 79)', [DARK]: 'rgb(133, 239, 149)' },

  // Buttons/links
  foregroundLinkButton: { default: environmentBrown, [DARK]: flowerGold },
  backgroundLinkButton: { default: 'transparent', [DARK]: 'transparent' },
  foregroundHoverLinkButton: { default: 'rgb(16 16 16)', [DARK]: 'rgb(16 16 16)' },
  backgroundHoverLinkButton: { default: flowerYellow, [DARK]: flowerYellow },
  foregroundButton: { default: 'rgb(16,16,16)', [DARK]: darkText },
  backgroundButton: { default: 'rgb(244,244,244)', [DARK]: darkCard },
  backgroundHoverButton: { default: flowerYellow, [DARK]: flowerGold },

  // Misc
  link: { default: pansy, [DARK]: leafHighlight },
  primary: { default: flowerYellow, [DARK]: environmentBrown },
  primaryDark: { default: flowerGold, [DARK]: 'rgb(180 90 0)' },
  primaryText: { default: colors.gray9, [DARK]: leafHighlight },
  cardBackground: { default: colorPrimitives.marigoldStoneLight, [DARK]: colorPrimitives.marigoldEggplant },
})
