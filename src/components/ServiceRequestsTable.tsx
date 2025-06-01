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
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'

const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_REQUEST_PAGE_SIZE, 5)
  : 5

const CURRENCY_SYMBOL = '$'

const commonLinkProperties = {
  color: marigoldColors.textLinkButton,
  textDecoration: 'none',
  fontWeight: fonts.weight5,
  ':hover': {
    color: marigoldColors.textAccent,
    textDecoration: 'underline',
  },
  transition: 'color 0.15s ease',
}

// Define styles with marigoldColors theme
const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden', // Prevent container overflow
  },
  tableContainer: {
    width: '100%',
    maxWidth: '100%',
    overflowX: 'auto',
    position: 'relative',
    backgroundColor: marigoldColors.backgroundCard,
    boxSizing: 'border-box',
  },
  table: {
    width: '100%',
    minWidth: '800px',
    borderCollapse: 'collapse',
    tableLayout: 'auto',
  },
  costColumn: {
    width: '110px',
    minWidth: '110px',
    maxWidth: '110px',
    textAlign: 'right',
    paddingRight: sizes.spacing2,
  },
  typeColumn: {
    width: '140px',
    minWidth: '140px',
    maxWidth: '140px',
  },
  dateTimeColumn: {
    width: '120px',
    minWidth: '120px',
    maxWidth: '100px',
  },
  statusColumn: {
    width: '150px',
    minWidth: '150px',
    maxWidth: '150px',
  },
  technicianColumn: {
    minWidth: '150px',
    maxWidth: '200px',
  },
  locationColumn: {
    minWidth: '150px',
    maxWidth: '200px',
  },
  descriptionColumn: {
    minWidth: '200px',
    // Let description take remaining space
  },
  headerCell: {
    paddingTop: sizes.spacing3,
    paddingBottom: sizes.spacing3,
    paddingLeft: sizes.spacing2,
    paddingRight: sizes.spacing2,
    textAlign: 'left',
    fontWeight: fonts.weight6,
    fontSize: fonts.size1,
    color: marigoldColors.tableHeaderText,
    backgroundColor: marigoldColors.tableHeaderBackground,
    cursor: 'pointer',
    userSelect: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap', // Prevent header text wrapping
    ':hover': {
      backgroundColor: marigoldColors.tableRowHover,
    },
    transition: 'background-color 0.15s ease',
  },
  row: {
    backgroundColor: marigoldColors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: marigoldColors.borderSubtle,
    ':hover': {
      backgroundColor: marigoldColors.tableRowHover,
    },
    transition: 'background-color 0.15s ease',
  },
  cell: {
    padding: sizes.spacing2, // Reduced padding
    color: marigoldColors.textPrimary,
    fontSize: fonts.size1, // Slightly smaller font
    verticalAlign: 'top',
    lineHeight: 1.4,
    maxWidth: '200px', // Set max width for cells
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: sizes.spacing2, // Reduced gap
    marginTop: sizes.spacing3,
    marginBottom: sizes.spacing3,
    padding: sizes.spacing3,
    backgroundColor: marigoldColors.backgroundCard,
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: sizes.spacing2,
    },
  },
  headerCellNonSortable: {
    cursor: 'default',
    ':hover': {
      backgroundColor: marigoldColors.tableHeaderBackground,
    },
  },
  sortIndicator: {
    marginLeft: sizes.spacing1,
    color: marigoldColors.textAccent,
    display: 'inline-flex',
    alignItems: 'center',
  },
  descriptionLink: {
    ...commonLinkProperties,
  },
  locationLink: {
    ...commonLinkProperties,
  },
  techniciansList: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing1,
  },
  technicianLink: {
    color: marigoldColors.textLinkButton,
    textDecoration: 'none',
    fontSize: fonts.size1,
    ':hover': {
      color: marigoldColors.textAccent,
      textDecoration: 'underline',
    },
    transition: 'color 0.15s ease',
  },
  unassignedText: {
    color: marigoldColors.textMuted,
    fontStyle: 'italic',
    fontSize: fonts.size1,
  },
  emptyState: {
    paddingTop: sizes.spacing6,
    paddingBottom: sizes.spacing6,
    paddingLeft: sizes.spacing4,
    paddingRight: sizes.spacing4,
    textAlign: 'center',
    color: marigoldColors.textMuted,
    fontSize: fonts.size3,
    fontWeight: fonts.weight5,
  },
  footer: {
    padding: `${sizes.spacing3} ${sizes.spacing4}`,
    textAlign: 'right',
    color: marigoldColors.textMuted,
    fontSize: fonts.size1,
    backgroundColor: marigoldColors.backgroundCard,
    borderTop: `1px solid ${marigoldColors.borderSubtle}`,
    borderRadius: `0 0 ${borders.radius2} ${borders.radius2}`,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    color: marigoldColors.textPrimary,
    fontSize: fonts.size3,
    fontWeight: fonts.weight6,
    borderRadius: borders.radius2,
  },
  paginationNavigation: {
    display: 'flex',
    alignItems: 'center',
    gap: sizes.spacing3,
  },
  paginationButton: {
    paddingTop: sizes.spacing2,
    paddingBottom: sizes.spacing2,
    paddingLeft: sizes.spacing4,
    paddingRight: sizes.spacing4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    borderRadius: borders.radius1,
    backgroundColor: marigoldColors.backgroundButton,
    color: marigoldColors.foregroundButton,
    cursor: 'pointer',
    fontWeight: fonts.weight5,
    fontSize: fonts.size1,
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: marigoldColors.backgroundHoverButton,
      borderColor: marigoldColors.textAccent,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: marigoldColors.backgroundButton,
      ':hover': {
        backgroundColor: marigoldColors.backgroundButton,
        borderColor: marigoldColors.borderSubtle,
      },
    },
  },
  pageInfo: {
    margin: `0 ${sizes.spacing2}`,
    color: marigoldColors.textPrimary,
    fontSize: fonts.size1,
    fontWeight: fonts.weight5,
    whiteSpace: 'nowrap',
  },
  pageSizeSelect: {
    paddingTop: sizes.spacing2,
    paddingBottom: sizes.spacing2,
    paddingLeft: sizes.spacing3,
    paddingRight: sizes.spacing3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    borderRadius: borders.radius1,
    backgroundColor: marigoldColors.selectBackground,
    color: marigoldColors.selectInputColor,
    fontSize: fonts.size1,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: marigoldColors.textAccent,
    },
  },
  costCell: {
    textAlign: 'right',
    fontWeight: fonts.weight5,
    fontFamily: 'monospace',
    paddingRight: sizes.spacing8,
  },
  archivedCheckboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: sizes.spacing2,
    color: marigoldColors.textPrimary,
    fontSize: fonts.size1,
  },
  archivedCheckbox: {
    width: 16,
    height: 16,
    cursor: 'pointer',
  },
  archivedLabel: {
    cursor: 'pointer',
    fontWeight: fonts.weight5,
    color: marigoldColors.textPrimary,
  },
  statusBadge: {
    display: 'inline-block',
    paddingTop: sizes.spacing1,
    paddingBottom: sizes.spacing1,
    paddingLeft: sizes.spacing2,
    paddingRight: sizes.spacing2,
    borderRadius: borders.radius1,
    fontSize: fonts.size0,
    fontWeight: fonts.weight6,
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    color: '#ffffff',
    minWidth: '60px',
    textAlign: 'center',
  },
  statusOpen: {
    backgroundColor: marigoldColors.statusOpen,
  },
  statusClosed: {
    backgroundColor: marigoldColors.statusClosed,
  },
  statusInProgress: {
    backgroundColor: marigoldColors.statusInProgress,
  },
})

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
}

