// marigoldColors.stylex.ts
import * as stylex from '@stylexjs/stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'
import { colorPrimitives } from './colorPrimitives.stylex'

const DARK = '@media (prefers-color-scheme: dark)'

export const marigoldColors = stylex.defineVars({
  // Backgrounds
  test: colorPrimitives.marigoldEggplant,
  backgroundDetails: {
    default: colorPrimitives.marigoldCloud,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  backgroundPage: {
    default: colorPrimitives.marigoldStoneLight,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  backgroundCard: {
    default: colorPrimitives.marigoldStone,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  backgroundData: {
    default: colorPrimitives.marigoldStoneLight,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  backgroundTextarea: {
    default: colorPrimitives.marigoldCloud,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  backgroundButton: {
    default: colorPrimitives.marigoldGoldDesaturated,
    [DARK]: colorPrimitives.marigoldEggplant,
  },
  backgroundButtonHover: {
    default: colorPrimitives.marigoldPetal,
    [DARK]: colorPrimitives.marigoldGold,
  },
  backgroundLinkButton: { default: 'transparent', [DARK]: 'transparent' },
  backgroundHoverLinkButton: {
    default: colorPrimitives.marigoldPetal,
    [DARK]: colorPrimitives.marigoldPetalDesaturated,
  },
  backgroundAccent: {
    default: colorPrimitives.marigoldAmberDesaturated,
    [DARK]: colorPrimitives.marigoldRustDesaturated,
  },
  backgroundShadow: {
    default: colorPrimitives.marigoldSlateDesaturated,
    [DARK]: colorPrimitives.marigoldSlate,
  },

  // Text
  textPrimary: { default: 'rgb(16 16 16)', [DARK]: colorPrimitives.marigoldMist },
  textMuted: {
    default: colorPrimitives.marigoldStoneDarker,
    [DARK]: colorPrimitives.marigoldFog,
  },
  textLink: { default: colorPrimitives.marigoldPetal, [DARK]: colorPrimitives.marigoldGold },
  textLinkHover: {
    default: colorPrimitives.marigoldAmber,
    [DARK]: colorPrimitives.marigoldAmberDesaturated,
  },
  textButton: { default: colorPrimitives.marigoldCenter, [DARK]: colorPrimitives.marigoldMist },
  textLinkButton: {
    default: colorPrimitives.marigoldBrown,
    [DARK]: colorPrimitives.marigoldLeafLightDesaturated,
  },
  textLinkButtonSecondary: {
    default: colorPrimitives.marigoldCenter,
    [DARK]: colorPrimitives.marigoldGoldDesaturated,
  },
  textHoverLinkButton: {
    default: colorPrimitives.marigoldRed,
    [DARK]: colorPrimitives.marigoldRedDesaturated,
  },
  textAccent: { default: colorPrimitives.marigoldRust, [DARK]: colorPrimitives.marigoldRustDesaturated },
  textPrimaryText: { default: colors.gray9, [DARK]: colorPrimitives.marigoldLeafLight },

  // Borders
  borderTable: {
    default: colorPrimitives.marigoldStem,
    [DARK]: colorPrimitives.marigoldLeafDesaturated,
  },
  borderAccent: {
    default: colorPrimitives.marigoldAmber,
    [DARK]: colorPrimitives.marigoldAmberDesaturated,
  },
  borderSubtle: {
    default: colorPrimitives.marigoldStoneDark,
    [DARK]: colorPrimitives.marigoldSlate,
  },

  // Icons
  iconPrimary: {
    default: colorPrimitives.marigoldPetal,
    [DARK]: colorPrimitives.marigoldLeafLight,
  },
  iconAccent: {
    default: colorPrimitives.marigoldAmber,
    [DARK]: colorPrimitives.marigoldAmberDesaturated,
  },
  iconSuccess: {
    default: colorPrimitives.marigoldLeaf,
    [DARK]: colorPrimitives.marigoldLeafDesaturated,
  },
  iconError: { default: colorPrimitives.marigoldRed, [DARK]: colorPrimitives.marigoldRedDesaturated },

  // States
  statePrimary: { default: colorPrimitives.marigoldPetal, [DARK]: colorPrimitives.marigoldBrown },
  statePrimaryDark: {
    default: colorPrimitives.marigoldGold,
    [DARK]: colorPrimitives.marigoldCenterDesaturated,
  },
  stateError: { default: colorPrimitives.marigoldRed, [DARK]: colorPrimitives.marigoldRedDesaturated },
  stateSuccess: {
    default: colorPrimitives.marigoldLeaf,
    [DARK]: colorPrimitives.marigoldLeafLightDesaturated,
  },
  stateWarning: {
    default: colorPrimitives.marigoldAmber,
    [DARK]: colorPrimitives.marigoldAmberDesaturated,
  },
  stateInfo: { default: colorPrimitives.marigoldSky, [DARK]: colorPrimitives.marigoldSlateDesaturated },

  // Primitives (optional)
  // primitives: c,
})
