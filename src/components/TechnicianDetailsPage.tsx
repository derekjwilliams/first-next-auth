// src/components/TechnicianDetailsPage.tsx
'use client'

import * as stylex from '@stylexjs/stylex'
import useTechnicianQuery from 'src/hooks/useTechnicianQuery'
import TechnicianDetails from './TechnicianDetails'
import ServiceRequestTableContainer from './ServiceRequestTableContainer'
import { useStatusMapQuery } from 'src/hooks/useStatusMapQuery'
import useServiceRequestsByTechnicianId from 'src/hooks/useServiceRequestsByTechnicianIdQuery'

interface TechnicianDetailsPageProps {
  technicianId: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
  },
})

export default function TechnicianDetailsPage({ technicianId }: TechnicianDetailsPageProps) {
  // --- Data Fetching ---
  const {
    data: technician,
    isLoading: isLoadingTechnician,
    isError: isErrorTechnician,
    error: errorTechnician,
  } = useTechnicianQuery(technicianId)

  const { data: statusMap = {}, isLoading: statusMapLoading } = useStatusMapQuery()

  if (isLoadingTechnician && !technician) {
    return <div>Loading technician data...</div>
  }

  if (isErrorTechnician) {
    return <div>Error loading technician details: {errorTechnician?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <div>
      <div {...stylex.props(styles.detailsWrapper)}>
        {technician && <TechnicianDetails technician={technician} />}
        {!technician && !isLoadingTechnician && <strong>{`Technician with ID ${technicianId} not found`}</strong>}
        {isLoadingTechnician && !technician && <div>Loading technician details...</div>}
      </div>

      {/* Only render the table container when technician data is loaded */}
      {technician && (
        <ServiceRequestTableContainer
          entityId={technicianId}
          statusMap={statusMap}
          isStatusMapLoading={statusMapLoading}
          useServiceRequestsQuery={useServiceRequestsByTechnicianId}
        />
      )}
    </div>
  )
}
