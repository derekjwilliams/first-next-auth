'use client'

import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : undefined)
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          style={{ margin: '0 5px' }}>
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
