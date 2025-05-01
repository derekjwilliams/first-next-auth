// app/actions.ts
'use server' // Mark this file as containing Server Actions

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const COOKIE_NAME = 'session-id' // Use a consistent name for your session cookie

/**
 * Server Action to simulate logging in by setting an HttpOnly cookie.
 */
// export async function loginAction(formData: FormData) {
//   const userId = formData.get('userId') as string

//   if (!userId) {
//     // Basic validation
//     console.error('Login Action: No userId provided.')
//     return // Or throw an error
//   }

//   console.log(`Login Action: Attempting to log in as ${userId}`)
//   const cookieStore = await cookies()
//   // Set the HttpOnly cookie
//   cookieStore.set(COOKIE_NAME, userId, {
//     httpOnly: true, // CRITICAL: Makes the cookie inaccessible to client-side JavaScript
//     path: '/', // Make the cookie available across the entire site
//     secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
//     sameSite: 'lax', // Recommended for CSRF protection (Lax allows top-level navigation)
//     maxAge: 60 * 60 * 24 * 7, // Example: Cookie expires in 7 days (in seconds)
//   })

//   // Revalidate the documents page to reflect the logged-in state
//   revalidatePath('/documents')
//   // Optional: Redirect the user after login
//   // redirect('/documents');
// }

/**
 * Server Action to log out by deleting the session cookie.
 */
// export async function logoutAction() {
//   console.log('Logout Action: Clearing session cookie')
//   const cookieStore = await cookies()
//   // Delete the cookie
//   await cookieStore.delete(COOKIE_NAME)

//   // Revalidate the documents page
//   revalidatePath('/documents')
//   // Optional: Redirect the user after logout
//   // redirect('/');
// }
