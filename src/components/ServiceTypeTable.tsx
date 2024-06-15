'use client'

import React, { useState } from 'react'
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from '@tanstack/react-table'
import { ServiceType } from '@/utils/servicetype.types'
import type { SortingState } from '@tanstack/react-table'

// TODO implement pagination and sorting, see https://medium.com/@aylo.srd/server-side-pagination-and-sorting-with-tanstack-table-and-react-bd493170125e
// and https://medium.com/@clee080/how-to-do-server-side-pagination-column-filtering-and-sorting-with-tanstack-react-table-and-react-7400a5604ff2

interface TableComponentProps {
  data: ServiceType[]
}

// Define the columns
const columns: ColumnDef<ServiceType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'service_name',
    header: 'Service',
  },
]
const ServiceTypeTable: React.FC<TableComponentProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <h1>Service Types Table</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {header.column.columnDef.header as React.ReactNode}
                      {{
                        asc: ' up',
                        desc: ' down',
                        // asc: ' 🔼',
                        // desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue() as React.ReactNode}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

//   return (
//     <table>
//       <thead>
//         {table.getHeaderGroups().map((headerGroup) => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map((header) => (
//               <th key={header.id}>
//                 {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody>
//         {table.getRowModel().rows.map((row) => (
//           <tr key={row.id}>
//             {row.getVisibleCells().map((cell) => (
//               <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

export default ServiceTypeTable
