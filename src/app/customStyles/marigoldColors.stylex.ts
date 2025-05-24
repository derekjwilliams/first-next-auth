import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'
import * as stylex from '@stylexjs/stylex'
import { colorPrimitives } from './colorPrimitives.stylex'

const DARK = '@media (prefers-color-scheme: dark)'
// const environmentBrown = 'rgb(214 122 0)'
// const pansy = 'rgb(168 0 173)'
// const pansyDark = 'rgb(160 90 170)'
// const flowerYellow = 'rgb(255 213 95)'
// const leaf = 'rgb(0 81 69)'
// const leafHighlight = 'rgb(189 219 163)'
// const flowerGold = 'rgb(255 194 0)'
// const flowerRed = 'rgb(247 70 0)'
// const slate = 'rgb(68, 68, 68)'

// New/adjusted colors for better dark mode
const darkCard = 'rgb(36, 36, 40)' // Card background in dark mode
const darkPage = 'rgb(24, 24, 28)' // Page background in dark mode
const darkText = 'rgb(235, 230, 255)' // Light text for dark mode
const lightText = 'rgb(20, 20, 20)' // Light text for dark mode
const darkMuted = 'rgb(180, 180, 200)' // Muted text for dark mode

export const marigoldColors = stylex.defineVars({
  // flowerYellow,
  // flowerGold,
  // flowerRed,
  // environmentBrown,
  // leafHighlight,
  // slate,
  // leaf: { default: leaf, [DARK]: leafHighlight },
  // pansy: { default: pansy, [DARK]: pansyDark },
  tableBorder: { default: colorPrimitives.pansy, [DARK]: colorPrimitives.pansyDark },
  backgroundTextarea: { default: 'rgb(245,245,245)', [DARK]: 'rgb(40, 40, 40)' },
  navigationLink: { default: colorPrimitives.pansy, [DARK]: colorPrimitives.environmentBrown },

  // Label
  label: { default: colorPrimitives.marigoldStoneDarker, [DARK]: colorPrimitives.marigoldStoneLight },

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
  foregroundLink: { default: colorPrimitives.pansy, [DARK]: 'rgb(221, 216, 247)' },
  foregroundHoverLink: { default: 'rgb(79, 201, 79)', [DARK]: 'rgb(133, 239, 149)' },

  // Buttons/links
  foregroundLinkButton: { default: colorPrimitives.environmentBrown, [DARK]: colorPrimitives.marigoldGold },
  backgroundLinkButton: { default: 'transparent', [DARK]: 'transparent' },
  foregroundHoverLinkButton: { default: 'rgb(16 16 16)', [DARK]: 'rgb(16 16 16)' },
  backgroundHoverLinkButton: { default: colorPrimitives.marigoldYellow, [DARK]: colorPrimitives.marigoldYellow },
  foregroundButton: { default: 'rgb(16,16,16)', [DARK]: darkText },
  foregroundHoverButton: { default: 'rgb(16,16,16)', [DARK]: 'lightText' },
  backgroundButton: { default: colorPrimitives.marigoldLeafLight, [DARK]: darkCard },
  backgroundHoverButton: { default: colorPrimitives.marigoldYellow, [DARK]: colorPrimitives.marigoldGold },

  // Misc
  link: { default: colorPrimitives.pansy, [DARK]: colorPrimitives.marigoldLeafLight },
  primary: { default: colorPrimitives.marigoldYellow, [DARK]: colorPrimitives.environmentBrown },
  primaryDark: { default: colorPrimitives.marigoldGold, [DARK]: 'rgb(180 90 0)' },
  primaryText: { default: colors.gray9, [DARK]: colorPrimitives.marigoldLeafLight },
  cardBackground: { default: colorPrimitives.marigoldStoneLight, [DARK]: colorPrimitives.marigoldEggplant },
  borderSubtle: {
    default: colorPrimitives.marigoldStoneDark,
    [DARK]: colorPrimitives.marigoldSlate,
  },
  textPrimary: { default: colorPrimitives.marigoldStoneDarker, [DARK]: colorPrimitives.marigoldMist },
  textMuted: {
    default: colorPrimitives.marigoldStoneDarker,
    [DARK]: colorPrimitives.marigoldFog,
  },
  backgroundPage: {
    default: colorPrimitives.marigoldStoneLight,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  borderAccent: {
    default: colorPrimitives.marigoldAmber,
    [DARK]: colorPrimitives.marigoldAmberDesaturated,
  },
  textLinkButton: {
    default: colorPrimitives.marigoldBrown,
    [DARK]: colorPrimitives.marigoldLeafLightDesaturated,
  },
  textLinkButtonSecondary: {
    default: colorPrimitives.marigoldCenter,
    [DARK]: colorPrimitives.marigoldGoldDesaturated,
  },
  tableHeaderBackground: {
    default: colorPrimitives.marigoldStone,
    [DARK]: colorPrimitives.marigoldNight,
  },
  tableHeaderText: {
    default: colorPrimitives.marigoldStoneDarker,
    [DARK]: colorPrimitives.marigoldMist,
  },
  tableRowHover: {
    default: colorPrimitives.marigoldStoneLighter,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  tableRowAlternate: {
    default: colorPrimitives.marigoldStoneLightest,
    [DARK]: colorPrimitives.marigoldNight,
  },
  statusOpen: {
    default: colorPrimitives.marigoldLeaf,
    [DARK]: colorPrimitives.marigoldLeafDesaturated,
  },
  statusClosed: {
    default: colorPrimitives.marigoldSlate,
    [DARK]: colorPrimitives.marigoldSlateDesaturated,
  },
  statusInProgress: {
    default: colorPrimitives.marigoldAmber,
    [DARK]: colorPrimitives.marigoldAmberDesaturated,
  },
  tableBorderMain: {
    default: colorPrimitives.marigoldStoneMid,
    [DARK]: colorPrimitives.marigoldSlate,
  },
})
