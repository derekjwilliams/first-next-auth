# rental-management



# Goal is to keep tenant smiling.


## User should be able to report an problem 

  * Ticket
    * Reported By
    * Asset (e.g. gutter, washer, dryer, roof)
    * Problem description
      * Severity
      * Timeliness of repair, e.g. now, this week, this month
      * Problem Date

## Marigold will notify user when repair will take place

  * Ticket
    * Assigned To
    * Assigned At
    * Updated By
    * Updated At
    * Scheduled Repair Date and Time
    * Status (e.g. open, in-assessment, on-hold, scheduled, resolved, canceled)
      * in-assessment, e.g. plumber is assessing how to repair leak 

  * Will be notified when whole house heater filter will be replaced (scheduled item)

  * Will be notified when sewer will be roto'd by a plumber (scheduled item)

  * Will be notified when trees will be trimmed (scheduled item)

  * Tenant will be invited to review repairs


## Permissions

* Tenant can see ticket status, can add a new ticket, can add notes to existing ticket, can cancel ticket, can edit description

* Manager can modify state of tickets, can add a new ticket, can add notes to existing ticket, can cancel ticket

## Ticketing messages:

* New Ticket (goes to Manager)

* Ticket State Change (goes to both Tenant and Manager)

* Ticket Description Change (goes to both Tenant and Manager)

## Ticketing History

* Yes, we should do this




## Potential Asset Types

Dishwasher
  Make
  Model
  Year
  Estimated lifespan
  Hookup (e.g. cold, hot)

Garbage Disposal

Clothes Washer
  Make
  Model
  Year
  Estimated lifespan
  Hookup (e.g. cold, hot)

Clothes Dryer
  Make
  Model
  Year
  Estimated lifespan
  Hookup (e.g. natural gas, 240V, 120V)

Kitchen Faucet
Bathroom Sink Faucet
Bath Faucet

Plumbing
  Leak
  Clog
  Broken Fixture

Water Heater
  Make
  Model
  Year
  HeatSource (e.g. natural gas, 240V, 120V)

Heater
  Replace Filter (scheduled maintenance)
Roof
Landscaping
Irrigation