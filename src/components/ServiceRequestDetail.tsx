// src/components/ServiceRequestDetail.tsx
'use client'

import useServiceRequestQuery from '../hooks/useServiceRequestQuery'

import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/betterMarigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { spacingPatterns } from '../app/customStyles/spacingPatterns.stylex'

import Link from 'next/link'
import LinkWrapperButton from './controls/LinkWrapperButton'
import { RichTextEditor } from '@/components/lexical/RichTextEditor'

const bp = '@media (min-width: 900px)'

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
    border: `1px solid ${marigoldColors.borderTable}`,
    borderRadius: borders.radius3,
    gap: spacingPatterns.gapTiny,
  },
  infoContainer: {
    backgroundColor: marigoldColors.backgroundDetails,
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.borderSubtle}`,
  },
  sectionHeading: {
    fontSize: fonts.size1,
    fontWeight: fonts.weight6,
    color: marigoldColors.textAccent,
    marginBottom: sizes.spacing2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
}

// Main styles - organized by logical sections
const styles = stylex.create({
  // Layout containers
  container: {
    ...baseStyles.flexColumn,
    padding: sizes.spacing5, // 1.5rem padding
    backgroundColor: marigoldColors.backgroundPage,
    minHeight: '100vh',
    alignItems: 'center',
  },
  card: {
    ...baseStyles.card,
    width: '100%',
    maxWidth: '1400px',
    color: marigoldColors.textPrimary,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
    marginBottom: sizes.spacing7, // 2rem - consistent larger spacing
    padding: sizes.spacing7, // 2rem - consistent larger spacing
    gap: spacingPatterns.gapLarge,
  },

  // Header section
  headerRow: {
    ...baseStyles.flexRow,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: sizes.spacing3,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: fonts.sizeFluid2,
    fontWeight: fonts.weight7,
    color: marigoldColors.textPrimary,
    padding: sizes.spacing3,
    margin: 0,
    lineHeight: 1.2,
  },
  statusEditGroup: {
    ...baseStyles.flexRow,
    alignItems: 'center',
    gap: spacingPatterns.gapMedium,
  },
  status: {
    color: '#fff',
    backgroundColor: marigoldColors.textAccent,
    fontWeight: fonts.weight7,
    borderRadius: borders.radius2,
    padding: `${sizes.spacing1} ${sizes.spacing3}`, // .25rem vertical, 1rem horizontal
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: fonts.size1,
  },
  editBtn: {
    marginLeft: sizes.spacing2, // .5rem consistent margin
  },

  // Info row & cards
  infoRow: {
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapMedium,
    [bp]: {
      flexDirection: 'row',
      gap: sizes.spacing5, // 1.5rem for wider screens
    },
  },
  infoCard: {
    ...baseStyles.infoContainer,
    flex: 1,
    minWidth: 220,
    padding: sizes.spacing5, // 1.5rem consistent padding
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapSmall,
    color: marigoldColors.textPrimary,
  },
  sectionTitle: baseStyles.sectionHeading,

  // Field styles
  fieldRow: {
    ...baseStyles.flexRow,
    gap: spacingPatterns.gapSmall,
    fontSize: fonts.size1,
    marginBottom: sizes.spacing1, // .25rem consistent margin
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

  // Cost section
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
    color: marigoldColors.textAccent,
    borderTop: `1px solid ${marigoldColors.borderAccent}`,
    paddingTop: sizes.spacing1, // .25rem consistent padding
    marginTop: sizes.spacing1, // .25rem consistent margin
  },

  // Technician section
  technicianList: {
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapSmall,
  },
  email: {
    marginLeft: sizes.spacing1,
  },
  technicianCard: {
    backgroundColor: marigoldColors.backgroundData,
    color: marigoldColors.textAccent,
    border: `1px solid ${marigoldColors.borderSubtle}`,
    fontWeight: fonts.weight6,
    borderRadius: borders.radius2,
    padding: `${sizes.spacing1} ${sizes.spacing3}`, // .25rem vertical, 1rem horizontal
    minWidth: 120,
    display: 'inline-block',
    marginBottom: sizes.spacing2, // .5rem consistent margin
  },
  noTech: {
    color: marigoldColors.textMuted,
    fontWeight: fonts.weight5,
    fontSize: fonts.size1,
  },

  // Details section
  detailsSection: {
    ...baseStyles.infoContainer,
    padding: sizes.spacing5, // 1.5rem consistent padding
    marginTop: sizes.spacing7, // 2rem consistent larger spacing
    width: '100%',
    boxSizing: 'border-box',
    gridColumn: '1 / -1',
    color: marigoldColors.textPrimary,
  },
  detailsTitle: baseStyles.sectionHeading,
})

export default function ServiceRequestDetail({ id }: { id: string | null }) {
  const { data: serviceRequest, isLoading, isError } = useServiceRequestQuery(id!)
  if (isLoading) return <div>Loading...</div>
  if (isError || !serviceRequest)
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )

  const formatCost = (cost: number | null | undefined) => {
    const amount = cost ?? 0
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }
  const totalCost = (serviceRequest.material_cost || 0) + (serviceRequest.labor_cost || 0)

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.headerRow)}>
          <h1 {...stylex.props(styles.title)}>{serviceRequest.description || 'Service Request'}</h1>
          <div {...stylex.props(styles.statusEditGroup)}>
            <span {...stylex.props(styles.status)}>{serviceRequest.statuses?.status_name}</span>
            <div {...stylex.props(styles.editBtn)}>
              <LinkWrapperButton href={`/servicerequests/${id}/edit`}>Edit</LinkWrapperButton>
            </div>
          </div>
        </div>

        {/* Info row: Location, Costs, Technicians */}
        <div {...stylex.props(styles.infoRow)}>
          {/* Location */}
          <section {...stylex.props(styles.infoCard)}>
            <div {...stylex.props(styles.sectionTitle)}>Location</div>
            <div {...stylex.props(styles.fieldRow)}>
              {/* <span {...stylex.props(styles.fieldLabel)}>Address:</span> */}
              <div>
                <div {...stylex.props(styles.fieldValue)}>
                  {serviceRequest.locations?.street_address}
                  {serviceRequest.locations?.unit_number && serviceRequest.locations?.unit_number != ''
                    ? `, Unit ${serviceRequest.locations.unit_number}`
                    : ''}
                  <div {...stylex.props(styles.fieldValue)}>
                    {serviceRequest.locations?.city ? `${serviceRequest.locations.city}` : ''}
                    {serviceRequest.locations?.state_province ? ` ${serviceRequest.locations.state_province}` : ''}
                    {serviceRequest.locations?.postal_code ? ` ${serviceRequest.locations.postal_code}` : ''}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Costs */}
          <section {...stylex.props(styles.infoCard)}>
            <div {...stylex.props(styles.sectionTitle)}>Costs</div>
            <div {...stylex.props(styles.costList)}>
              <div {...stylex.props(styles.costItem)}>
                <span>Material Cost</span>
                <span>{formatCost(serviceRequest.material_cost)}</span>
              </div>
              <div {...stylex.props(styles.costItem)}>
                <span>Labor Cost</span>
                <span>{formatCost(serviceRequest.labor_cost)}</span>
              </div>
              <div {...stylex.props(styles.costItem, styles.costTotal)}>
                <span>Total</span>
                <span>{formatCost(totalCost)}</span>
              </div>
            </div>
          </section>

          {/* Technicians */}
          <section {...stylex.props(styles.infoCard)}>
            <div {...stylex.props(styles.sectionTitle)}>Technicians</div>
            {serviceRequest.technicians.length === 0 ? (
              <div {...stylex.props(styles.noTech)}>No Technicians Assigned</div>
            ) : (
              <div {...stylex.props(styles.technicianList)}>
                {serviceRequest.technicians.map((technician: any) => (
                  <div {...stylex.props(styles.technicianCard)}>
                    <Link
                      key={technician.id}
                      href={`/technicians/${technician.id}`}>
                      {`${technician.name}`}
                    </Link>
                    <Link
                      key={technician.id}
                      {...stylex.props(styles.email)}
                      href={`mailto:${technician.email}`}>{`${technician.email}`}</Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Details section, full width */}
        <section {...stylex.props(styles.detailsSection)}>
          <div {...stylex.props(styles.detailsTitle)}>Details</div>
          <RichTextEditor
            value={serviceRequest.details}
            onChange={() => {}}
            readOnly={true}
            data={serviceRequest.details}
          />
        </section>
      </div>
    </div>
  )
}
