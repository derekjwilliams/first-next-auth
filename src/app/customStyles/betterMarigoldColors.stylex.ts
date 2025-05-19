// marigoldColors.stylex.ts
import * as stylex from '@stylexjs/stylex'
import { colorPrimitives as c } from './colorPrimitives.stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/lib/colors.stylex'

const DARK = '@media (prefers-color-scheme: dark)'

export const marigoldColors = stylex.defineVars({
  background: {
    page: { default: c.marigoldCloud, [DARK]: c.marigoldNight },
    data: { default: c.marigoldPath, [DARK]: c.marigoldEggplant },
    card: { default: c.marigoldCloud, [DARK]: c.marigoldEggplant },
    details: { default: c.marigoldSky, [DARK]: c.marigoldEggplant },
    textarea: { default: c.marigoldCloud, [DARK]: c.marigoldEggplant },
    button: { default: c.marigoldGoldDesaturated, [DARK]: c.marigoldEggplant },
    buttonHover: { default: c.marigoldPetal, [DARK]: c.marigoldGold },
    linkButton: { default: 'transparent', [DARK]: 'transparent' },
    hoverLinkButton: { default: c.marigoldPetal, [DARK]: c.marigoldPetalDesaturated },
    accent: { default: c.marigoldAmberDesaturated, [DARK]: c.marigoldRustDesaturated },
    shadow: { default: c.marigoldSlateDesaturated, [DARK]: c.marigoldSlate },
  },
  text: {
    primary: { default: 'rgb(16 16 16)', [DARK]: c.marigoldMist },
    muted: { default: 'rgb(90,90,90)', [DARK]: c.marigoldFog },
    link: { default: c.marigoldPetal, [DARK]: c.marigoldGold },
    linkHover: { default: c.marigoldAmber, [DARK]: c.marigoldAmberDesaturated },
    button: { default: c.marigoldCenter, [DARK]: c.marigoldMist },
    linkButton: { default: c.marigoldBrown, [DARK]: c.marigoldGold },
    hoverLinkButton: { default: c.marigoldRed, [DARK]: c.marigoldRedDesaturated },
    accent: { default: c.marigoldRust, [DARK]: c.marigoldRustDesaturated },
    primaryText: { default: colors.gray9, [DARK]: c.marigoldLeafLight },
  },
  border: {
    table: { default: c.marigoldStem, [DARK]: c.marigoldLeafDesaturated },
    accent: { default: c.marigoldAmber, [DARK]: c.marigoldAmberDesaturated },
    subtle: { default: c.marigoldSlateDesaturated, [DARK]: c.marigoldSlate },
  },
  icon: {
    primary: { default: c.marigoldPetal, [DARK]: c.marigoldLeafLight },
    accent: { default: c.marigoldAmber, [DARK]: c.marigoldAmberDesaturated },
    success: { default: c.marigoldLeaf, [DARK]: c.marigoldLeafDesaturated },
    error: { default: c.marigoldRed, [DARK]: c.marigoldRedDesaturated },
  },
  state: {
    primary: { default: c.marigoldPetal, [DARK]: c.marigoldBrown },
    primaryDark: { default: c.marigoldGold, [DARK]: c.marigoldCenterDesaturated },
    error: { default: c.marigoldRed, [DARK]: c.marigoldRedDesaturated },
    success: { default: c.marigoldLeaf, [DARK]: c.marigoldLeafLightDesaturated },
    warning: { default: c.marigoldAmber, [DARK]: c.marigoldAmberDesaturated },
    info: { default: c.marigoldSky, [DARK]: c.marigoldSlateDesaturated },
  },
  primitives: {
    // Brights
    marigoldPetal: c.marigoldPetal,
    marigoldGold: c.marigoldGold,
    marigoldAmber: c.marigoldAmber,
    marigoldRust: c.marigoldRust,
    marigoldRed: c.marigoldRed,
    // Darks
    marigoldCenter: c.marigoldCenter,
    marigoldBrown: c.marigoldBrown,
    marigoldLeaf: c.marigoldLeaf,
    marigoldLeafLight: c.marigoldLeafLight,
    marigoldStem: c.marigoldStem,
    marigoldSlate: c.marigoldSlate,
    // Neutrals
    marigoldSky: c.marigoldSky,
    marigoldCloud: c.marigoldCloud,
    marigoldPath: c.marigoldPath,
    // Dark mode/neutral
    marigoldEggplant: c.marigoldEggplant,
    marigoldNight: c.marigoldNight,
    marigoldMist: c.marigoldMist,
    marigoldFog: c.marigoldFog,
    // Desaturated brights
    marigoldPetalDesaturated: c.marigoldPetalDesaturated,
    marigoldGoldDesaturated: c.marigoldGoldDesaturated,
    marigoldAmberDesaturated: c.marigoldAmberDesaturated,
    marigoldRustDesaturated: c.marigoldRustDesaturated,
    marigoldRedDesaturated: c.marigoldRedDesaturated,
    // Desaturated darks
    marigoldCenterDesaturated: c.marigoldCenterDesaturated,
    marigoldBrownDesaturated: c.marigoldBrownDesaturated,
    marigoldLeafDesaturated: c.marigoldLeafDesaturated,
    marigoldLeafLightDesaturated: c.marigoldLeafLightDesaturated,
    marigoldStemDesaturated: c.marigoldStemDesaturated,
    marigoldSlateDesaturated: c.marigoldSlateDesaturated,
  },
})
