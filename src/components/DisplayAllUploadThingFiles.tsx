// DisplayAllUploadThingFiles.tsx

import React from 'react'
import Image from 'next/image'

interface FileUrl {
  id: string
  url: string
}

interface DisplayAllUploadThingFilesProps {
  files: FileUrl[]
}

const DisplayAllUploadThingFiles: React.FC<DisplayAllUploadThingFilesProps> = ({ files }) => {
  return (
    <div>
      <h1>Uploaded Images</h1>
      <div>
        {files.map((file) => (
          <div key={file.id}>
            <Image
              src={file.url}
              alt={`Image ${file.id}`}
              width={500} // Specify a width
              height={300} // Specify a height
              layout='responsive' // Optional: Use "responsive" for responsive images
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayAllUploadThingFiles
