import { TypedSupabaseClient } from '@/utils/supabase/supabase'

export function getNoteById(client: TypedSupabaseClient, noteId: number) {
  return client
    ?.from('notes')
    .select('id, title')
    .eq(`id`, noteId)
    .throwOnError()
    .single()
}
