'use client'

import { UploadButton } from '../../utils/uploadthing'
//Your file was uploaded, but the callback request to https://marigold-property.vercel.app/api/uploadthing failed. Reason: Response 429.
//This is most likely due to your callback URL blocking the request. Read more about potential causes in our FAQ.

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <UploadButton
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res)
          alert('Upload Completed')
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
    </main>
  )
}
