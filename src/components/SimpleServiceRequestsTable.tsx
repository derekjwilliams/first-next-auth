// src/components/ServiceRequestsTable.tsx
import { Tables } from '@/utils/database.types'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
import { getCoreRowModel, getFilteredRowModel, useReactTable, flexRender, type ColumnDef } from '@tanstack/react-table'

interface SimpleServiceRequestsTableProps {
  serviceRequests: Array<
    Tables<'service_requests'> & {
      service_types: Tables<'service_types'>
      technicians: Array<Tables<'technicians'>>
    }
  >
}

type ServiceRequestRow = Tables<'service_requests'> & {
  service_types: Tables<'service_types'>
  technicians: Array<Tables<'technicians'>>
}

interface SimpleServiceRequestsTableProps {
  serviceRequests: ServiceRequestRow[]
}

export default function SimpleServiceRequestsTable({
  serviceRequests = [],
}: SimpleServiceRequestsTableProps): React.JSX.Element {
  const columns: ColumnDef<ServiceRequestRow>[] = [
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row, getValue }) => (
        <Link href={`/servicerequests/${row.original.id}`} {...stylex.props(styles.descriptionLink)}>
          {getValue() as string}
        </Link>
      ),
    },
    {
      accessorFn: (row) => row.service_types.service_name,
      id: 'service_type',
      header: 'Type',
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: 'technicians',
      header: 'Assigned Technicians',
      cell: ({ getValue }) => {
        const technicians = getValue() as Array<Tables<'technicians'>>
        if (!technicians?.length) return <div>Unassigned</div>

        return (
          <div {...stylex.props(styles.techniciansList)}>
            {technicians.map((tech) => (
              <Link key={tech.id} href={`/technicians/${tech.id}`} {...stylex.props(styles.technicianLink)}>
                {tech.name}
              </Link>
            ))}
          </div>
        )
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
  ]

  const table = useReactTable({
    data: serviceRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  if (!serviceRequests.length) {
    return <div {...stylex.props(styles.emptyState)}>No service requests found.</div>
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.tableContainer)}>
        <table {...stylex.props(styles.table)} aria-label='Service requests'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope='col' {...stylex.props(styles.headerCell)}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} {...stylex.props(styles.row)}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} {...stylex.props(styles.cell)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  headerCell: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: '1px solid #e2e8f0',
  },
  row: {
    ':hover': {
      backgroundColor: '#f7fafc',
    },
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

  cell: {
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
  tableDateData: {
    width: '2rem',
    minWidth: 'auto',
  },
  tableContainer: {
    overflowX: 'auto',
    width: '100%',
  },
  descriptionLink: {
    color: '#3182ce',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  techniciansList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  technicianLink: {
    color: '#3182ce',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  emptyState: {
    padding: '24px',
    textAlign: 'center',
    color: '#718096',
  },
})
