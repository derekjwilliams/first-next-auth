// src/components/ServiceRequestTable.tsx
'use client'
import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import Pagination from './Pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { serviceTypes } from '../utils/serviceTypes'
import dayjs from 'dayjs'

import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { colors } from '@derekjwilliams/stylextras-open-props-pr/colors.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import ServiceRequestDropdownMenu from './ServiceRequestDropdownMenu'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { Tables } from '@/utils/database.types'

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
    paddingTop: '20px',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: marigoldColors.backgroundPage,
  },
  dataWrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto minmax(0, 0.5fr) auto',
    gap: '10px',
    width: '95%',
    marginBottom: '20px',
    marginTop: '20px',
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: 'auto',
    maxWidth: '100%',
    borderCollapse: 'collapse',
    backgroundColor: marigoldColors.backgroundCard,
    tableLayout: 'fixed',
    borderWidth: '2px',
    borderColor: marigoldColors.borderSubtle,
    borderStyle: 'solid',
    borderRadius: borders.radius1,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
  },
  tableRow: {
    backgroundColor: {
      default: marigoldColors.backgroundCard,
      ':hover': marigoldColors.backgroundDetails,
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    transition: 'background-color 0.2s ease',
  },
  tableHeaderRow: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    height: sizes.spacing8,
    color: marigoldColors.textPrimary,
    textAlign: 'left',
    fontWeight: fonts.weight6,
    fontSize: fonts.size2,
    padding: sizes.spacing1,
    backgroundColor: marigoldColors.backgroundDetails,
  },
  tableHead: {
    textAlign: 'left',
    paddingLeft: sizes.spacing1,
    color: marigoldColors.textAccent,
    fontWeight: fonts.weight6,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: fonts.size1,
  },
  tableData: {
    textAlign: 'left',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: marigoldColors.borderSubtle,
    color: marigoldColors.textPrimary,
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
      default: marigoldColors.textLinkButton,
      ':hover': marigoldColors.textAccent,
    },
    transition: 'color 0.2s ease',
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
    color: marigoldColors.textPrimary,
  },
  dataTime: {
    marginLeft: '0.5rem',
    whiteSpace: 'nowrap',
    color: marigoldColors.textMuted,
  },
  tableDropdownData: {
    width: 'auto',
    minWidth: 'auto',
  },
  statusBadge: {
    display: 'inline-block',
    padding: `${sizes.spacing1} ${sizes.spacing2}`,
    borderRadius: borders.radius1,
    fontSize: fonts.size1,
    fontWeight: fonts.weight6,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: marigoldColors.textAccent,
    color: '#fff',
  },
  noAssigned: {
    color: marigoldColors.textMuted,
    fontStyle: 'italic',
    fontSize: fonts.size1,
  },
})

const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
    alignItems: 'center',
  },
  checkboxRoot: {
    backgroundColor: {
      default: marigoldColors.backgroundCard,
      ':hover': marigoldColors.backgroundDetails,
    },
    width: 25,
    height: 25,
    borderRadius: borders.radius1,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: marigoldColors.borderSubtle,
    borderStyle: 'solid',
    borderWidth: 2,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  checkboxIndicator: {
    padding: 0,
  },
  icon: {
    color: marigoldColors.textAccent,
    height: '100%',
    width: '100%',
  },
})

interface ServiceRequestTableProps {
  data: Tables<'service_requests'>[]
  currentPage: number
  totalPages: number
  sortColumn: string
  sortDirection: string
}

