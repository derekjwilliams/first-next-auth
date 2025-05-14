// src/components/TechnicianDetailsPage.tsx
'use client'

import * as stylex from '@stylexjs/stylex'
import useTechnicianQuery from 'src/hooks/useTechnicianQuery'
import TechnicianDetails from './TechnicianDetails'
import ServiceRequestTableContainer from './ServiceRequestTableContainer'
import { useStatusMapQuery } from 'src/hooks/useStatusMapQuery'
import useServiceRequestsByTechnicianId from 'src/hooks/useServiceRequestsByTechnicianIdQuery'
import { useServiceTypesQuery } from 'src/hooks/useServiceTypeQuery'

interface TechnicianDetailsContainerProps {
  technicianId: string
}

const styles = stylex.create({
  detailsWrapper: {
    margin: '20px',
  },
})

export default function TechnicianDetailsContainer({ technicianId }: TechnicianDetailsContainerProps) {
  // --- Data Fetching ---
  const {
    data: technician,
    isLoading: isLoadingTechnician,
    isError: isErrorTechnician,
    error: errorTechnician,
  } = useTechnicianQuery(technicianId)

  const { data: statusMap = {}, isLoading: statusMapLoading } = useStatusMapQuery()

  const { data: serviceTypes = [] } = useServiceTypesQuery()

  const serviceTypeOptions = serviceTypes.map((type) => ({
    id: type.id,
    name: type.service_name || 'Unnamed Service',
  }))

  const statusOptions = Object.entries(statusMap).map(([id, name]) => ({
    id,
    name: name as string,
  }))

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
          serviceTypeOptions={serviceTypeOptions}
          statusOptions={statusOptions}
          entityType='technician'
        />
      )}
    </div>
  )
}
