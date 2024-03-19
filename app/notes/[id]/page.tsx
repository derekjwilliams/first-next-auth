'use client'

import useNotesQuery from '@/hooks/use-notes-query'

export default function NotePage({ params }: { params: { id: number } }) {
  const { data: note, isLoading, isError } = useNotesQuery(params.id)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !note) {
    return <div>Error</div>
  }
  return <div>{note.title}</div>
}
