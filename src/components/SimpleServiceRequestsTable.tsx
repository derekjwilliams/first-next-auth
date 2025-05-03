'use client'
'use no memo' // needed for react compiler

import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
} from '@tanstack/react-table'
import { Tables } from '@/utils/database.types'
import { useState } from 'react'

type ServiceRequestRow = Tables<'service_requests'> & {
  service_types: Tables<'service_types'>
  technicians: Array<Tables<'technicians'>>
}

interface SimpleServiceRequestsTableProps {
  serviceRequests: ServiceRequestRow[]
  totalCount: number
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
  isLoading: boolean
}

// Define styles
const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  tableContainer: {
    overflowX: 'auto',
    width: '100%',
    position: 'relative',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerCell: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: '1px solid #e2e8f0',
    cursor: 'pointer',
    userSelect: 'none',
  },
  sortIndicator: {
    marginLeft: '4px',
  },
  row: {
    ':hover': {
      backgroundColor: '#f7fafc',
    },
  },
  cell: {
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
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
  footer: {
    padding: '12px 16px',
    textAlign: 'right',
    color: '#718096',
    fontSize: '14px',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
})

export default function SimpleServiceRequestsTable({
  serviceRequests = [],
  totalCount = 0,
  sorting = [],
  onSortingChange,
  isLoading = false,
}: SimpleServiceRequestsTableProps): React.JSX.Element {
  // Using the direct ColumnDef syntax
  const [debugTick, setDebugTick] = useState(0)
  const forceRefresh = () => setDebugTick((n) => n + 1)
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
    },
  ]

  // Custom handler for column header clicks to manage the sorting cycle
  const handleHeaderClick = (columnId: string) => {
    console.log('Current sorting:', sorting)

    // Find if this column is already being sorted
    const currentSort = sorting.find((sort) => sort.id === columnId)

    let newSorting: SortingState = []

    if (!currentSort) {
      // Not currently sorted - set to ascending
      console.log(`Not currently sorted - set to ascending, columnId: ${columnId}`)
      newSorting = [{ id: columnId, desc: false }]
    } else if (!currentSort.desc) {
      // Currently ascending - change to descending
      console.log(`Change to descending, columnId: ${columnId}`)
      newSorting = [{ id: columnId, desc: true }]
    } else {
      // Currently descending - change back to ascending
      console.log(`Change back to ascending, columnId: ${columnId}`)
      newSorting = [{ id: columnId, desc: false }]
    }

    // Call the parent's onSortingChange with the new sorting state
    onSortingChange(newSorting)
  }
  // Create a handler that matches the expected OnChangeFn type
  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    // For our custom implementation, we'll ignore the updater function
    // and rely on our custom handleHeaderClick instead
    if (typeof updaterOrValue !== 'function') {
      onSortingChange(updaterOrValue)
    }
  }

  const table = useReactTable({
    data: serviceRequests,
    columns,
    state: {
      sorting,
    },
    onSortingChange: handleSortingChange,
    manualSorting: true, // Tell the table we're handling sorting manually
    getCoreRowModel: getCoreRowModel(),
  })

  if (!serviceRequests.length && !isLoading) {
    return <div {...stylex.props(styles.emptyState)}>No service requests found.</div>
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.tableContainer)}>
        {isLoading && <div {...stylex.props(styles.loadingOverlay)}>Loading...</div>}

        <table {...stylex.props(styles.table)} aria-label='Service requests'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope='col'
                    {...stylex.props(styles.headerCell)}
                    onClick={() => header.column.getCanSort() && handleHeaderClick(header.column.id)}
                    aria-sort={
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span {...stylex.props(styles.sortIndicator)}>
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? ''}
                    </span>
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
      {totalCount > serviceRequests.length && (
        <div {...stylex.props(styles.footer)}>
          Showing {serviceRequests.length} of {totalCount} service requests
        </div>
      )}
    </div>
  )
}
