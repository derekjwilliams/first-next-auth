// src/app/servicerequests/new/page.tsx
'use client'

import { Suspense } from 'react'
import NewServiceRequestPageInner from './NewServiceRequestPageInner'

export default function NewServiceRequestPage() {
  return (
    <Suspense fallback={<div>Loading form data...</div>}>
      <NewServiceRequestPageInner />
    </Suspense>
  )
}
