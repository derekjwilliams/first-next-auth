import { useQuery } from '@tanstack/react-query'
import useSupabase from './useSupabase'
import { getNoteById } from '@/queries/getNoteById'

function useNotesQuery(noteId: number | null) {
  const client = useSupabase()
  const id = !noteId ? 1 : noteId
  const queryKey = ['notes', id]

  const queryFn = async () => {
    return getNoteById(client, id)?.then((result) => result.data)
  }
  return useQuery({ queryKey, queryFn })
}

export default useNotesQuery
