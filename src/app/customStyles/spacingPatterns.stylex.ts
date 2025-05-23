import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import * as stylex from '@stylexjs/stylex'
/**
 * Spacing patterns for consistent spacing across the application
 * These patterns use the design system's spacing tokens and provide
 * semantic meaning to different spacing contexts.
 */
export const spacingPatterns = stylex.defineVars({
  // Gap patterns - for consistent spacing between flex and grid items
  gapTiny: sizes.spacing1, // .25rem - for minimal spacing
  gapSmall: sizes.spacing2, // .5rem - for tight spacing
  gapMedium: sizes.spacing3, // 1rem - for standard spacing
  gapLarge: sizes.spacing5, // 1.5rem - for generous spacing
  gapXLarge: sizes.spacing7, // 2rem - for extra large spacing

  // Padding patterns - for consistent internal spacing
  paddingNone: '0',
  paddingTiny: sizes.spacing1, // .25rem
  paddingSmall: sizes.spacing2, // .5rem
  paddingMedium: sizes.spacing3, // 1rem
  paddingLarge: sizes.spacing5, // 1.5rem
  paddingXLarge: sizes.spacing7, // 2rem
  paddingCard: sizes.spacing5, // 1.5rem - standard card padding
  paddingCardLarge: sizes.spacing7, // 2rem - larger card padding
  paddingSection: sizes.spacing7, // 2rem - section padding

  // Asymmetric padding
  paddingAsymmetricSmallVerticalTop: sizes.spacing2, // .5rem
  paddingAsymmetricSmallVerticalBottom: sizes.spacing2, // .5rem
  paddingAsymmetricSmallHorizontalLeft: sizes.spacing2, // .5rem
  paddingAsymmetricSmallHorizontalRight: sizes.spacing2, // .5rem
  paddingButtonTop: sizes.spacing1, // .25rem
  paddingButtonBottom: sizes.spacing1, // .25rem
  paddingButtonLeft: sizes.spacing3, // 1rem
  paddingButtonRight: sizes.spacing3, // 1rem
  paddingTagTop: sizes.spacing1, // .25rem
  paddingTagBottom: sizes.spacing1, // .25rem
  paddingTagLeft: sizes.spacing2, // .5rem
  paddingTagRight: sizes.spacing2, // .5rem

  // Margin patterns - for consistent external spacing
  marginNone: '0',
  marginTiny: sizes.spacing1, // .25rem
  marginSmall: sizes.spacing2, // .5rem
  marginMedium: sizes.spacing3, // 1rem - standard margin
  marginLarge: sizes.spacing5, // 1.5rem
  marginXLarge: sizes.spacing7, // 2rem

  // Directional margins
  marginBottomTiny: sizes.spacing1, // .25rem
  marginBottomSmall: sizes.spacing2, // .5rem
  marginBottomMedium: sizes.spacing3, // 1rem
  marginBottomLarge: sizes.spacing5, // 1.5rem
  marginBottomXLarge: sizes.spacing7, // 2rem
  marginTopSmall: sizes.spacing2, // .5rem
  marginLeftSmall: sizes.spacing2, // .5rem
  marginRightSmall: sizes.spacing2, // .5rem

  // Layout patterns - for consistent layout spacing
  layoutSectionSpacing: sizes.spacing7, // 2rem - spacing between major sections
  layoutSubsectionSpacing: sizes.spacing5, // 1.5rem - spacing between subsections
  layoutContentSpacing: sizes.spacing3, // 1rem - spacing between content blocks
  layoutCardSpacing: sizes.spacing5, // 1.5rem - spacing between cards

  // Element sizes
  layoutNumericInputSize: sizes.spacing10, // 5 rem
  layoutCheckboxInputSize: sizes.spacing4, // 1.25 rem
  layoutIconSize: sizes.spacing4,
})

// export default spacingPatterns
