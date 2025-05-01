// src/components/ServiceRequestsTable.tsx
import { Tables } from '@/utils/database.types'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'

interface SimpleServiceRequestsTableProps {
  serviceRequests: Array<
    Tables<'service_requests'> & {
      service_types: Tables<'service_types'>
      technicians: Array<Tables<'technicians'>>
    }
  >
}

const styles = stylex.create({
  html: {
    colorScheme: 'light dark',
  },
  reset: {
    minHeight: '100%',
    margin: 0,
    padding: 0,
  },
  containerWrapper: {
    paddingTop: '10px',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: marigoldColors.background,
  },
  dataWrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto minmax(0, 0.5fr) auto',
    gap: '10px',
    width: '95%',
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: 'auto',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    backgroundColor: `${marigoldColors.backgroundData}`,
    tableLayout: 'fixed',
    borderWidth: '2px',
    borderColor: marigoldColors.tableBorder,
    borderStyle: 'solid',
  },
  tableRow: {
    backgroundColor: marigoldColors.background,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: marigoldColors.background,
  },
  tableHeaderRow: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: marigoldColors.background,
    height: sizes.spacing8,
    color: marigoldColors.foreground,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: fonts.size2,
    padding: sizes.spacing1,
    backgroundColor: marigoldColors.background,
  },
  tableHead: {
    textAlign: 'left',
    paddingLeft: sizes.spacing1,
    paddingRight: sizes.spacing1,
  },

  tableData: {
    textAlign: 'left',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: marigoldColors.background,
    color: marigoldColors.foreground,
    padding: sizes.spacing1,
    paddingTop: sizes.spacing2,
    paddingBottom: sizes.spacing2,
    wordBreak: 'break-word',
    verticalAlign: 'top',
    fontSize: fonts.size2,
    minWidth: '8rem',
  },
  tableDataLink: {
    textDecoration: 'none',
    color: {
      default: marigoldColors.foregroundLink,
      ':hover': marigoldColors.foregroundHoverLink,
    },
  },
  tableCheckboxData: {
    minWidth: 'auto',
  },
  tableStatusData: {
    minWidth: 'auto',
    whiteSpace: 'nowrap',
  },
  tableDescriptionData: {
    minWidth: '10rem',
  },
  tableTechnicianData: {
    width: '8rem',
  },
  tableDateData: {
    width: '2rem',
    minWidth: 'auto',
  },
  dataDate: {
    whiteSpace: 'nowrap',
  },
  dataTime: {
    marginLeft: '0.5rem',
    whiteSpace: 'nowrap',
  },
  tableDropdownData: {
    width: 'auto',
    minWidth: 'auto',
  },
})

export default function SimpleServiceRequestsTable({ serviceRequests }: SimpleServiceRequestsTableProps) {
  if (!serviceRequests || serviceRequests.length === 0) {
    return <p>No service requests found for this property.</p>
  }

  return (
    <div {...stylex.props(styles.containerWrapper)}>
      <div {...stylex.props(styles.dataWrapper)}>
        <div {...stylex.props(styles.tableWrapper)}>
          <table {...stylex.props(styles.table)}>
            <thead>
              <tr {...stylex.props(styles.tableHeaderRow)}>
                <th {...stylex.props(styles.tableHead)}>Description</th>
                <th {...stylex.props(styles.tableHead)}>Type</th>
                <th {...stylex.props(styles.tableHead)}>Assigned Technicians</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.id}>
                  <td {...stylex.props(styles.tableData)}>
                    <Link href={`/servicerequests/${request.id}`}>{request.description}</Link>
                  </td>
                  <td {...stylex.props(styles.tableData)}>
                    {request.service_types.service_name}
                    {/* <Link href={`/servicerequests/${request.service_type_id}`}>{request.service_types.service_name}</Link> */}
                  </td>
                  <td {...stylex.props(styles.tableData)}>
                    {request.technicians && request.technicians.length > 0 ? (
                      request.technicians.map((technician) => (
                        <div key={technician.id}>
                          <Link href={`/technicians/${technician.id}`}>{technician.name}</Link>
                        </div>
                      ))
                    ) : (
                      <div>Unassigned</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
