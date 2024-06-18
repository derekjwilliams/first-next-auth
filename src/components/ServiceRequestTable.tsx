'use client'
import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import Pagination from './Pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ServiceRequest, ServiceType, Tenant, Technician } from '@/utils/servicerequest.types' // todo import from supabase types
import { serviceTypes } from '@/utils/serviceTypes'
import dayjs from 'dayjs'

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
    <div style={{ margin: '15px' }}>
      <table
        style={{
          borderCollapse: 'collapse',
          borderTopRightRadius: '12px',
          borderTopLeftRadius: '12px',
          outlineOffset: '-1px',
          margin: '15px',
          outline: '1px solid rgb(208, 215, 222)',
          tableLayout: 'fixed',
          marginLeft: '15px',
          marginRight: 'auto',
        }}>
        <thead style={{ backgroundColor: 'rgb(246, 248, 250)' }}>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  id={header.id}
                  style={{
                    textAlign: 'left',
                    fontWeight: '300',
                    fontSize: '1.2rem',
                    padding: '10px',
                    cursor: `${header.id !== 'technicians' ? 'pointer' : ''}`,
                  }}
                  onClick={() => handleSort(header.id)}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sortColumn === header.id ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => {
            const serviceRequestId = row.getValue('id') as string
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell: any) => {
                  if (cell.column.id === 'description') {
                    const link = `/servicerequests/${serviceRequestId}`
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: '40rem',
                          minWidth: '10rem',
                          border: '1px solid rgb(208, 215, 222)',
                          padding: '10px',
                          wordBreak: 'break-word',
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
                      <td key={cell.id} style={{ padding: '10px', border: '1px solid rgb(208, 215, 222)' }}>
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
                        style={{ padding: '10px', marginRight: '15px', border: '1px solid rgb(208, 215, 222)' }}>
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
                          style={{ minWidth: '15rem', border: '1px solid rgb(208, 215, 222)', padding: '10px' }}>
                          {technicians.map((technician) => {
                            return (
                              <Link
                                key={technician.id}
                                href={`technicians/${technician.id}`}
                                style={{ padding: '0 5px' }}>
                                {technician.name}
                              </Link>
                            )
                          })}
                        </td>
                      )
                    }
                    return (
                      <td key={cell.id} style={{ border: '1px solid rgb(208, 215, 222)', padding: '10px' }}>
                        No Technician Assigned
                      </td>
                    )
                  }
                  return (
                    <td key={cell.id} style={{ border: '1px solid rgb(208, 215, 222)' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
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
