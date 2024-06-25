'use client'
import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import Pagination from './Pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ServiceRequest, ServiceType, Tenant, Technician, Status } from '@/utils/servicerequest.types' // todo import from supabase types
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
  dataWrapper: {
    padding: sizes.spacing2,
    height: '100%',
    marginBottom: '20px',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // overflowX: 'auto',
    // whiteSpace: 'nowrap',
    // width: '100%',
  },
  table: {
    margin: sizes.spacing2,
    backgroundColor: `${marigoldColors.dataBackground}`,
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    width: 'auto',
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
    fontSize: fonts.size3,
    padding: '10px',
    backgroundColor: marigoldColors.background,
  },
  tableHead: {
    textAlign: 'left',
    paddingLeft: '10px',
  },
  tableData: {
    textAlign: 'left',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: marigoldColors.background,
    padding: '10px',
    wordBreak: 'break-word',
    verticalAlign: 'top',
    fontSize: '1.1rem',
    minWidth: '8rem',
  },
  tableCheckboxData: {
    minWidth: 'auto',
  },
  tableStatusData: {
    minWidth: 'auto',
  },
  tableDescriptionData: {
    minWidth: '10rem',
    // width: '30rem',
  },
  tableTechnicianData: {
    width: '8rem',
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
    <div {...stylex.props(styles.dataWrapper)}>
      <div>
        <table {...stylex.props(styles.table)}>
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => {
              return (
                <tr key={headerGroup.id} {...stylex.props(styles.tableHeaderRow)}>
                  <th {...stylex.props(styles.tableHead)}></th>
                  {headerGroup.headers.map((header: any) => (
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
                  ))}
                  <th
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
                          {status.status_name}
                        </td>
                      )
                    }
                    if (cell.column.id === 'description') {
                      const link = `/servicerequests/${serviceRequestId}`
                      return (
                        <td key={cell.id} {...stylex.props(styles.tableData, styles.tableDescriptionData)}>
                          <Link href={link}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Link>
                        </td>
                      )
                    }
                    if (cell.column.id === 'service_types') {
                      const serviceType = cell.getValue() as ServiceType
                      const link = `/servicerequests/new/${pascalToSnakeCase(serviceType.service_name)}`
                      return (
                        <td key={cell.id} {...stylex.props(styles.tableData)}>
                          <Link href={link}>{serviceTypes.get(serviceType.service_name).displayName}</Link>
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
                          <span {...stylex.props(styles.dataTime)}>{formattedTime}</span>
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
                  <td {...stylex.props(styles.tableData, styles.tableDropdownData)}>
                    <ServiceRequestDropdownMenu></ServiceRequestDropdownMenu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default ServiceRequestTable
