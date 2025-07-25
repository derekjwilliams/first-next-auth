// src/components/ServiceRequestDetail.tsx
'use client'

import useServiceRequestQuery from '../hooks/useServiceRequestQuery'

import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { spacingPatterns } from '../app/customStyles/spacingPatterns.stylex'

import Link from 'next/link'
import LinkWrapperButton from './controls/LinkWrapperButton'
import { RichTextEditor } from '@/components/lexical/RichTextEditor'
import { getNextCronOccurrence, pascalToSnakeCase, pascalToSpacedTerm } from '@/utils/stringUtils'
import dayjs from 'dayjs'
import cronstrue from 'cronstrue'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(utc)

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
    border: '1px solid ' + marigoldColors.borderSubtle,
    borderRadius: borders.radius2,
    gap: spacingPatterns.gapTiny,
  },
  infoContainer: {
    backgroundColor: marigoldColors.backgroundDetails,
    borderRadius: borders.radius1,
    border: '1px solid ' + marigoldColors.borderSubtle,
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
    padding: [spacingPatterns.gapTiny, spacingPatterns.gapMedium].join(' '),
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
    padding: [spacingPatterns.gapTiny, spacingPatterns.gapMedium].join(' '),
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
    borderTop: '1px solid ' + marigoldColors.borderAccent,
    paddingTop: spacingPatterns.gapTiny,
    marginTop: spacingPatterns.gapTiny,
  },
  dateList: {
    ...baseStyles.flexColumn,
    gap: spacingPatterns.gapTiny,
  },
  cronItem: {
    fontSize: fonts.size1,
  },
  cronItemValue: {
    marginLeft: spacingPatterns.gapMedium,
  },
  dateItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: fonts.size1,
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
    border: '1px solid ' + marigoldColors.borderSubtle,
    fontWeight: fonts.weight6,
    borderRadius: borders.radius1,
    padding: [spacingPatterns.gapTiny, spacingPatterns.gapMedium].join(' '),
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

  const getHumanReadableCron = (cronExpression: string) => {
    try {
      // By default, it uses English. You can pass a locale as a second argument, e.g., 'es' for Spanish
      return cronstrue.toString(cronExpression)
    } catch (error) {
      console.error('Error parsing cron expression:', cronExpression, error)
      return 'Invalid cron expression' // Fallback for bad cron strings
    }
  }
  const totalCost = (serviceRequest.material_cost || 0) + (serviceRequest.labor_cost || 0)
  const nextOccurrence = getNextCronOccurrence(serviceRequest.recurring_date_cron)
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.headerRow)}>
          <h1 {...stylex.props(styles.title)}>{serviceRequest.description || 'Service Request'}</h1>
          <div {...stylex.props(styles.statusEditGroup)}>
            <Link href={`/servicetypes/${pascalToSnakeCase(serviceRequest.service_types.service_name)}`}>
              <span {...stylex.props(styles.serviceType)}>
                {pascalToSpacedTerm(serviceRequest.service_types.service_name)}
              </span>
            </Link>
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
                <Link href={`/properties/${serviceRequest.locations.id}`}>
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
                </Link>
              </div>
            </div>
          </section>
          {/* Dates */}
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

          {/* Costs */}
          <section {...stylex.props(styles.infoCard)}>
            <div {...stylex.props(styles.sectionTitle)}>Dates</div>
            <div {...stylex.props(styles.dateList)}>
              <div {...stylex.props(styles.dateItem)}>
                <span>Date Created</span>
                <span>{serviceRequest.date_created ? dayjs.utc(serviceRequest.date_created).fromNow() : 'n/a'}</span>
              </div>
              <div {...stylex.props(styles.dateItem)}>
                <span>Updated Date</span>
                <span>{serviceRequest.date_updated ? dayjs.utc(serviceRequest.date_updated).fromNow() : 'n/a'}</span>
              </div>
              <div {...stylex.props(styles.dateItem)}>
                <span>Due Date</span>
                <span>{serviceRequest.due_date ? dayjs(serviceRequest.due_date).fromNow() : 'none'} </span>
              </div>
              <div {...stylex.props(styles.cronItem)}>
                <div>Recurring times</div>
                <div {...stylex.props(styles.cronItemValue)}>
                  {serviceRequest.recurring_date_cron
                    ? getHumanReadableCron(serviceRequest.recurring_date_cron)
                    : 'none'}
                </div>
                <div>
                  {serviceRequest.recurring_date_cron
                    ? `Next: ${nextOccurrence ? nextOccurrence.format('YYYY-MM-DD HH:mm A [UTC]') : 'N/A'}`
                    : 'none'}
                </div>
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
                        href={`/technicians/${technician.id}`}
                        {...stylex.props(styles.technician)}>
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
