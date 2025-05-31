// src/components/ClientOnlyServiceRequestEditForm.tsx
'use client'

import dynamic from 'next/dynamic'

const ServiceRequestEditForm = dynamic(() => import('./ServiceRequestEditForm'), {
  ssr: false,
  loading: () => <div>Loading form...</div>,
})

export default ServiceRequestEditForm
