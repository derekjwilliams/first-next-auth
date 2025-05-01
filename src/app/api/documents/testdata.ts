import { ResourceAttributes } from '@/lib/permissions'

interface Document extends ResourceAttributes {
  id: string
  title: string
  content?: string // Added content field
}

let documentsDb: Document[] = [
  { id: 'doc-1', title: 'Public Announcement', sensitivity: 'public', content: 'Hello world!' },
  {
    id: 'doc-2',
    title: 'Engineering Roadmap Q3',
    ownerId: 'user-123',
    department: 'Engineering',
    sensitivity: 'internal',
    content: 'Secret plans...',
  },
  {
    id: 'doc-3',
    title: 'Sales Strategy Q3',
    ownerId: 'user-other',
    department: 'Sales',
    sensitivity: 'internal',
    content: 'More secret plans...',
  },
  {
    id: 'doc-4',
    title: 'My Confidential Notes',
    ownerId: 'user-123',
    sensitivity: 'confidential',
    content: 'Super secret!',
  },
]

export { documentsDb }
