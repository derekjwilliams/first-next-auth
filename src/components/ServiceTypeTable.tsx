// components/ServiceTypeTable.tsx
'use client'
import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, SortingState } from '@tanstack/react-table'
import Pagination from './Pagination'
import { ServiceType } from '../utils/servicerequest.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ServiceTypeTableProps {
  data: ServiceType[]
  currentPage: number
  totalPages: number
  sortColumn: string
  sortDirection: string
}

const ServiceTypeTable: React.FC<ServiceTypeTableProps> = ({
  data,
  currentPage,
  totalPages,
  sortColumn,
  sortDirection,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // const [sorting, setSorting] = React.useState<Sorting[]>([])

  const handleSort = (column: string) => {
    const newSortDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
    const params = new URLSearchParams(searchParams ? searchParams.toString() : undefined)
    params.set('sortColumn', column)
    params.set('sortDirection', newSortDirection)
    router.push(`${pathname}?${params.toString()}`)
  }

  const columns: ColumnDef<ServiceType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'service_name',
      header: 'Service Name',
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default ServiceTypeTable
