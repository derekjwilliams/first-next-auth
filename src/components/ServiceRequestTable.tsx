'use client'
import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import Pagination from './Pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ServiceRequest, ServiceType, Tenant, Technician } from '@/utils/servicerequest.types' // todo import from supabase types
import { serviceTypes } from '@/utils/serviceTypes'
import dayjs from 'dayjs'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
// import { fonts } from '@stylexjs/open-props/lib/fonts.stylex'
import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import { sizes } from '@stylexjs/open-props/lib/sizes.stylex'
import { fonts } from '../app/globalTokens.stylex'
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
  body: {
    fontFamily: `${fonts.appFont}, -apple-system, BlinkMacSystemFont, Arial`,
  },
  dataWrapper: {
    padding: sizes.spacing2,
    borderWidth: '10px',
  },
  table: {
    // width: '100%',
    margin: sizes.spacing2,
    backgroundColor: `${marigoldColors.dataBackground}`,
    // paddingLeft: sizes.spacing2,
    // paddingTop: sizes.spacing2,
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    width: 'auto', // overrides the :where width: fit-width from normalize.css
  },
})
const requestCard = stylex.create({
  base: {
    margin: sizes.spacing2,
    display: 'flex',
    alignItems: 'center',
  },
  checkboxRoot: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray6,
    borderStyle: 'solid',
    borderWidth: 2,
    marginRight: sizes.spacing2,
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

/*
          borderCollapse: 'collapse',
          // outline: '1px solid rgb(208, 215, 222)',
          tableLayout: 'fixed',
          margin: '15px',
          width: 'auto', // overrides the :where width: fit-width from normalize.css
*/

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
        description: true, //hide this column by default
        technicians: true,
      },
    },
  })

  return (
    <div {...stylex.props(styles.dataWrapper)}>
      <table {...stylex.props(styles.table)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr
              key={headerGroup.id}
              style={{ backgroundColor: marigoldColors.background, border: `1px solid ${marigoldColors.background}` }}>
              <th></th>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  id={header.id}
                  style={{
                    border: `1px solid ${marigoldColors.background}`,
                    color: marigoldColors.foreground,
                    textAlign: 'left',
                    fontWeight: '300',
                    fontSize: '1.2rem',
                    padding: '10px',
                    cursor: `${header.id !== 'technicians' ? 'pointer' : ''}`,
                    backgroundColor: marigoldColors.background,
                  }}
                  onClick={() => handleSort(header.id)}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sortColumn === header.id ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
              <th
                style={{
                  border: '1px solid rgb(208, 215, 222)',
                  verticalAlign: 'top',
                }}>
                {' '}
                <ServiceRequestDropdownMenu></ServiceRequestDropdownMenu>
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => {
            const serviceRequestId = row.getValue('id') as string
            return (
              <tr key={row.id}>
                <td>
                  <Checkbox.Root {...stylex.props(requestCard.checkboxRoot)} id={serviceRequestId}>
                    <Checkbox.Indicator {...stylex.props(requestCard.checkboxIndicator)}>
                      <CheckIcon {...stylex.props(requestCard.checkIcon)} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </td>
                {row.getVisibleCells().map((cell: any) => {
                  if (cell.column.id === 'description') {
                    const link = `/servicerequests/${serviceRequestId}`
                    return (
                      <td
                        key={cell.id}
                        style={{
                          textAlign: 'left',
                          width: '40rem',
                          minWidth: '10rem',
                          border: '1px solid rgb(208, 215, 222)',
                          padding: '10px',
                          wordBreak: 'break-word',
                          verticalAlign: 'top',
                        }}>
                        <Link href={link} style={{ marginRight: '15px' }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Link>
                      </td>
                    )
                  }
                  if (cell.column.id === 'service_types') {
                    const serviceType = cell.getValue() as ServiceType
                    const link = `/servicerequests/new/${pascalToSnakeCase(serviceType.service_name)}`
                    return (
                      <td
                        key={cell.id}
                        style={{
                          padding: '10px',
                          border: '1px solid rgb(208, 215, 222)',
                          verticalAlign: 'top',
                          textAlign: 'left',
                        }}>
                        <Link href={link}>{serviceTypes.get(serviceType.service_name).displayName}</Link>
                      </td>
                    )
                  }
                  if (cell.column.id === 'tenants') {
                    const tenant = cell.getValue() as Tenant
                    return <td key={cell.id}>{tenant.name}</td>
                  }
                  if (cell.column.id === 'date_created') {
                    const formattedDate = dayjs(cell.getValue()).toDate().toLocaleString('en-US')
                    return (
                      <td
                        key={cell.id}
                        style={{
                          padding: '10px',
                          marginRight: '15px',
                          border: '1px solid rgb(208, 215, 222)',
                          verticalAlign: 'top',
                          textAlign: 'left',
                        }}>
                        {formattedDate}
                      </td>
                    )
                  }
                  if (cell.column.id === 'technicians') {
                    const technicians = cell.getValue() as Technician[]

                    if (technicians.length) {
                      return (
                        <td
                          key={cell.id}
                          style={{
                            border: '1px solid rgb(208, 215, 222)',
                            padding: '10px',
                            verticalAlign: 'top',
                            width: '10rem',
                            textAlign: 'left',
                          }}>
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
                      <td
                        key={cell.id}
                        style={{ border: '1px solid rgb(208, 215, 222)', padding: '10px', textAlign: 'left' }}>
                        None Assigned
                      </td>
                    )
                  }
                  return (
                    <td key={cell.id} style={{ border: '1px solid rgb(208, 215, 222)' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
                <td
                  style={{
                    border: '1px solid rgb(208, 215, 222)',
                    verticalAlign: 'top',
                  }}>
                  {' '}
                  <ServiceRequestDropdownMenu></ServiceRequestDropdownMenu>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default ServiceRequestTable
