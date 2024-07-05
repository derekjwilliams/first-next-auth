CREATE OR REPLACE FUNCTION insert_service_request_with_technicians(
  _description text,
  _technician_ids uuid[],
  _completed boolean,
  _date_created timestamp,
  _date_updated timestamp,
  _details text,
  _location_id uuid,
  _service_type_id uuid,
  _status_id uuid,
  _steps varchar[]
)
RETURNS void AS $$
DECLARE
  _service_request_id uuid;
  technician_id uuid; -- Declare a variable to hold each technician ID
BEGIN
  -- Insert into service_request
  INSERT INTO service_request (
    id,
    description,
    completed,
    date_created,
    date_updated,
    details,
    location_id,
    requested_by,
    service_type_id,
    status_id,
    steps
  )
  VALUES (
    uuid_generate_v4(), -- Generate a UUID for the service request ID
    _description,
    _completed,
    _date_created,
    _date_updated,
    _details,
    _location_id,
    auth.uid(), -- Assuming this captures the authenticated user ID
    _service_type_id,
    _status_id,
    _steps
  )
  RETURNING id INTO _service_request_id;

  -- Insert into the join table for each technician
  FOREACH technician_id IN ARRAY _technician_ids
  LOOP
    INSERT INTO service_request_technicians (service_request_id, technician_id)
    VALUES (_service_request_id, technician_id);
  END LOOP;

  -- Log the result
  RAISE NOTICE 'Inserted service_request with id: %', _service_request_id;

EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error inserting service request: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION insert_service_request_with_technicians(
  _description text,
  _technician_ids uuid[],
  _completed boolean,
  _date_created timestamp,
  _date_updated timestamp,
  _details text,
  _location_id uuid,
  _service_type_id uuid,
  _status_id uuid,
  _steps varchar[]
)
RETURNS void AS $$
DECLARE
  _service_request_id uuid;
BEGIN
  -- Insert into service_request
  INSERT INTO service_request (
    description,
    completed,
    date_created,
    date_updated,
    details,
    location_id,
    requested_by,
    service_type_id,
    status_id,
    steps
  )
  VALUES (
    _description,
    _completed,
    _date_created,
    _date_updated,
    _details,
    _location_id,
    auth.uid(), -- Ensure this captures the authenticated user ID
    _service_type_id,
    _status_id,
    _steps
  )
  RETURNING id INTO _service_request_id;

  -- Insert into the join table for each technician
  FOREACH technician_id IN ARRAY _technician_ids
  LOOP
    INSERT INTO service_request_technicians (service_request_id, technician_id)
    VALUES (_service_request_id, technician_id);
  END LOOP;

  -- Log the result
  RAISE NOTICE 'Inserted service_request with id: %', _service_request_id;

EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error inserting service request: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION insert_service_request_with_technicians(
  _description TEXT,
  _technician_ids UUID[],
  _completed BOOLEAN,
  _date_created TIMESTAMP,
  _date_updated TIMESTAMP,
  _details TEXT,
  _location_id UUID,
  _service_type_id UUID,
  _status_id UUID,
  _steps VARCHAR[]
)
RETURNS VOID AS $$
DECLARE
  _service_request_id UUID;
BEGIN
  -- Insert the new service request
  INSERT INTO service_request (
    description,
    completed,
    date_created,
    date_updated,
    details,
    location_id,
    requested_by,
    service_type_id,
    status_id,
    steps
  ) VALUES (
    _description,
    _completed,
    _date_created,
    _date_updated,
    _details,
    _location_id,
    auth.uid(),  -- Use the authenticated user's ID
    _service_type_id,
    _status_id,
    _steps
  )
  RETURNING id INTO _service_request_id;

  -- Insert into the join table for technicians
  INSERT INTO service_request_technicians (service_request_id, technician_id)
  SELECT _service_request_id, UNNEST(_technician_ids);

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_service_request_with_technicians(
    service_description TEXT,
    technician_ids TEXT[],
    completed BOOLEAN,
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    details TEXT,
    location_id UUID,
    requested_by UUID,
    service_type_id UUID,
    status_id UUID,
    steps VARCHAR[]
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
        status_id,
        steps
    )
    VALUES (
        completed,
        date_created,
        date_updated,
        service_description,
        details,
        location_id,
        requested_by,
        service_type_id,
        status_id,
        steps
    )
    RETURNING id INTO new_service_request_id;

    -- Insert the technicians for the new service request
    INSERT INTO service_request_technicians (service_request_id, technician_id)
    SELECT new_service_request_id, unnest(technician_ids)::UUID;

END;
$$ LANGUAGE plpgsql;
