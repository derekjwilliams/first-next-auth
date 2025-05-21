// src/components/ServiceRequestDetail.tsx
'use client'

import useServiceRequestQuery from '../hooks/useServiceRequestQuery'

import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/betterMarigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { spacingPatterns } from '../app/customStyles/spacingPatterns.stylex'

import Link from 'next/link'
import LinkWrapperButton from './controls/LinkWrapperButton'
import { RichTextEditor } from '@/components/lexical/RichTextEditor'

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
    marginBottom: spacingPatterns.gapSmall,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
}

// Main styles - organized by logical sections
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
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',

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
    borderRadius: borders.radius2,
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
    color: marigoldColors.textAccent,
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
  },
  technicianCard: {
    backgroundColor: marigoldColors.backgroundData,
    color: marigoldColors.textAccent,
    border: `1px solid ${marigoldColors.borderSubtle}`,
    fontWeight: fonts.weight6,
    borderRadius: borders.radius2,
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
                    <div>
                      <Link
                        key={technician.id}
                        href={`/technicians/${technician.id}`}>
                        {`${technician.name}`}
                      </Link>
                    </div>
                    <div>
                      <Link
                        key={technician.id}
                        {...stylex.props(styles.email)}
                        href={`mailto:${technician.email}`}>{`${technician.email}`}</Link>
                    </div>
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
