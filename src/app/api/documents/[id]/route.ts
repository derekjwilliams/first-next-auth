// app/api/documents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSupabaseServerClient, getCurrentUserAttributes } from '@/lib/supabase-api/server' // Correct path to server helpers
import { can, ResourceAttributes } from '@/lib/permissions' // Import ABAC logic
import { z } from 'zod'
import { Tables } from '@/utils/database.types'

// Removed simulation imports and data
// Removed local Document interface if defined here
// Removed simulation functions: getDocumentAttributes, getDocument, deleteDocument, updateDocument

// Zod schema for validating PATCH request body (keep this)
const updateSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  // Add other fields allowed for update, e.g., sensitivity, department
  // Be cautious about allowing changes to owner_id or critical fields via PATCH
  sensitivity: z.enum(['public', 'internal', 'confidential']).optional(),
  department: z.string().nullable().optional(),
})

// --- GET /api/documents/[id] --- (Fetch Single Document)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }, // Correct context signature
) {
  const { id } = await context.params // Await params
  const cookieStore = await cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  try {
    // 1. Fetch the document from Supabase
    // maybeSingle() returns data or null, doesn't error if not found (unless DB error)
    // RLS policy is applied automatically by Supabase based on the user's session
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .select('*') // Select all columns for the response
      .eq('id', id) // Filter by the provided ID
      .maybeSingle() // Fetch one or null

    // Handle potential database errors during fetch
    if (dbError) {
      console.error(`API GET /documents/${id}: Supabase error:`, dbError)
      return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 })
    }

    // 2. Check if document exists (or if RLS prevented access)
    if (!document) {
      // RLS might have returned null even if the doc exists but user can't see it
      return NextResponse.json({ error: 'Document not found or access denied' }, { status: 404 })
    }

    // 3. Optional: Application-level ABAC check (Defense-in-depth)
    // Although RLS should handle this, an extra check here can catch complex rules
    // or provide a safety net. Requires fetching user attributes.
    // const user = await getCurrentUserAttributes();
    // if (!can(user, 'read', document)) {
    //   console.warn(`API GET /documents/${id}: App-level permission denied for user ${user?.id ?? 'anon'}`);
    //   return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
    // }

    // 4. Return the fetched document data
    return NextResponse.json(document)
  } catch (err) {
    console.error(`API GET /documents/${id}: Unexpected error:`, err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// --- PATCH /api/documents/[id] --- (Update Single Document)
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const cookieStore = await cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  try {
    const user = await getCurrentUserAttributes()
    if (!user) {
      /* ... TODO Unauthorized ... */
    }

    // Fetch Current Document Attributes for Authorization Check
    // Select fields defined in the ResourceAttributes interface
    const { data: currentDocAttrsData, error: fetchError } = await supabase
      .from('documents')
      .select('owner_id, department, sensitivity') // Ensure these match ResourceAttributes fields
      .eq('id', id)
      .maybeSingle()

    if (fetchError) {
      /* ... Handle fetch error ... */
    }
    let currentDocResource

    if (currentDocAttrsData) {
      currentDocResource = {
        owner_id: currentDocAttrsData.owner_id,
        department: currentDocAttrsData.department,
        sensitivity: currentDocAttrsData.sensitivity,
      }
    } else {
      currentDocResource = null
    }
    if (!currentDocResource) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Authorization Check (Application-level ABAC) - Pass the correctly typed resource
    if (!can(user, 'edit', currentDocResource)) {
      console.warn(`API PATCH /documents/${id}: Permission Denied - User ${user ? user.id : '[NO USER]'} tried 'edit'`)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    let validatedUpdateData
    try {
      const body = await request.json()

      validatedUpdateData = updateSchema.parse(body)

      // 3. Check if any valid update fields were provided
      if (Object.keys(validatedUpdateData).length === 0) {
        return NextResponse.json(
          { error: 'Bad Request', details: 'No valid fields provided for update.' },
          { status: 400 },
        )
      }
    } catch (error) {
      // Handle JSON parsing errors or Zod validation errors
      console.error(`API PATCH /documents/${id}: Invalid request body:`, error)
      // Provide specific validation errors if using Zod
      const details = error instanceof z.ZodError ? error.errors : (error as Error).message
      return NextResponse.json({ error: 'Bad Request', details }, { status: 400 })
    }

    // Perform Supabase Update
    const { data: updatedDocument, error: updateError } = await supabase
      .from('documents')
      .update(validatedUpdateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error(`API PATCH /documents/${id}: Supabase update error:`, updateError)
      if (updateError.code === '42501') {
        // RLS permission denied
        return NextResponse.json({ error: 'Forbidden by database policy' }, { status: 403 })
      }
      return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
    }

    return NextResponse.json(updatedDocument)
  } catch (err) {
    console.error(`API PATCH /documents/${id}: Unexpected error:`, err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
// --- DELETE /api/documents/[id] --- (Delete Single Document)
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const cookieStore = await cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  try {
    const user = await getCurrentUserAttributes()
    if (!user) {
      /* ... Unauthorized ... */
    }

    // Fetch Current Document Attributes for Authorization Check (Optional but good practice)
    const { data: currentDocAttrsData, error: fetchError } = await supabase
      .from('documents')
      .select('owner_id, department, sensitivity') // Ensure these match ResourceAttributes fields
      .eq('id', id)
      .maybeSingle()

    if (fetchError) {
      /* ... TODO Handle fetch error ... */
    }

    // Explicitly type the fetched data
    const currentDocResource: ResourceAttributes | null = currentDocAttrsData
      ? {
          owner_id: currentDocAttrsData.owner_id, // Map DB column name to interface property name
          department: currentDocAttrsData.department,
          sensitivity: currentDocAttrsData.sensitivity,
        }
      : null

    if (!currentDocResource) {
      // Document not found, return 204 for idempotency
      return new NextResponse(null, { status: 204 })
    }

    // Authorization Check (Application-level ABAC) - Pass the correctly typed resource
    if (!can(user, 'delete', currentDocResource)) {
      console.warn(
        `API DELETE /documents/${id}: Permission Denied - User ${user ? user.id : '[NO USER]'} tried 'delete'`,
      )
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Perform Supabase Deletion
    const { error: deleteError } = await supabase.from('documents').delete().eq('id', id)

    if (deleteError) {
      /* ... TODO Handle delete error ... */
    }

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    /* ... TODO Handle unexpected error ... */
  }
}
