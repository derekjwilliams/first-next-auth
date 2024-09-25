// app/api/getAllFiles/route.ts

import { NextResponse } from 'next/server'
import { utapi } from '@/server/uploadthing' // Adjust according to your path configuration

interface FileInfo {
  id: string
  key: string
  name: string
  customId: string | null
  status: 'Deletion Pending' | 'Failed' | 'Uploaded' | 'Uploading'
}

interface FileUrl {
  id: string
  url: string
}

export async function GET() {
  try {
    // Get the list of all files
    const { files }: { files: ReadonlyArray<FileInfo> } = await utapi.listFiles() // Use ReadonlyArray for files

    // Map over the files and get their URLs
    const fileUrls: FileUrl[] = await Promise.all(
      files.map(async (file) => {
        const { data } = await utapi.getFileUrls(file.key) // Get the response data
        const url = data[0]?.url // Extract the URL from the first item in the data array
        return { id: file.id, url } // Return the file id and URL
      }),
    )

    return NextResponse.json(fileUrls) // Return the file URLs as JSON
  } catch (error) {
    console.error('Error fetching file URLs:', error)
    return NextResponse.json({ message: 'Error fetching file URLs' }, { status: 500 })
  }
}
