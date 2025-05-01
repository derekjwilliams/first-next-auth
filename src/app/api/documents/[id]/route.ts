// // app/api/documents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
// Removed 'cookies' import here as it's handled within the helper
import { createSupabaseServerClient, getCurrentUserAttributes } from '@/lib/supabase-api/server' // Use updated helpers
// import { createSupabaseServerClient, getCurrentUserAttributes } from '@/lib/supabase-api/server' // Use updated helpers
import { can, ResourceAttributes } from '@/lib/permissions'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { documentsDb } from '../testdata'

// ... (getDocumentAttributes function remains the same) ...
// ... (updateSchema remains the same) ...
async function getDocumentAttributes(id: string): Promise<ResourceAttributes | null> {
  console.log(`API: Fetching attributes for request ${id}`)
  // In real app: const supabase = createSupabaseServerClient();
  // await supabase.from('documents').select('owner_id, department, sensitivity').eq('id', id).single();

  // HACK mock data
  if (id === 'doc-2') {
    return { ownerId: 'user-123', department: 'Engineering', sensitivity: 'internal' }
  }
  if (id === 'doc-4') {
    return { ownerId: 'user-123', sensitivity: 'confidential' }
  }
  return null
}
interface Document extends ResourceAttributes {
  id: string
  title: string
  content?: string // Added content field
}

// Simulate fetching a single document's full data and attributes
async function getDocument(id: string): Promise<Document | null> {
  console.log(`API [id]: Fetching document ${id}`)
  // In real app: Use Supabase client passed in or created with cookieStore
  // const { data, error } = await supabase.from('documents').select('*').eq('id', id).maybeSingle();
  // if (error) throw error; return data;
  const doc = documentsDb.find((d) => d.id === id)
  return doc ? { ...doc } : null // Return a copy
}

// Simulate deleting a document
async function deleteDocument(id: string): Promise<boolean> {
  console.log(`API [id]: Deleting document ${id}`)
  const initialLength = documentsDb.length
  // documentsDb = documentsDb.filter((d) => d.id !== id)
  return documentsDb.length < initialLength
}

// Simulate updating a document
async function updateDocument(id: string, data: Partial<Document>): Promise<Document | null> {
  console.log(`API [id]: Updating document ${id} with`, data)
  const docIndex = documentsDb.findIndex((d) => d.id === id)
  if (docIndex === -1) return null
  documentsDb[docIndex] = { ...documentsDb[docIndex], ...data }
  return { ...documentsDb[docIndex] } // Return a copy
}
// --- End Simulation ---

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  // Add other updatable fields, but be careful about sensitivity, ownerId etc.
})

