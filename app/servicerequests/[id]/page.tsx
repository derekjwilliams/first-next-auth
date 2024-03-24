import NoteDetail from '@/components/NoteDetail'

export default async function NoteDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const id = params.id

  return <NoteDetail id={id}></NoteDetail>
}
