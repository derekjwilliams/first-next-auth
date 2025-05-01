// components/DocumentTable.tsx
'use client' // Mark this as a Client Component

import React, { useState, useEffect } from 'react'
import { Tables } from '@/utils/database.types'

export default function DocumentTable() {
  const [documents, setDocuments] = useState<Tables<'documents'>[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Function to fetch documents from the API
    const fetchDocuments = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/documents') // Call your GET endpoint
        if (!response.ok) {
          // Handle HTTP errors (e.g., 403 Forbidden if RLS/can() blocks)
          const errorData = await response.json().catch(() => ({})) // Try to get error details
          throw new Error(errorData.error || `Failed to fetch documents: ${response.statusText}`)
        }

        const data: Tables<'documents'>[] = await response.json()
        setDocuments(data)
      } catch (err: any) {
        console.error('Error fetching documents:', err)
        setError(err.message || 'An unexpected error occurred.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, []) // Empty dependency array means this runs once on mount

  // --- Render Logic ---

  if (isLoading) {
    return <p>Loading documents...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error loading documents: {error}</p>
  }

  if (documents.length === 0) {
    return <p>No documents found or you may not have permission to view any.</p>
  }

  return (
    <div>
      <h2>Documents List</h2>
      <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Sensitivity</th>
            <th>Owner ID</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.title}</td>
              <td>{doc.sensitivity ?? 'N/A'}</td>
              <td>{doc.owner_id ?? 'N/A'}</td>
              <td>{doc.department ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
