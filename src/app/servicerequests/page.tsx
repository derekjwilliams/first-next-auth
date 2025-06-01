// // src/app/servicerequests/page.tsx
import { Suspense } from 'react'
import AllServiceRequestsPage from '../../components/AllServiceRequestsPage'
export default async function Page() {
  return (
    <Suspense>
      <AllServiceRequestsPage />
    </Suspense>
  )
}