const ServiceRequestTable: React.FC<ServiceRequestTableProps> = ({
  data,
  currentPage,
  totalPages,
  sortColumn,
  sortDirection,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleSort = (column: string) => {
    if (column !== 'technicians') {
      const newSortDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
      const params = new URLSearchParams(searchParams ? searchParams.toString() : undefined)
      params.set('sortColumn', column)
      params.set('sortDirection', newSortDirection)
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const pascalToSnakeCase = (value: string) => {
    if (value) {
      return value.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, '$1_').toLowerCase()
    }
    return 'no_match'
  }

  const columns: ColumnDef<Tables<'service_requests'>>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'statuses',
      header: 'Status',
    },
    {
      accessorKey: 'locations',
      header: 'Address',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'date_created',
      header: 'Created',
    },
    {
      accessorKey: 'service_types',
      header: 'Type',
    },
    {
      accessorKey: 'technicians',
      header: 'Technicians',
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: {
        id: false,
        description: true,
        technicians: true,
        statuses: true,
      },
    },
  })

  return (
    <div {...stylex.props(styles.containerWrapper)}>
      <div {...stylex.props(styles.dataWrapper)}>
        <div {...stylex.props(styles.tableWrapper)}>
          <table {...stylex.props(styles.table)}>
            <thead>
              {table.getHeaderGroups().map((headerGroup: any) => {
                return (
                  <tr
                    key={headerGroup.id}
                    {...stylex.props(styles.tableHeaderRow)}>
                    <th {...stylex.props(styles.tableHead)}></th>
                    {headerGroup.headers.map((header: any) => {
                      return (
                        <th
                          key={header.id}
                          id={header.id}
                          {...stylex.props(styles.tableHead)}
                          style={{
                            cursor: `${header.id !== 'technicians' ? 'pointer' : 'default'}`,
                          }}
                          onClick={() => handleSort(header.id)}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortColumn === header.id ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
                        </th>
                      )
                    })}
                    <th
                      key='dropdown_menu'
                      {...stylex.props(styles.tableHead)}>
                      <ServiceRequestDropdownMenu></ServiceRequestDropdownMenu>
                    </th>
                  </tr>
                )
              })}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row: any) => {
                const serviceRequestId = row.getValue('id') as string
                return (
                  <tr
                    key={row.id}
                    {...stylex.props(styles.tableRow)}>
                    <td {...stylex.props(styles.tableData, styles.tableCheckboxData)}>
                      <Checkbox.Root
                        {...stylex.props(requestCard.checkboxRoot)}
                        id={`request_${serviceRequestId}`}
                        key={`request_${serviceRequestId}`}>
                        <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
                          <Check {...stylex.props(requestCard.icon)} />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                    </td>
                    {row.getVisibleCells().map((cell: any) => {
                      if (cell.column.id === 'statuses') {
                        const status = cell.getValue() as Tables<'statuses'>
                        return (
                          <td
                            key={cell.id}
                            {...stylex.props(styles.tableData, styles.tableStatusData)}>
                            {status ? <span {...stylex.props(styles.statusBadge)}>{status.status_name}</span> : ''}
                          </td>
                        )
                      }
                      if (cell.column.id === 'locations') {
                        const locations = cell.getValue() as Tables<'locations'>

                        if (locations) {
                          const link = `/properties/${locations.id}`
                          return (
                            <td
                              key={cell.id}
                              {...stylex.props(styles.tableData, styles.tableTechnicianData)}>
                              <Link
                                {...stylex.props(styles.tableDataLink)}
                                href={link}>{`${locations.street_address} ${locations.unit_number || ''}`}</Link>
                            </td>
                          )
                        }
                      }
                      if (cell.column.id === 'description') {
                        const link = `/servicerequests/${serviceRequestId}`
                        return (
                          <td
                            key={cell.id}
                            {...stylex.props(styles.tableData, styles.tableDescriptionData)}>
                            <Link
                              {...stylex.props(styles.tableDataLink)}
                              href={link}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Link>
                          </td>
                        )
                      }
                      if (cell.column.id === 'service_types') {
                        const serviceType = cell.getValue() as Tables<'service_types'>
                        const link = `/servicetypes/${pascalToSnakeCase(serviceType.service_name)}`
                        const displayName = serviceType?.service_name
                          ? serviceTypes?.get(serviceType.service_name)?.displayName || ''
                          : ''
                        return (
                          <td
                            key={cell.id}
                            {...stylex.props(styles.tableData)}>
                            <Link
                              {...stylex.props(styles.tableDataLink)}
                              href={link}>
                              {displayName}
                            </Link>
                          </td>
                        )
                      }
                      if (cell.column.id === 'tenants') {
                        const tenant = cell.getValue() as Tables<'tenants'>
                        return (
                          <td
                            key={cell.id}
                            {...stylex.props(styles.tableData)}>
                            {tenant.name}
                          </td>
                        )
                      }
                      if (cell.column.id === 'date_created') {
                        const formattedDate = dayjs(cell.getValue()).format('MM/DD/YYYY')
                        const formattedTime = dayjs(cell.getValue()).format('HH:mm A')
                        return (
                          <td
                            key={cell.id}
                            {...stylex.props(styles.tableData, styles.tableDateData)}>
                            <span {...stylex.props(styles.dataDate)}>{formattedDate}</span>
                            {/* <span {...stylex.props(styles.dataTime)}>{formattedTime}</span> */}
                          </td>
                        )
                      }
                      if (cell.column.id === 'technicians') {
                        const technicians = cell.getValue() as Tables<'technicians'>[]

                        if (technicians.length) {
                          return (
                            <td
                              key={cell.id}
                              {...stylex.props(styles.tableData, styles.tableTechnicianData)}>
                              {technicians.map((technician) => {
                                return (
                                  <Link
                                    key={technician.id}
                                    href={`technicians/${technician.id}`}
                                    {...stylex.props(styles.tableDataLink)}
                                    style={{
                                      paddingRight: '5px',
                                      display: 'inlineBlock',
                                      whiteSpace: 'pre',
                                    }}>
                                    {technician.name}
                                  </Link>
                                )
                              })}
                            </td>
                          )
                        }
                        return (
                          <td
                            key={cell.id}
                            {...stylex.props(styles.tableData)}>
                            <span {...stylex.props(styles.noAssigned)}>None Assigned</span>
                          </td>
                        )
                      }
                      return (
                        <td
                          key={cell.id}
                          {...stylex.props(styles.tableData)}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                    <td
                      key={`dropdown_menu_${row.id}`}
                      {...stylex.props(styles.tableData, styles.tableDropdownData)}>
                      <ServiceRequestDropdownMenu></ServiceRequestDropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default ServiceRequestTable
