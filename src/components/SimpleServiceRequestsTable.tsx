'use client'
'use no memo' // needed for react compiler with Tanstack table

import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
  type PaginationState,
} from '@tanstack/react-table'
import { Tables } from '@/utils/database.types'
import { ServiceRequestRow } from '../types'

const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE, 5)
  : 5

interface SimpleServiceRequestsTableProps {
  serviceRequests: ServiceRequestRow[]
  totalCount: number
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
  pagination: PaginationState
  onPaginationChange: (pagination: PaginationState) => void
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
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },

  paginationButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    backgroundColor: '#f8fafc',
    color: '#334155',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#e2e8f0',
      borderColor: '#cbd5e1',
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: '#f1f5f9',
    },
    ':focus-visible': {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    },
  },

  pageInfo: {
    margin: '0 0.5rem',
    color: '#475569',
    fontSize: '0.875rem',
    fontWeight: 500,
  },

  pageSizeSelect: {
    padding: '0.5rem 0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    backgroundColor: '#f8fafc',
    color: '#334155',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: '#cbd5e1',
    },
    ':focus': {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    },
  },
})

export default function SimpleServiceRequestsTable({
  serviceRequests = [],
  totalCount = 0,
  sorting = [],
  onSortingChange,
  pagination = { pageIndex: 0, pageSize: 10 },
  onPaginationChange,
  isLoading = false,
}: SimpleServiceRequestsTableProps): React.JSX.Element {
  // Using the direct ColumnDef syntax
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
      accessorFn: (row) => {
        // Handle all possible null/undefined cases
        if (!row.service_types) return 'Unknown'
        return row.service_types.service_name || 'Unnamed Service'
      },
      id: 'service_type',
      header: 'Type',
      cell: (info) => {
        // Additional safety in the cell renderer
        const value = info.getValue()
        return typeof value === 'string' ? value : 'Unknown'
      },
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

  const handleHeaderClick = (columnId: string) => {
    const currentSort = sorting.find((sort) => sort.id === columnId)

    let newSorting: SortingState = []

    if (!currentSort) {
      newSorting = [{ id: columnId, desc: false }]
    } else if (!currentSort.desc) {
      newSorting = [{ id: columnId, desc: true }]
    } else {
      newSorting = [{ id: columnId, desc: false }]
    }

    onSortingChange(newSorting)
  }
  // Create a handler that matches the expected OnChangeFn type
  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    if (typeof updaterOrValue !== 'function') {
      onSortingChange(updaterOrValue)
    }
  }
  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue
    onPaginationChange(newPagination)
  }

  const table = useReactTable({
    data: serviceRequests,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    manualSorting: true, // Tell the table we're handling sorting manually
    manualPagination: true,
    pageCount: Math.ceil(totalCount / (pagination?.pageSize || DEFAULT_PAGE_SIZE)),
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
      <div {...stylex.props(styles.paginationControls)}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          {...stylex.props(styles.paginationButton)}>
          Previous
        </button>
        <span {...stylex.props(styles.pageInfo)}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          {...stylex.props(styles.paginationButton)}>
          Next
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          {...stylex.props(styles.pageSizeSelect)}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div {...stylex.props(styles.footer)}>
        Showing {serviceRequests.length} of {totalCount} service requests
      </div>
    </div>
  )
}
