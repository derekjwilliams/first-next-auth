// marigoldColors.stylex.ts
import * as stylex from '@stylexjs/stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'

const DARK = '@media (prefers-color-scheme: dark)'

const colorPrimitives = {
  // Brights
  marigoldPetal: 'rgb(255, 153, 18)',
  marigoldGold: 'rgb(255, 194, 0)',
  marigoldAmber: 'rgb(232, 104, 14)',
  marigoldRust: 'rgb(200, 60, 0)',
  marigoldRed: 'rgb(247, 70, 0)',

  // Darks
  marigoldCenter: 'rgb(168, 80, 0)',
  marigoldBrown: 'rgb(214, 122, 0)',
  marigoldLeaf: 'rgb(0, 81, 69)',
  marigoldLeafLight: 'rgb(189, 219, 163)',
  marigoldStem: 'rgb(44, 120, 60)',
  marigoldSlate: 'rgb(68, 68, 68)',

  // Neutrals
  marigoldSky: 'rgb(120, 180, 235)',
  marigoldCloud: 'rgb(240, 245, 250)',
  marigoldPath: 'rgb(130, 130, 130)',
  marigoldStoneLight: '#F7F8FA',
  marigoldStone: '#ECEFF1',
  marigoldStoneMid: '#D3D6DA',
  marigoldStoneDark: '#A0A4AA',
  marigoldStoneDarker: '#6B6E74',

  // Dark mode/neutral
  marigoldEggplant: 'rgb(36, 36, 40)',
  marigoldNight: 'rgb(24, 24, 28)',
  marigoldMist: 'rgb(235, 230, 255)',
  marigoldFog: 'rgb(180, 180, 200)',

  // Desaturated versions (approximate, 30-40% less saturation)
  marigoldPetalDesaturated: 'rgb(224, 170, 97)',
  marigoldGoldDesaturated: 'rgb(224, 200, 97)',
  marigoldAmberDesaturated: 'rgb(200, 140, 97)',
  marigoldRustDesaturated: 'rgb(180, 110, 80)',
  marigoldRedDesaturated: 'rgb(210, 120, 97)',

  marigoldCenterDesaturated: 'rgb(150, 110, 80)',
  marigoldBrownDesaturated: 'rgb(180, 140, 97)',
  marigoldLeafDesaturated: 'rgb(60, 100, 90)',
  marigoldLeafLightDesaturated: 'rgb(170, 200, 170)',
  marigoldStemDesaturated: 'rgb(90, 130, 100)',
  marigoldSlateDesaturated: 'rgb(100, 100, 100)',
}

export const marigoldColors = stylex.defineVars({
  // Backgrounds
  test: colorPrimitives.marigoldEggplant,
  backgroundDetails: { default: colorPrimitives.marigoldCloud, [DARK]: colorPrimitives.marigoldEggplant },
  backgroundPage: { default: colorPrimitives.marigoldStoneLight, [DARK]: colorPrimitives.marigoldEggplant },
  backgroundCard: { default: colorPrimitives.marigoldStone, [DARK]: colorPrimitives.marigoldEggplant },
  backgroundData: { default: colorPrimitives.marigoldStoneMid, [DARK]: colorPrimitives.marigoldEggplant },
  backgroundTextarea: { default: colorPrimitives.marigoldCloud, [DARK]: colorPrimitives.marigoldEggplant },
  backgroundButton: { default: colorPrimitives.marigoldGoldDesaturated, [DARK]: colorPrimitives.marigoldEggplant },
  backgroundButtonHover: { default: colorPrimitives.marigoldPetal, [DARK]: colorPrimitives.marigoldGold },
  backgroundLinkButton: { default: 'transparent', [DARK]: 'transparent' },
  backgroundHoverLinkButton: {
    default: colorPrimitives.marigoldPetal,
    [DARK]: colorPrimitives.marigoldPetalDesaturated,
  },
  backgroundAccent: {
    default: colorPrimitives.marigoldAmberDesaturated,
    [DARK]: colorPrimitives.marigoldRustDesaturated,
  },
  backgroundShadow: { default: colorPrimitives.marigoldSlateDesaturated, [DARK]: colorPrimitives.marigoldSlate },

  // Text
  textPrimary: { default: 'rgb(16 16 16)', [DARK]: colorPrimitives.marigoldMist },
  textMuted: { default: colorPrimitives.marigoldStoneDarker, [DARK]: colorPrimitives.marigoldFog },
  textLink: { default: colorPrimitives.marigoldPetal, [DARK]: colorPrimitives.marigoldGold },
  textLinkHover: { default: colorPrimitives.marigoldAmber, [DARK]: colorPrimitives.marigoldAmberDesaturated },
  textButton: { default: colorPrimitives.marigoldCenter, [DARK]: colorPrimitives.marigoldMist },
  textLinkButton: { default: colorPrimitives.marigoldBrown, [DARK]: colorPrimitives.marigoldGold },
  textHoverLinkButton: { default: colorPrimitives.marigoldRed, [DARK]: colorPrimitives.marigoldRedDesaturated },
  textAccent: { default: colorPrimitives.marigoldRust, [DARK]: colorPrimitives.marigoldRustDesaturated },
  textPrimaryText: { default: colors.gray9, [DARK]: colorPrimitives.marigoldLeafLight },

  // Borders
  borderTable: { default: colorPrimitives.marigoldStem, [DARK]: colorPrimitives.marigoldLeafDesaturated },
  borderAccent: { default: colorPrimitives.marigoldAmber, [DARK]: colorPrimitives.marigoldAmberDesaturated },
  borderSubtle: { default: colorPrimitives.marigoldStoneDark, [DARK]: colorPrimitives.marigoldSlate },

  // Icons
  iconPrimary: { default: colorPrimitives.marigoldPetal, [DARK]: colorPrimitives.marigoldLeafLight },
  iconAccent: { default: colorPrimitives.marigoldAmber, [DARK]: colorPrimitives.marigoldAmberDesaturated },
  iconSuccess: { default: colorPrimitives.marigoldLeaf, [DARK]: colorPrimitives.marigoldLeafDesaturated },
  iconError: { default: colorPrimitives.marigoldRed, [DARK]: colorPrimitives.marigoldRedDesaturated },

  // States
  statePrimary: { default: colorPrimitives.marigoldPetal, [DARK]: colorPrimitives.marigoldBrown },
  statePrimaryDark: { default: colorPrimitives.marigoldGold, [DARK]: colorPrimitives.marigoldCenterDesaturated },
  stateError: { default: colorPrimitives.marigoldRed, [DARK]: colorPrimitives.marigoldRedDesaturated },
  stateSuccess: { default: colorPrimitives.marigoldLeaf, [DARK]: colorPrimitives.marigoldLeafLightDesaturated },
  stateWarning: { default: colorPrimitives.marigoldAmber, [DARK]: colorPrimitives.marigoldAmberDesaturated },
  stateInfo: { default: colorPrimitives.marigoldSky, [DARK]: colorPrimitives.marigoldSlateDesaturated },

  // Primitives (optional)
  // primitives: c,
})
