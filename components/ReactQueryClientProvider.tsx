'use client'
import { toast } from 'react-hot-toast'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
type MyErrorResponse = {
  message: string
  code: string
  hint: string
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      let e: MyErrorResponse = JSON.parse(JSON.stringify(error)) // workaround for Tanstack Query error type issue
      toast.error(
        `Something went wrong: ${e.message}.  ${
          e.code === 'PGRST116'
            ? 'This can be caused by trying to load a protected page'
            : ''
        }`,
        { duration: 4000 }
      )
    },
  }),
})
export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

//see https://www.youtube.com/watch?v=Z4L_UE0hVmo&t=445s
