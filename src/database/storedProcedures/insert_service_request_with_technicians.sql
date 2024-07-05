
CREATE OR REPLACE FUNCTION insert_service_request_with_technicians(
    service_description TEXT,
    technician_ids TEXT[],
    completed BOOLEAN,
    details TEXT,
    location_id UUID,
    requested_by UUID,
    service_type_id UUID,
    status_id UUID
)
RETURNS VOID AS $$
DECLARE
    new_service_request_id UUID;
BEGIN
    -- Insert the new service requests
    INSERT INTO service_requests (
        completed,
        date_created,
        date_updated,
        description,
        details,
        location_id,
        requested_by,
        service_type_id,
        status_id
    )
    VALUES (
        completed,
        now(),
        now(),
        service_description,
        details,
        location_id,
        requested_by,
        service_type_id,
        status_id
    )
    RETURNING id INTO new_service_request_id;

    -- Insert the technicians for the new service request
    INSERT INTO service_request_technicians (service_request_id, technician_id)
    SELECT new_service_request_id, unnest(technician_ids)::UUID;

END;
$$ LANGUAGE plpgsql;


