'use client'
import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, SortingFn, Row } from '@tanstack/react-table'
import Pagination from './Pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ServiceRequest, ServiceType, Tenant, Technician, Status, RequestLocation } from '@/utils/servicerequest.types' // todo import from supabase types
import { serviceTypes } from '@/utils/serviceTypes'
import dayjs from 'dayjs'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import ServiceRequestDropdownMenu from './ServiceRequestDropdownMenu'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

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
    backgroundColor: marigoldColors.background,
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
const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
    alignItems: 'center',
  },
  checkboxRoot: {
    backgroundColor: { default: 'white', ':hover': marigoldColors.flowerYellow },
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray6,
    borderStyle: 'solid',
    borderWidth: 2,
  },

  checkboxIndicator: {
    padding: 0,
  },
  checkIcon: {
    color: '#1d2496',
    height: '100%',
    width: '100%',
  },
})

interface ServiceRequestTableProps {
  data: ServiceRequest[]
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

  const columns: ColumnDef<ServiceRequest>[] = [
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
                  <tr key={headerGroup.id} {...stylex.props(styles.tableHeaderRow)}>
                    <th {...stylex.props(styles.tableHead)}></th>
                    {headerGroup.headers.map((header: any) => {
                      return (
                        <th
                          key={header.id}
                          id={header.id}
                          {...stylex.props(styles.tableHead)}
                          style={{
                            cursor: `${header.id !== 'technicians' ? 'pointer' : ''}`,
                          }}
                          onClick={() => handleSort(header.id)}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortColumn === header.id ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                        </th>
                      )
                    })}
                    <th
                      key='dropdown_menu'
                      {...stylex.props(styles.tableHead)}
                      style={{
                        cursor: 'pointer',
                      }}>
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
                  <tr key={row.id}>
                    <td {...stylex.props(styles.tableData, styles.tableCheckboxData)}>
                      <Checkbox.Root
                        {...stylex.props(requestCard.checkboxRoot)}
                        id={`request_${serviceRequestId}`}
                        key={`request_${serviceRequestId}`}>
                        <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
                          <CheckIcon {...stylex.props(requestCard.checkIcon)} />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                    </td>
                    {row.getVisibleCells().map((cell: any) => {
                      if (cell.column.id === 'statuses') {
                        const status = cell.getValue() as Status
                        return (
                          <td key={cell.id} {...stylex.props(styles.tableData, styles.tableStatusData)}>
                            {status ? status.status_name : ''}
                          </td>
                        )
                      }
                      if (cell.column.id === 'locations') {
                        const locations = cell.getValue() as RequestLocation

                        if (locations) {
                          const link = `/properties/${locations.id}`
                          return (
                            <td key={cell.id} {...stylex.props(styles.tableData, styles.tableTechnicianData)}>
                              <Link {...stylex.props(styles.tableDataLink)} href={link}>{`${locations.street_address} ${
                                locations.unit_number || ''
                              }`}</Link>
                            </td>
                          )
                        }
                      }
                      if (cell.column.id === 'description') {
                        const link = `/servicerequests/${serviceRequestId}`
                        return (
                          <td key={cell.id} {...stylex.props(styles.tableData, styles.tableDescriptionData)}>
                            <Link {...stylex.props(styles.tableDataLink)} href={link}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Link>
                          </td>
                        )
                      }
                      if (cell.column.id === 'service_types') {
                        const serviceType = cell.getValue() as ServiceType
                        const link = `/servicerequests/new/${pascalToSnakeCase(serviceType.service_name)}`
                        return (
                          <td key={cell.id} {...stylex.props(styles.tableData)}>
                            <Link {...stylex.props(styles.tableDataLink)} href={link}>
                              {serviceTypes.get(serviceType.service_name).displayName}
                            </Link>
                          </td>
                        )
                      }
                      if (cell.column.id === 'tenants') {
                        const tenant = cell.getValue() as Tenant
                        return <td key={cell.id}>{tenant.name}</td>
                      }
                      if (cell.column.id === 'date_created') {
                        const formattedDate = dayjs(cell.getValue()).format('MM/DD/YYYY') // US style date
                        const formattedTime = dayjs(cell.getValue()).format('HH:mm A')
                        // formattedTime.replace(' ', '&nbsp')
                        // const formattedDate = dayjs(cell.getValue()).toDate().toLocaleString('en-US')
                        return (
                          <td key={cell.id} {...stylex.props(styles.tableData, styles.tableDateData)}>
                            <span {...stylex.props(styles.dataDate)}>{formattedDate}</span>
                            {/* <span {...stylex.props(styles.dataTime)}>{formattedTime}</span> */}
                          </td>
                        )
                      }
                      if (cell.column.id === 'technicians') {
                        const technicians = cell.getValue() as Technician[]

                        if (technicians.length) {
                          return (
                            <td key={cell.id} {...stylex.props(styles.tableData, styles.tableTechnicianData)}>
                              {technicians.map((technician) => {
                                return (
                                  <Link
                                    key={technician.id}
                                    href={`technicians/${technician.id}`}
                                    {...stylex.props(styles.tableDataLink)}
                                    style={{ paddingRight: '5px', display: 'inlineBlock', whiteSpace: 'pre' }}>
                                    {technician.name}
                                  </Link>
                                )
                              })}
                            </td>
                          )
                        }
                        return (
                          <td key={cell.id} {...stylex.props(styles.tableData)}>
                            None Assigned
                          </td>
                        )
                      }
                      return (
                        <td key={cell.id} {...stylex.props(styles.tableData)}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                    <td key={`dropdown_menu_${row.id}`} {...stylex.props(styles.tableData, styles.tableDropdownData)}>
                      <ServiceRequestDropdownMenu></ServiceRequestDropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default ServiceRequestTable
