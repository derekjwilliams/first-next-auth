// app/documents/page.tsx
import DocumentTable from '@/components/DocumentTable'
import React from 'react'
import AuthStatusDisplay from '@/components/AuthStatusDisplay'
import AuthButtons from '@/components/AuthButtons'
// import { cookies } from 'next/headers' // Import to read cookies server-side
// import { loginAction, logoutAction } from '@/app/actions' // Import Server Actions

// Optional: Add metadata
export const metadata = {
  title: 'Documents List',
}

// This is a Server Component by default
export default async function DocumentsPage() {
  // Read the cookie on the server during rendering
  // const cookieStore = await cookies()
  // const sessionCookie = cookieStore.get('session-id') // Use the same name as in actions.ts
  // const loggedInUser = sessionCookie?.value // Get the user ID from the cookie value

  return (
    <div>
      <h1>Document Management</h1>
      <p>Displaying documents fetched client-side.</p>

      <div style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #eee' }}>
        <h2>Authentication</h2>
        <AuthStatusDisplay />
        <AuthButtons />
        {/* <h2>Login Status (Server Render)</h2>
        {loggedInUser ? (
          <div>
            <p>Logged in as: {loggedInUser}</p>
            <form action={logoutAction}>
              <button type='submit'>Logout</button>
            </form>
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <form action={loginAction} style={{ display: 'inline-block', marginRight: '10px' }}>
              <input type='hidden' name='userId' value='user-123-editor-eng' />
              <button type='submit'>Login as Editor (Eng)</button>
            </form>
            <form action={loginAction} style={{ display: 'inline-block', marginRight: '10px' }}>
              <input type='hidden' name='userId' value='user-456-viewer-sales' />
              <button type='submit'>Login as Viewer (Sales)</button>
            </form>
            <form action={loginAction} style={{ display: 'inline-block' }}>
              <input type='hidden' name='userId' value='user-789-admin' />
              <button type='submit'>Login as Admin</button>
            </form>
          </div>
        )} 
        <p>
          <small>Note: Login sets an HttpOnly cookie. Logout clears it.</small>
        </p>*/}
      </div>
      <DocumentTable />
    </div>
  )
}

// Ensure the page re-renders dynamically when cookies change
// This might not be strictly necessary if revalidatePath works reliably,
// but can help ensure freshness.
// export const dynamic = 'force-dynamic'// TODO is this still needed?

// // app/documents/page.tsx
// import DocumentTable from '@/components/DocumentTable' // Adjust path as needed
// import React from 'react'

// // This is a Server Component by default, but it renders a Client Component
// export default function DocumentsPage() {
//   return (
//     <div>
//       <h1>Document Management</h1>
//       <p>Displaying documents fetched client-side.</p>
//       <DocumentTable />
//     </div>
//   )
// }

// // Optional: Add metadata
// export const metadata = {
//   title: 'Documents List',
// }
