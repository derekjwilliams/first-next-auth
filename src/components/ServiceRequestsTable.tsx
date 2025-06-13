// src/components/ServiceRequestsTable.tsx
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
import dayjs from 'dayjs'
import { formatCurrency, pascalToSnakeCase, pascalToSpacedTerm } from '@/utils/stringUtils'
import { styles } from './ServiceRequestsTableStyles'
const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE, 5)
  : 5

interface ServiceRequestsTableProps {
  serviceRequests: ServiceRequestRow[]
  totalCount: number
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
  pagination: PaginationState
  onPaginationChange: (pagination: PaginationState) => void
  includeArchived: boolean
  onIncludeArchivedChange: (includeArchived: boolean) => void
  isLoading: boolean
  statusMap: Record<string, string>
  entityType: 'location' | 'serviceType' | 'technician' | ''
}

const getStatusBadgeStyle = (statusName: string) => {
  const status = statusName?.toLowerCase()
  if (status === 'open') return [styles.statusBadge, styles.statusOpen]
  if (status === 'closed') return [styles.statusBadge, styles.statusClosed]
  if (status === 'in progress' || status === 'in_progress') return [styles.statusBadge, styles.statusInProgress]
  return [styles.statusBadge, styles.statusClosed] // default
}

const getColumns = (
  entityType: ServiceRequestsTableProps['entityType'],
  statusMap: ServiceRequestsTableProps['statusMap'],
): ColumnDef<ServiceRequestRow>[] => [
  {
    accessorKey: 'status_id',
    header: 'Status',
    cell: (info) => {
      const statusId = info.getValue() as string
      const statusName = statusMap[statusId] ?? 'Unknown'
      return <span {...stylex.props(...getStatusBadgeStyle(statusName))}>{statusName}</span>
    },
    enableSorting: true,
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
    enableSorting: true,
  },

  ...(entityType !== 'location'
    ? [
        {
          accessorKey: 'locations',
          header: 'Property',
          cell: (info: any) => {
            const location = info.getValue() as Tables<'locations'>
            if (!location) {
              return <div {...stylex.props(styles.unassignedText)}>None</div>
            }
            const unitSuffix = location.unit_number ? `, Unit ${location.unit_number}` : ''
            return (
              <Link
                href={`/properties/${location.id}`}
                {...stylex.props(styles.locationLink)}>
                {`${location.street_address} ${unitSuffix}`}
              </Link>
            )
          },
          enableSorting: true,
        },
      ]
    : []),
  ...(entityType !== 'serviceType'
    ? [
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          accessorFn: (row: any) => row.service_types?.service_name || 'Unnamed Service',
          id: 'service_type',
          header: 'Type',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cell: (info: any) => (
            <Link
              {...stylex.props(styles.descriptionLink)}
              href={`/servicetypes/${pascalToSnakeCase(info.getValue() as string)}`}>
              {pascalToSpacedTerm(info.getValue() as string)}
            </Link>
          ),
          enableSorting: true,
        },
      ]
    : []),
  {
    accessorKey: 'date_created',
    header: 'Created',
    cell: (info) => dayjs(info.getValue<Date>()).format('MM/DD/YYYY'),
    meta: {
      cellStyle: styles.dateTimeColumn,
    },
    enableSorting: true,
  },
  {
    accessorKey: 'material_cost',
    header: 'Material',
    cell: (info) => formatCurrency(info.getValue() as number | null),
    meta: {
      cellStyle: styles.costCell,
    },
    enableSorting: true,
  },
  {
    accessorKey: 'labor_cost',
    header: 'Labor',
    cell: (info) => formatCurrency(info.getValue() as number | null),
    meta: {
      cellStyle: styles.costCell,
    },
    enableSorting: true,
  },
  {
    accessorKey: 'technicians',
    header: 'Technicians',
    cell: ({ getValue }) => {
      const technicians = getValue() as Array<Tables<'technicians'>>
      if (!technicians?.length) {
        return <div {...stylex.props(styles.unassignedText)}>Unassigned</div>
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
    enableSorting: false,
  },
]

export default function ServiceRequestsTable({
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
  entityType,
}: ServiceRequestsTableProps): React.JSX.Element {
  const columns = getColumns(entityType, statusMap)

  const handleHeaderClick = (columnId: string) => {
    const currentSort = sorting.find((sort) => sort.id === columnId)
    let newSorting: SortingState

    if (!currentSort) {
      newSorting = [{ id: columnId, desc: false }]
    } else if (!currentSort.desc) {
      newSorting = [{ id: columnId, desc: true }]
    } else {
      newSorting = [{ id: columnId, desc: false }]
    }
    onSortingChange(newSorting)
  }

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
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
                    {...stylex.props(
                      styles.headerCell,
                      !header.column.getCanSort() && styles.headerCellNonSortable,
                      // Add column-specific width styles
                      header.column.id === 'status_id' && styles.statusColumn,
                      header.column.id === 'service_type' && styles.typeColumn,
                      header.column.id === 'material_cost' && styles.costColumn,
                      header.column.id === 'labor_cost' && styles.costColumn,
                      header.column.id === 'technicians' && styles.technicianColumn,
                      header.column.id === 'description' && styles.descriptionColumn,
                    )}
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
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  {...stylex.props(styles.emptyState)}>
                  No service requests found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  {...stylex.props(styles.row)}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      {...stylex.props(
                        styles.cell,
                        cell.column.id === 'material_cost' && styles.costCell,
                        cell.column.id === 'labor_cost' && styles.costCell,
                      )}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div {...stylex.props(styles.footer)}>
          Showing {table.getRowModel().rows.length} of {totalCount} service requests
        </div>
      </div>

      <div {...stylex.props(styles.paginationControls)}>
        <div {...stylex.props(styles.archivedCheckboxContainer)}>
          <input
            id='include-archived'
            type='checkbox'
            checked={includeArchived}
            onChange={handleIncludeArchivedChange}
            {...stylex.props(styles.archivedCheckbox)}
          />
          <label
            htmlFor='include-archived'
            {...stylex.props(styles.archivedLabel)}>
            Include Archived
          </label>
        </div>

        <div {...stylex.props(styles.paginationNavigation)}>
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
    </div>
  )
}
