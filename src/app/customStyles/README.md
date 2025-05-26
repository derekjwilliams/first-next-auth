# Styling Details

## The Palette

![Shown here, in customStyles/palette.svg](/src/app/customStyles/palette.svg)

## Starting From The Bottom Up

### Primitives

The primitives are stored in the files

- `colorPrimitives.stylex.ts` for colors in the pallete

- `spacingPatterns.stylex.ts` for predefined standard spacing

Open Props values are also used, see https://www.npmjs.com/package/@derekjwilliams/stylextras-open-props-pr for usage. This package allows Open Props values to be used in stylex (described briefly in the npm package README)

### Marigold Styles - Colors

`marigoldColors` references the colors found in `colorPrimatives.stylex.ts`

Found in `marigoldColors.stylex.ts` These include the values for DARK mode.

### Use in JSX Code

At the JSX level there should be little need to directly reference the colors from `primitiveColors`, strong preference should be given to using the colors from `marigoldColors`.

Do this

```TypeScript
card: {
    backgroundColor: marigoldColors.backgroundCard,
    border: `1px solid ${marigoldColors.borderSubtle}`,
    borderRadius: borders.radius2,
    gap: spacingPatterns.gapTiny,
  },
```

Do **not** do this

```TypeScript
card: {
    backgroundColor: colorPrimitives.marigoldStoneLight,
    border: `1px solid ${colorPrimitives.marigoldStoneMedium}`,
    borderRadius: borders.radius2,
    gap: spacingPatterns.gapTiny,
  },
```

#### Examples

The StyleX definitions from `ServiceRequestDetail.tsx` are shown below, and include many use cases.

```TypeScript
const bp = '@media (min-width: 1100px)'
const bpmax = '@media (max-width: 1100px)'

// Extract common style patterns
const baseStyles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    backgroundColor: marigoldColors.backgroundCard,
    border: `1px solid ${marigoldColors.borderSubtle}`,
    borderRadius: borders.radius2,
    gap: spacingPatterns.gapTiny,
  },
  infoContainer: {
    backgroundColor: marigoldColors.backgroundDetails,
    borderRadius: borders.radius1,
    border: `1px solid ${marigoldColors.borderSubtle}`,
  },
  sectionHeading: {
    fontSize: fonts.size1,
    fontWeight: fonts.weight6,
    color: marigoldColors.textAccent,
    marginBottom: spacingPatterns.gapSmall,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
}

// Main styles
const styles = stylex.create({
  // Layout containers
  container: {
    ...baseStyles.flexColumn,
    padding: spacingPatterns.gapSmall,
    backgroundColor: marigoldColors.backgroundPage,
    minHeight: '100vh',
    alignItems: 'center',
    width: '100%', // Ensure full width
    boxSizing: 'border-box', // Include padding in width calculation
  },
  card: {
    ...baseStyles.card,
    marginLeft: spacingPatterns.gapSmall,
    marginRight: spacingPatterns.gapSmall,
    width: 'calc(100% - 0.5rem)',
    maxWidth: '1400px',
    margin: '0 auto', // Center the card
    color: marigoldColors.textPrimary,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.2)',
    padding: {
      default: spacingPatterns.gapMedium,
      [bpmax]: spacingPatterns.gapSmall,
    },
    gap: spacingPatterns.gapLarge,
    boxSizing: 'border-box',
  },
  headerRow: {
    ...baseStyles.flexRow,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacingPatterns.gapMedium,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: fonts.sizeFluid2,
    fontWeight: fonts.weight7,
    color: marigoldColors.textPrimary,
    padding: spacingPatterns.gapSmall,
    margin: 0,
    lineHeight: 1.2,
  },
  statusEditGroup: {
    ...baseStyles.flexRow,
    alignItems: 'center',
    gap: spacingPatterns.gapSmall,
  },
  status: {
    color: '#fff',
    backgroundColor: marigoldColors.textAccent,
    fontWeight: fonts.weight7,
    borderRadius: borders.radius1,
    padding: `${spacingPatterns.gapTiny} ${spacingPatterns.gapMedium}`,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: fonts.size1,
  },
  serviceType: {
    backgroundColor: marigoldColors.backgroundLinkButton,
    color: marigoldColors.foregroundLinkButton,
    textDecoration: 'none',
    fontWeight: fonts.weight7,
    borderRadius: borders.radius1,
    padding: `${spacingPatterns.gapTiny} ${spacingPatterns.gapMedium}`,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: fonts.size1,
  },
  editBtn: {
    marginLeft: spacingPatterns.gapSmall,
  },
  infoRow: {
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapMedium,
    [bp]: {
      flexDirection: 'row',
      gap: spacingPatterns.gapLarge,
    },
  },
  infoCard: {
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.2)',
    ...baseStyles.infoContainer,
    flex: 1,
    minWidth: 220,
    padding: spacingPatterns.gapMedium,
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapSmall,
    color: marigoldColors.textPrimary,
  },
  sectionTitle: baseStyles.sectionHeading,

  fieldRow: {
    ...baseStyles.flexRow,
    gap: spacingPatterns.gapSmall,
    fontSize: fonts.size1,
    marginBottom: spacingPatterns.gapSmall,
  },
  fieldLabel: {
    fontWeight: fonts.weight5,
    color: marigoldColors.textMuted,
    minWidth: 80,
  },
  fieldValue: {
    color: marigoldColors.textPrimary,
    wordBreak: 'break-word',
  },
  costList: {
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapTiny,
  },
  costItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: fonts.size1,
  },
  costTotal: {
    fontWeight: fonts.weight7,
    borderTop: `1px solid ${marigoldColors.borderAccent}`,
    paddingTop: spacingPatterns.gapTiny,
    marginTop: spacingPatterns.gapTiny,
  },
  technicianList: {
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapSmall,
  },
  email: {
    marginLeft: spacingPatterns.gapTiny,
    color: marigoldColors.textLinkButtonSecondary,
  },
  technician: {
    color: marigoldColors.textLinkButton,
  },
  technicianCard: {
    backgroundColor: marigoldColors.backgroundData,
    color: marigoldColors.textAccent,
    border: `1px solid ${marigoldColors.borderSubtle}`,
    fontWeight: fonts.weight6,
    borderRadius: borders.radius1,
    padding: `${spacingPatterns.gapTiny} ${spacingPatterns.gapMedium}`,
    minWidth: 120,
    display: 'inline-block',
  },
  noTech: {
    color: marigoldColors.textMuted,
    fontWeight: fonts.weight5,
    fontSize: fonts.size1,
  },
  detailsSection: {
    ...baseStyles.infoContainer,
    padding: spacingPatterns.gapLarge,
    marginTop: spacingPatterns.gapMedium,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.2)',
    width: '100%',
    boxSizing: 'border-box',
    gridColumn: '1 / -1',
    color: marigoldColors.textPrimary,
  },
  detailsTitle: baseStyles.sectionHeading,
})
```

The StyleX definitions from `ServiceRequestEditForm.tsx` include how to handle hovers

```TypeScript
  requestButton: {
    backgroundColor: marigoldColors.backgroundButton,
    color: marigoldColors.foregroundButton,
    paddingBlock: spacingPatterns.gapSmall,
    paddingInline: spacingPatterns.gapXLarge,
    borderRadius: borders.radius2,
    border: 'none',
    cursor: 'pointer',
    fontWeight: fonts.weight6,
    fontSize: fonts.size1,
    marginTop: spacingPatterns.gapMedium,
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: marigoldColors.backgroundHoverButton,
      color: marigoldColors.foregroundHoverButton,
    },
  },
```
