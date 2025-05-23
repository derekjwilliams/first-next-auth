// marigoldColors.d.ts
import * as stylex from '@stylexjs/stylex'

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
}>

export declare const marigoldColors: stylex.VarGroup<MarigoldColors>
