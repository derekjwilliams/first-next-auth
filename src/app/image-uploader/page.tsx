/* src/app/image-uploader/page.tsx */
'use client'

import UploadThingFileList from '@/components/UploadThingFileList'
import { UploadButton } from '@/utils/uploadthing'

export default function Home() {
  return (
    <main className=''>
      <UploadButton
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // console.log('Files: ', res)
          if (res.length === 1) {
            alert(`Upload Completed, ${res[0].key}, ${res[0].name}`)
          } else {
            alert(`No files uploaded, ${JSON.stringify(res)}`)
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`)
        }}
      />
      <UploadThingFileList></UploadThingFileList>
    </main>
  )
}
