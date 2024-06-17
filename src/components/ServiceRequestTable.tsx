// components/ServiceTypeTable.tsx
'use client'
import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import Pagination from './Pagination'
import { ServiceRequest, Technician } from '@/utils/servicerequest.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

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
    const newSortDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
    const params = new URLSearchParams(searchParams ? searchParams.toString() : undefined)
    params.set('sortColumn', column)
    params.set('sortDirection', newSortDirection)
    router.push(`${pathname}?${params.toString()}`)
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
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={() => handleSort(header.id)}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sortColumn === header.id ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const serviceRequestId = row.getValue('id') as string
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === 'description') {
                    const link = `/servicerequests/${serviceRequestId}`
                    return (
                      <td key={cell.id}>
                        <Link href={link}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Link>
                      </td>
                    )
                  }
                  if (cell.column.id === 'technicians') {
                    const technicians = cell.getValue() as Technician[]

                    if (technicians.length) {
                      return (
                        <td key={cell.id}>
                          {technicians.map((technician) => {
                            return (
                              <Link
                                key={technician.id}
                                href={`technicians/${technician.id}`}
                                style={{ marginRight: '5px' }}>
                                {technician.name}
                              </Link>
                            )
                          })}
                        </td>
                      )
                    }
                    return <td key={cell.id}>No Technician Assigned</td>
                  }
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
