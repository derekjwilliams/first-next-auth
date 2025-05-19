// src/components/ServiceRequestDetail.tsx
'use client'

import useServiceRequestQuery from '../hooks/useServiceRequestQuery'

import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'

import Link from 'next/link'
import LinkWrapperButton from './controls/LinkWrapperButton'
import { RichTextEditor } from '@/components/lexical/RichTextEditor'

const bp = '@media (min-width: 900px)'

const styles = stylex.create({
  container: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '1400px',
    backgroundColor: marigoldColors.backgroundCard,
    border: `1px solid ${marigoldColors.tableBorder}`,
    color: marigoldColors.foreground,
    borderRadius: borders.radius3,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
    marginBottom: sizes.spacing6,
    padding: sizes.spacing6,
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing6,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: sizes.spacing3,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: fonts.sizeFluid2,
    fontWeight: fonts.weight7,
    color: marigoldColors.pansy,
    margin: 0,
    lineHeight: 1.2,
  },
  statusEditGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.spacing3,
  },
  status: {
    fontSize: fonts.size1,
    fontWeight: fonts.weight6,
    color: marigoldColors.environmentBrown,
    backgroundColor: marigoldColors.backgroundDetails,
    borderRadius: borders.radius2,
    padding: `${sizes.spacing1} ${sizes.spacing3}`,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  editBtn: {
    marginLeft: sizes.spacing2,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing4,
    [bp]: {
      flexDirection: 'row',
      gap: sizes.spacing5,
    },
  },
  infoCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: marigoldColors.backgroundDetails, // adapts to dark mode
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.pansy}`,
    padding: sizes.spacing5,
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
    color: marigoldColors.foreground, // ensures text is readable
  },
  sectionTitle: {
    fontSize: fonts.size1,
    fontWeight: fonts.weight6,
    color: marigoldColors.leaf,
    marginBottom: sizes.spacing2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: sizes.spacing2,
    fontSize: fonts.size1,
    marginBottom: sizes.spacing1,
  },
  fieldLabel: {
    fontWeight: fonts.weight5,
    color: marigoldColors.foregroundMuted,
    minWidth: 80,
  },
  fieldValue: {
    color: marigoldColors.foreground,
    wordBreak: 'break-word',
  },
  costList: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing1,
  },
  costItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: fonts.size1,
  },
  costTotal: {
    fontWeight: fonts.weight7,
    color: marigoldColors.flowerRed,
    borderTop: `1px solid ${marigoldColors.pansy}`,
    paddingTop: sizes.spacing1,
    marginTop: sizes.spacing1,
  },
  technicianList: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
  },
  technicianCard: {
    backgroundColor: marigoldColors.background,
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.leaf}`,
    padding: `${sizes.spacing1} ${sizes.spacing3}`,
    minWidth: 120,
    display: 'inline-block',
    fontWeight: fonts.weight6,
    color: marigoldColors.pansy,
    textDecoration: 'none',
    transition: 'background 0.2s',
    ':hover': {
      backgroundColor: marigoldColors.flowerYellow,
      color: marigoldColors.flowerRed,
    },
  },
  noTech: {
    color: marigoldColors.flowerRed,
    fontWeight: fonts.weight5,
    fontSize: fonts.size1,
  },
  detailsSection: {
    backgroundColor: marigoldColors.backgroundDetails,
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.pansy}`,
    padding: sizes.spacing5,
    marginTop: sizes.spacing6,
    width: '100%',
    boxSizing: 'border-box',
    gridColumn: '1 / -1',
    color: marigoldColors.foreground,
  },
  detailsTitle: {
    fontSize: fonts.size1,
    fontWeight: fonts.weight6,
    color: marigoldColors.leaf,
    marginBottom: sizes.spacing2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
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
              <span {...stylex.props(styles.fieldLabel)}>Address:</span>
              <span {...stylex.props(styles.fieldValue)}>
                {serviceRequest.locations?.street_address}
                {serviceRequest.locations?.unit_number ? `, Unit ${serviceRequest.locations.unit_number}` : ''}
              </span>
            </div>
            {/* Add more location fields here */}
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
                  <Link
                    key={technician.id}
                    {...stylex.props(styles.technicianCard)}
                    href={`/technicians/${technician.id}`}>
                    {technician.name}
                  </Link>
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
