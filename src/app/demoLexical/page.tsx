'use client'

import React from 'react'
import './styles.css'
import RichTextEditor from '@/components/lexical/RichTextEditor'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import EditorContainer from '@/components/EditorContainer'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnMount: false,
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//       retry: 0,
//     },
//   },
// })

export default function Home() {
  return (
    <div>
      <RichTextEditor />
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <EditorContainer /> */}
      {/* </QueryClientProvider> */}
    </div>
  )
}
