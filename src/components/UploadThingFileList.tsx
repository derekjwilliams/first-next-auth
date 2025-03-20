'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type FileItem = {
  file_key: string
  file_url: string
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/uploadthing/list')
        if (!response.ok) {
          throw new Error('Failed to fetch files')
        }

        const data = await response.json()
        setFiles(data.map((file: any) => ({ file_key: file.file_key, file_url: file.file_url })))
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
        <>
          <ul>
            {files.length > 0 ? (
              files.map((file) => (
                <div key={file.file_key}>
                  {/* <Image></Image> */}
                  <Image
                    alt={`uploaded image ${file.file_url}`}
                    width={128}
                    height={128}
                    src={file.file_url}
                    priority={false}
                  />
                  <a href={file.file_url} target='_blank' rel='noopener noreferrer'>
                    {file.file_url}
                  </a>
                </div>
              ))
            ) : (
              <p>No files found.</p>
            )}
          </ul>
        </>
      )}
    </div>
  )
}