// --- GET /api/documents/[id] ---
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies() // Use await as per Supabase docs

  try {
    // 1. Auth: Get user (can be null for public reads)
    const user = await getCurrentUserAttributes() // Uses await cookies() internally

    // 2. Fetch Resource (needed for ABAC check and response)
    const document = await getDocument(id)
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // 3. Authorization Check (ABAC)
    // Pass the fetched document attributes to can()
    if (!can(user, 'read', document)) {
      // Even if the doc exists, if they can't read it, treat as not found or forbidden
      // Returning 404 hides existence, 403 reveals existence but denies access.
      console.warn(`API: Permission Denied - User ${user?.id ?? 'anon'} tried 'read' on doc ${id}`)
      return NextResponse.json({ error: 'Document not found' }, { status: 404 }) // Or 403
    }

    // 4. Return Data
    // Important: Supabase RLS *should* have already prevented fetching if not allowed,
    // but the `can()` check provides defense-in-depth and handles complex app logic.
    return NextResponse.json(document)
  } catch (error) {
    console.error(`API GET /documents/${id}: Error`, error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// --- PATCH /api/documents/[id] ---

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // No need to get cookieStore or pass it here anymore

  try {
    // 1. Authentication & User Attributes (uses the updated helper)
    const user = await getCurrentUserAttributes()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Fetch Resource Attributes
    const resource = await getDocumentAttributes(id)
    if (!resource) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // 3. Authorization Check (ABAC) - No change here
    if (!can(user, 'edit', resource)) {
      console.warn(`API: Permission Denied - User ${user.id} tried 'edit' on doc ${id}`)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 4. Input Validation - No change here
    let updateData
    try {
      const body = await request.json()
      updateData = updateSchema.parse(body)
    } catch (error) {
      console.error('API: Invalid request body:', error)
      return NextResponse.json({ error: 'Bad Request', details: (error as Error).message }, { status: 400 })
    }

    // 5. Perform Update (Simulated)
    // If you need DB access here, create a client *instance* for this operation
    const cookieStore = await cookies()
    const supabase = createSupabaseServerClient(cookieStore) // Create client instance if needed for DB op
    console.log(`API: User ${user.id} authorized. Updating doc ${id} with:`, updateData)
    // const { error: updateError } = await supabase.from('documents')... // Use the instance

    // 6. Return Success Response
    return NextResponse.json({ success: true, message: `Document ${id} updated.` })
  } catch (error) {
    console.error(`API: Error updating document ${id}:`, error)
    // Ensure sensitive details aren't leaked in production errors
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params
//   const cookieStore = await cookies() // Use await

//   try {
//     // 1. Authentication & User Attributes
//     const user = await getCurrentUserAttributes()
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     // 2. Fetch Resource Attributes (needed for ABAC check)
//     // In a real app, you might fetch only necessary fields for the check first
//     const currentDocument = await getDocument(id)
//     if (!currentDocument) {
//       return NextResponse.json({ error: 'Document not found' }, { status: 404 })
//     }

//     // 3. Authorization Check (ABAC)
//     if (!can(user, 'edit', currentDocument)) {
//       console.warn(`API: Permission Denied - User ${user.id} tried 'edit' on doc ${id}`)
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
//     }

//     // 4. Input Validation
//     let updateData
//     try {
//       const body = await request.json()
//       updateData = updateSchema.parse(body)
//     } catch (error) {
//       console.error('API PATCH: Invalid request body:', error)
//       return NextResponse.json({ error: 'Bad Request', details: (error as Error).message }, { status: 400 })
//     }
//     if (Object.keys(updateData).length === 0) {
//       return NextResponse.json({ error: 'Bad Request', details: 'No update data provided.' }, { status: 400 })
//     }

//     // 5. Perform Update (Simulated)
//     // const supabase = createSupabaseServerClient(cookieStore); // Create client if needed
//     const updatedDoc = await updateDocument(id, updateData)
//     // In real app: check for errors from updateDocument/supabase call

//     // 6. Return Success Response
//     return NextResponse.json(updatedDoc) // Return updated document
//   } catch (error) {
//     console.error(`API PATCH /documents/${id}: Error`, error)
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//   }
// }

// --- DELETE /api/documents/[id] ---
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies() // Use await

  try {
    // 1. Authentication & User Attributes
    const user = await getCurrentUserAttributes()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Fetch Resource Attributes (needed for ABAC check)
    const currentDocument = await getDocument(id)
    if (!currentDocument) {
      // If it doesn't exist, we can arguably return success (idempotent) or 404.
      // Let's return 404 for clarity.
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // 3. Authorization Check (ABAC)
    if (!can(user, 'delete', currentDocument)) {
      console.warn(`API: Permission Denied - User ${user.id} tried 'delete' on doc ${id}`)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 4. Perform Deletion (Simulated)
    // const supabase = createSupabaseServerClient(cookieStore); // Create client if needed
    const deleted = await deleteDocument(id)
    if (!deleted) {
      // Should ideally not happen if check passed, but good practice
      throw new Error('Simulated deletion failed unexpectedly.')
    }

    // 5. Return Success Response (No Content)
    return new NextResponse(null, { status: 204 }) // Standard for successful DELETE
  } catch (error) {
    console.error(`API DELETE /documents/${id}: Error`, error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
