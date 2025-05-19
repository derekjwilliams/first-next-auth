// betterMarigoldColors.d.ts
import type { VarGroup } from '@stylexjs/stylex/lib/StyleXTypes'
import type { ColorPrimitives } from './colorPrimitives'

type BackgroundColors = Readonly<{
  page: string
  data: string
  card: string
  details: string
  textarea: string
  button: string
  buttonHover: string
  linkButton: string
  hoverLinkButton: string
  accent: string
  shadow: string
}>

type TextColors = Readonly<{
  primary: string
  muted: string
  link: string
  linkHover: string
  button: string
  linkButton: string
  hoverLinkButton: string
  accent: string
  primaryText: string
}>

type BorderColors = Readonly<{
  table: string
  accent: string
  subtle: string
}>

type IconColors = Readonly<{
  primary: string
  accent: string
  success: string
  error: string
}>

type StateColors = Readonly<{
  primary: string
  primaryDark: string
  error: string
  success: string
  warning: string
  info: string
}>

type Primitives = ColorPrimitives

export type MarigoldColors = Readonly<{
  background: BackgroundColors
  text: TextColors
  border: BorderColors
  icon: IconColors
  state: StateColors
  primitives: Primitives
}>

export declare const marigoldColors: VarGroup<MarigoldColors>
