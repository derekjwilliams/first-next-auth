// // server/uploadthing.ts

// import { createUploadthing, type FileRouter, UTApi } from 'uploadthing/server' // Correct UTApi import

// // Initialize UploadThing instance
// const uploadthing = createUploadthing()

// // Define file router and access control (optional)
// const fileRouter: FileRouter = {
//   imageUploader: uploadthing({ image: { maxFileSize: '2MB' } }) // Adjust as necessary
//     .onUploadComplete(async ({ file }) => {
//       console.log('Upload complete:', file)
//     }),
// }

// // Initialize UTApi for retrieving file URLs
// const utapi = new UTApi() // Create an instance of UTApi

// // Export `utapi` and `fileRouter` to use its functions in your app
// export { utapi, fileRouter }
