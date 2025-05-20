interface SpacingPatterns {
  // Gap patterns
  gapTiny: string | number
  gapSmall: string | number
  gapMedium: string | number
  gapLarge: string | number
  gapXLarge: string | number

  // Padding patterns
  paddingNone: number
  paddingTiny: string | number
  paddingSmall: string | number
  paddingMedium: string | number
  paddingLarge: string | number
  paddingXLarge: string | number
  paddingCard: string | number
  paddingCardLarge: string | number
  paddingSection: string | number

  // Asymmetric padding
  paddingAsymmetricSmallVerticalTop: string | number
  paddingAsymmetricSmallVerticalBottom: string | number
  paddingAsymmetricSmallHorizontalLeft: string | number
  paddingAsymmetricSmallHorizontalRight: string | number
  paddingButtonTop: string | number
  paddingButtonBottom: string | number
  paddingButtonLeft: string | number
  paddingButtonRight: string | number
  paddingTagTop: string | number
  paddingTagBottom: string | number
  paddingTagLeft: string | number
  paddingTagRight: string | number

  // Margin patterns
  marginNone: number
  marginTiny: string | number
  marginSmall: string | number
  marginMedium: string | number
  marginLarge: string | number
  marginXLarge: string | number

  // Directional margins
  marginBottomTiny: string | number
  marginBottomSmall: string | number
  marginBottomMedium: string | number
  marginBottomLarge: string | number
  marginBottomXLarge: string | number
  marginTopSmall: string | number
  marginLeftSmall: string | number
  marginRightSmall: string | number

  // Layout patterns
  layoutSectionSpacing: string | number
  layoutSubsectionSpacing: string | number
  layoutContentSpacing: string | number
  layoutCardSpacing: string | number
}

declare const spacingPatterns: SpacingPatterns

export default spacingPatterns
