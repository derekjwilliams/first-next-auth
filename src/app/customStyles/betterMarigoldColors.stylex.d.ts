// marigoldColors.d.ts
import * as stylex from '@stylexjs/stylex'

export type ColorPrimitives = Readonly<{
  // Brights
  marigoldPetal: string // #FF9912
  marigoldGold: string // #FFC200
  marigoldAmber: string // #E8680E
  marigoldRust: string // #C83C00
  marigoldRed: string // #F74600

  // Darks
  marigoldCenter: string // #A85000
  marigoldBrown: string // #D67A00
  marigoldLeaf: string // #005145
  marigoldLeafLight: string // #BDDBA3
  marigoldStem: string // #2C783C
  marigoldSlate: string // #444444

  // Neutrals
  marigoldSky: string // #78B4EB
  marigoldCloud: string // #F0F5FA
  marigoldPath: string // #828282

  // Dark mode/neutral
  marigoldEggplant: string // #242428
  marigoldNight: string // #18181C
  marigoldMist: string // #EBE6FF
  marigoldFog: string // #B4B4C8

  // Desaturated brights
  marigoldPetalDesaturated: string // #E0AA61
  marigoldGoldDesaturated: string // #E0C861
  marigoldAmberDesaturated: string // #C88C61
  marigoldRustDesaturated: string // #B46E50
  marigoldRedDesaturated: string // #D27861

  // Desaturated darks
  marigoldCenterDesaturated: string // #966E50
  marigoldBrownDesaturated: string // #B48C61
  marigoldLeafDesaturated: string // #3C645A
  marigoldLeafLightDesaturated: string // #AAC8AA
  marigoldStemDesaturated: string // #5A8264
  marigoldSlateDesaturated: string // #646464
}>

export type MarigoldColors = Readonly<{
  // Backgrounds
  backgroundPage: string
  backgroundData: string
  backgroundCard: string
  backgroundDetails: string
  backgroundTextarea: string
  backgroundButton: string
  backgroundButtonHover: string
  backgroundLinkButton: string
  backgroundHoverLinkButton: string
  backgroundAccent: string
  backgroundShadow: string

  // Text
  textPrimary: string
  textMuted: string
  textLink: string
  textLinkHover: string
  textButton: string
  textLinkButton: string
  textHoverLinkButton: string
  textAccent: string
  textPrimaryText: string

  // Borders
  borderTable: string
  borderAccent: string
  borderSubtle: string

  // Icons
  iconPrimary: string
  iconAccent: string
  iconSuccess: string
  iconError: string

  // States
  statePrimary: string
  statePrimaryDark: string
  stateError: string
  stateSuccess: string
  stateWarning: string
  stateInfo: string

  // Primitives (optional, for direct use)
  // primitives: ColorPrimitives
}>

export declare const marigoldColors: stylex.VarGroup<MarigoldColors>
