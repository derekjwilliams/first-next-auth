'use client'

import { useEffect, useState } from 'react'

type FileItem = {
  key: string
  url: string
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/uploadthing/list')
        if (!response.ok) throw new Error('Failed to fetch files')

        const data = await response.json()
        setFiles(data.map((file: any) => ({ key: file.key, url: file.url })))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  return (
    <div>
      <h2>Uploaded Files</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {files.length > 0 ? (
            files.map((file) => (
              <li key={file.key}>
                <a href={file.url} target='_blank' rel='noopener noreferrer'>
                  {file.key}
                </a>
              </li>
            ))
          ) : (
            <p>No files found.</p>
          )}
        </ul>
      )}
    </div>
  )
}
