// src/components/LocationDetails.tsx
import { LocationWithDetails } from '../queries/getLocationById'

interface LocationDetailsProps {
  location: LocationWithDetails
}
export default function LocationDetails({ location }: LocationDetailsProps) {
  if (!location) {
    return <p>Location not found.</p> // Improved message
  }
  return (
    <div>
      <p>
        <strong>Address:</strong> {location.street_address} {location.unit_number}
      </p>
      <p>
        <strong>City, State, Postal Code:</strong> {location.city}, {location.state_province} {location.postal_code}
      </p>
      <p>
        <strong>Bedrooms:</strong> {location.bedrooms.length}
      </p>
      <p>
        <strong>Bathrooms:</strong> {location.bathrooms.length}
      </p>
    </div>
  )
}