const pascalToSnakeCase = (value: string) => {
  if (value) {
    return value.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, '$1_').toLowerCase()
  }
  return ''
}

const pascalToSpacedTerm = (value: string) => {
  if (!value) return ''
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (c) => c.toUpperCase())
}

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
}: ServiceRequestsTableProps): React.JSX.Element {
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || typeof value === 'undefined') {
      return 'N/A'
    }
    return `${CURRENCY_SYMBOL}${value.toFixed(2)}`
  }

  const getStatusBadgeStyle = (statusName: string) => {
    const status = statusName?.toLowerCase()
    if (status === 'open') return [styles.statusBadge, styles.statusOpen]
    if (status === 'closed') return [styles.statusBadge, styles.statusClosed]
    if (status === 'in progress' || status === 'in_progress') return [styles.statusBadge, styles.statusInProgress]
    return [styles.statusBadge, styles.statusClosed] // default
  }

  const columns: ColumnDef<ServiceRequestRow>[] = [
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
    {
      accessorFn: (row: any) => row.service_types?.service_name || 'Unnamed Service',
      id: 'service_type',
      header: 'Type',
      cell: (info: any) => (
        <Link
          {...stylex.props(styles.descriptionLink)}
          href={`/servicetypes/${pascalToSnakeCase(info.getValue() as string)}`}>
          {pascalToSpacedTerm(info.getValue() as string)}
        </Link>
      ),
      enableSorting: true,
    },
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

// Styles would be defined here (same as in SimpleServiceRequestsTable)
// Omitted for brevity - copy from existing component
