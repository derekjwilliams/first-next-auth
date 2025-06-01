// // src/app/servicerequests/page.tsx
import { Suspense } from 'react'
import AllServiceRequestsTableContainer from '../../components/AllServiceRequestsTableContainer'
export default async function Page() {
  return (
    <Suspense>
      <AllServiceRequestsTableContainer />
    </Suspense>
  )
}
