// app/page.tsx or your appropriate file for the Home component
'use client'

import React, { useEffect, useState } from 'react'
import { UploadButton } from '../../utils/uploadthing'
import DisplayAllUploadThingFiles from '@/components/DisplayAllUploadThingFiles' // Adjust the import path according to your structure

interface FileUrl {
  id: string
  url: string
}

export default function Home() {
  const [files, setFiles] = useState<FileUrl[]>([])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/getAllFiles') // Adjust the endpoint as necessary
      if (!response.ok) {
        throw new Error('Failed to fetch files')
      }
      const data: FileUrl[] = await response.json()
      setFiles(data)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  useEffect(() => {
    fetchFiles() // Fetch files when the component mounts
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <UploadButton
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          console.log('Files: ', res)
          alert('Upload Completed')
          fetchFiles() // Fetch files again after upload to refresh the list
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`)
        }}
      />
      <DisplayAllUploadThingFiles files={files} /> {/* Pass the fetched files to DisplayAllFiles */}
    </main>
  )
}
