import * as stylex from '@stylexjs/stylex'

/**
 * Spacing patterns for consistent spacing across the application
 * These patterns use the design system's spacing tokens and provide
 * semantic meaning to different spacing contexts.
 */
export declare const spacingPatterns: stylex.VarGroup<{
  // Gap patterns - for consistent spacing between flex and grid items
  gapTiny: string
  gapSmall: string
  gapMedium: string
  gapLarge: string
  gapXLarge: string

  // Padding patterns - for consistent internal spacing
  paddingNone: string
  paddingTiny: string
  paddingSmall: string
  paddingMedium: string
  paddingLarge: string
  paddingXLarge: string
  paddingCard: string
  paddingCardLarge: string
  paddingSection: string

  // Asymmetric padding
  paddingAsymmetricSmallVerticalTop: string
  paddingAsymmetricSmallVerticalBottom: string
  paddingAsymmetricSmallHorizontalLeft: string
  paddingAsymmetricSmallHorizontalRight: string
  paddingButtonTop: string
  paddingButtonBottom: string
  paddingButtonLeft: string
  paddingButtonRight: string
  paddingTagTop: string
  paddingTagBottom: string
  paddingTagLeft: string
  paddingTagRight: string

  // Margin patterns - for consistent external spacing
  marginNone: string
  marginTiny: string
  marginSmall: string
  marginMedium: string
  marginLarge: string
  marginXLarge: string

  // Directional margins
  marginBottomTiny: string
  marginBottomSmall: string
  marginBottomMedium: string
  marginBottomLarge: string
  marginBottomXLarge: string
  marginTopSmall: string
  marginLeftSmall: string
  marginRightSmall: string

  // Layout patterns - for consistent layout spacing
  layoutSectionSpacing: string
  layoutSubsectionSpacing: string
  layoutContentSpacing: string
  layoutCardSpacing: string
}>
