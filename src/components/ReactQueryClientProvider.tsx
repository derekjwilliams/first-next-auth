//components/ReactQueryClientProvider.tsx
//see https://www.youtube.com/watch?v=Z4L_UE0hVmo&t=445s
'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
)
