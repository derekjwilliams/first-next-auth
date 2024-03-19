'use client'

import useNotesQuery from '@/hooks/useNotesQuery'

export default function NotePage({ params }: { params: { id: number } }) {
  const { data: note, isLoading, isError } = useNotesQuery(params.id)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !note) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }

  return (
    <>
      <div>{note.title}</div>
    </>
  )
}
