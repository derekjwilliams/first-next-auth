// src/components/SimpleServiceRequestsTable.tsx
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
import { ArrowUpDown, SortAsc, SortDesc } from 'lucide-react'

const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE, 5)
  : 5

const CURRENCY_SYMBOL = '$'

interface SimpleServiceRequestsTableProps {
  serviceRequests: ServiceRequestRow[]
  totalCount: number
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
  pagination: PaginationState
  onPaginationChange: (pagination: PaginationState) => void
  includeArchived: boolean // <-- New prop
  onIncludeArchivedChange: (includeArchived: boolean) => void
  isLoading: boolean
  statusMap: Record<string, string>
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
  costCell: {
    textAlign: 'right', // Align currency to the right
  },
  archivedCheckboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
})

export default function SimpleServiceRequestsTable({
  serviceRequests = [],
  totalCount = 0,
  sorting = [],
  onSortingChange,
  pagination = { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE },
  onPaginationChange,
  includeArchived = false,
  onIncludeArchivedChange,
  isLoading = false,
  statusMap,
}: SimpleServiceRequestsTableProps): React.JSX.Element {
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || typeof value === 'undefined') {
      return 'N/A' // Or '-' or an empty string if preferred
    }
    // Basic number formatting with currency symbol
    return `${CURRENCY_SYMBOL}${value.toFixed(2)}`
  }

  const columns: ColumnDef<ServiceRequestRow>[] = [
    {
      accessorKey: 'status_id',
      header: 'Status',
      cell: (info) => {
        const statusId = info.getValue() as string
        return statusMap[statusId] ?? 'Unknown'
      },
      // enableSorting: true, // You might want to enable sorting by status
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row, getValue }) => (
        <Link
          href={`/servicerequests/${row.original.id}`}
          {...stylex.props(styles.descriptionLink)}>
          {getValue() as string}
        </Link>
      ),
      // enableSorting: true, // Sorting by description is often useful
    },
    {
      accessorFn: (row) => row.service_types?.service_name || 'Unnamed Service',
      id: 'service_type',
      header: 'Type',
      cell: (info) => info.getValue() as string,
      // enableSorting: true,
    },
    {
      accessorKey: 'material_cost', // New Column
      header: 'Material Cost',
      cell: (info) => formatCurrency(info.getValue() as number | null),
      meta: {
        cellStyle: styles.costCell,
      },
    },
    {
      accessorKey: 'labor_cost', // New Column
      header: 'Labor Cost',
      cell: (info) => formatCurrency(info.getValue() as number | null),
      meta: {
        cellStyle: styles.costCell,
      },
    },
    {
      accessorKey: 'technicians',
      header: 'Assigned Technicians',
      cell: ({ getValue }) => {
        const technicians = getValue() as Array<Tables<'technicians'>>
        if (!technicians?.length) {
          return <div>Unassigned</div>
        }

        return (
          <div {...stylex.props(styles.techniciansList)}>
            {technicians.map((tech) => (
              <Link
                key={tech.id}
                href={`/technicians/${tech.id}`}
                {...stylex.props(styles.technicianLink)}>
                {tech.name}
              </Link>
            ))}
          </div>
        )
      },
      enableSorting: false, // Typically false for multi-value fields unless handled specially
    },
  ]

  const handleHeaderClick = (columnId: string) => {
    const currentSort = sorting.find((sort) => sort.id === columnId)
    let newSorting: SortingState

    if (!currentSort) {
      newSorting = [{ id: columnId, desc: false }]
    } else if (!currentSort.desc) {
      newSorting = [{ id: columnId, desc: true }]
    } else {
      // Cycle back to unsorted or to ascending, depending on preference
      // For simplicity, cycling back to ascending:
      newSorting = [{ id: columnId, desc: false }]
      // Or to remove sorting for this column:
      // newSorting = sorting.filter(s => s.id !== columnId);
    }
    onSortingChange(newSorting)
  }

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    // TanStack Table can pass a value or an updater function
    const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue
    onSortingChange(newSorting)
  }

  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue
    onPaginationChange(newPagination)
  }

  const handleIncludeArchivedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onIncludeArchivedChange(event.target.checked)
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
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / (pagination?.pageSize || DEFAULT_PAGE_SIZE)),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.tableContainer)}>
        {isLoading && <div {...stylex.props(styles.loadingOverlay)}>Loading...</div>}
        <table
          {...stylex.props(styles.table)}
          aria-label='Service requests'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope='col'
                    {...stylex.props(styles.headerCell)}
                    onClick={() => header.column.getCanSort() && handleHeaderClick(header.column.id)}
                    style={{
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    }}
                    aria-sort={
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span {...stylex.props(styles.sortIndicator)}>
                        {header.column.getIsSorted() === 'asc' ? (
                          <SortAsc size={16} />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <SortDesc size={16} />
                        ) : (
                          <ArrowUpDown size={16} />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                {...stylex.props(styles.row)}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    {...stylex.props(styles.cell)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div {...stylex.props(styles.paginationControls)}>
        <div {...stylex.props(styles.archivedCheckboxContainer)}>
          <input
            id='include-archived'
            type='checkbox'
            checked={includeArchived}
            onChange={handleIncludeArchivedChange}
          />
          <label htmlFor='include-archived'>Include Archived</label>
        </div>
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            {...stylex.props(styles.paginationButton)}>
            Previous
          </button>
          <span {...stylex.props(styles.pageInfo)}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            {...stylex.props(styles.paginationButton)}>
            Next
          </button>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          {...stylex.props(styles.pageSizeSelect)}>
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option
              key={size}
              value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      <div {...stylex.props(styles.footer)}>
        Showing {table.getRowModel().rows.length} of {totalCount} service requests
      </div>
    </div>
  )
}
