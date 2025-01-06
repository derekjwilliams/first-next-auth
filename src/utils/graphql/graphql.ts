/* eslint-disable */
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: any; output: any }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any }
  /** A date wihout time information */
  Date: { input: any; output: any }
  /** A date and time */
  Datetime: { input: any; output: any }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any }
  /** A time without date information */
  Time: { input: any; output: any }
  /** A universally unique identifier */
  UUID: { input: any; output: any }
}

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>
  gt?: InputMaybe<Scalars['BigFloat']['input']>
  gte?: InputMaybe<Scalars['BigFloat']['input']>
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['BigFloat']['input']>
  lte?: InputMaybe<Scalars['BigFloat']['input']>
  neq?: InputMaybe<Scalars['BigFloat']['input']>
}

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>
}

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>
  gt?: InputMaybe<Scalars['BigInt']['input']>
  gte?: InputMaybe<Scalars['BigInt']['input']>
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['BigInt']['input']>
  lte?: InputMaybe<Scalars['BigInt']['input']>
  neq?: InputMaybe<Scalars['BigInt']['input']>
}

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>
  is?: InputMaybe<FilterIs>
}

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>
}

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>
  gt?: InputMaybe<Scalars['Date']['input']>
  gte?: InputMaybe<Scalars['Date']['input']>
  in?: InputMaybe<Array<Scalars['Date']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Date']['input']>
  lte?: InputMaybe<Scalars['Date']['input']>
  neq?: InputMaybe<Scalars['Date']['input']>
}

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>
  contains?: InputMaybe<Array<Scalars['Date']['input']>>
  eq?: InputMaybe<Array<Scalars['Date']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>
}

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>
  gt?: InputMaybe<Scalars['Datetime']['input']>
  gte?: InputMaybe<Scalars['Datetime']['input']>
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Datetime']['input']>
  lte?: InputMaybe<Scalars['Datetime']['input']>
  neq?: InputMaybe<Scalars['Datetime']['input']>
}

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>
}

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL',
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  in?: InputMaybe<Array<Scalars['Float']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
  neq?: InputMaybe<Scalars['Float']['input']>
}

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>
  contains?: InputMaybe<Array<Scalars['Float']['input']>>
  eq?: InputMaybe<Array<Scalars['Float']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>
}

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>
}

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  neq?: InputMaybe<Scalars['Int']['input']>
}

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>
  contains?: InputMaybe<Array<Scalars['Int']['input']>>
  eq?: InputMaybe<Array<Scalars['Int']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>
}

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation'
  /** Deletes zero or more records from the `bathrooms` collection */
  deleteFrombathroomsCollection: BathroomsDeleteResponse
  /** Deletes zero or more records from the `bedrooms` collection */
  deleteFrombedroomsCollection: BedroomsDeleteResponse
  /** Deletes zero or more records from the `foo` collection */
  deleteFromfooCollection: FooDeleteResponse
  /** Deletes zero or more records from the `kitchens` collection */
  deleteFromkitchensCollection: KitchensDeleteResponse
  /** Deletes zero or more records from the `laundry_rooms` collection */
  deleteFromlaundry_roomsCollection: Laundry_RoomsDeleteResponse
  /** Deletes zero or more records from the `lessee` collection */
  deleteFromlesseeCollection: LesseeDeleteResponse
  /** Deletes zero or more records from the `lessee_payment_method` collection */
  deleteFromlessee_payment_methodCollection: Lessee_Payment_MethodDeleteResponse
  /** Deletes zero or more records from the `listing_images` collection */
  deleteFromlisting_imagesCollection: Listing_ImagesDeleteResponse
  /** Deletes zero or more records from the `listings` collection */
  deleteFromlistingsCollection: ListingsDeleteResponse
  /** Deletes zero or more records from the `locations` collection */
  deleteFromlocationsCollection: LocationsDeleteResponse
  /** Deletes zero or more records from the `notes` collection */
  deleteFromnotesCollection: NotesDeleteResponse
  /** Deletes zero or more records from the `payment_method` collection */
  deleteFrompayment_methodCollection: Payment_MethodDeleteResponse
  /** Deletes zero or more records from the `rental_lessee` collection */
  deleteFromrental_lesseeCollection: Rental_LesseeDeleteResponse
  /** Deletes zero or more records from the `rental_property` collection */
  deleteFromrental_propertyCollection: Rental_PropertyDeleteResponse
  /** Deletes zero or more records from the `service_request_technicians` collection */
  deleteFromservice_request_techniciansCollection: Service_Request_TechniciansDeleteResponse
  /** Deletes zero or more records from the `service_requests` collection */
  deleteFromservice_requestsCollection: Service_RequestsDeleteResponse
  /** Deletes zero or more records from the `service_types` collection */
  deleteFromservice_typesCollection: Service_TypesDeleteResponse
  /** Deletes zero or more records from the `statuses` collection */
  deleteFromstatusesCollection: StatusesDeleteResponse
  /** Deletes zero or more records from the `technicians` collection */
  deleteFromtechniciansCollection: TechniciansDeleteResponse
  /** Deletes zero or more records from the `tenants` collection */
  deleteFromtenantsCollection: TenantsDeleteResponse
  /** Deletes zero or more records from the `todo` collection */
  deleteFromtodoCollection: TodoDeleteResponse
  /** Adds one or more `bathrooms` records to the collection */
  insertIntobathroomsCollection?: Maybe<BathroomsInsertResponse>
  /** Adds one or more `bedrooms` records to the collection */
  insertIntobedroomsCollection?: Maybe<BedroomsInsertResponse>
  /** Adds one or more `foo` records to the collection */
  insertIntofooCollection?: Maybe<FooInsertResponse>
  /** Adds one or more `kitchens` records to the collection */
  insertIntokitchensCollection?: Maybe<KitchensInsertResponse>
  /** Adds one or more `laundry_rooms` records to the collection */
  insertIntolaundry_roomsCollection?: Maybe<Laundry_RoomsInsertResponse>
  /** Adds one or more `lessee` records to the collection */
  insertIntolesseeCollection?: Maybe<LesseeInsertResponse>
  /** Adds one or more `lessee_payment_method` records to the collection */
  insertIntolessee_payment_methodCollection?: Maybe<Lessee_Payment_MethodInsertResponse>
  /** Adds one or more `listing_images` records to the collection */
  insertIntolisting_imagesCollection?: Maybe<Listing_ImagesInsertResponse>
  /** Adds one or more `listings` records to the collection */
  insertIntolistingsCollection?: Maybe<ListingsInsertResponse>
  /** Adds one or more `locations` records to the collection */
  insertIntolocationsCollection?: Maybe<LocationsInsertResponse>
  /** Adds one or more `notes` records to the collection */
  insertIntonotesCollection?: Maybe<NotesInsertResponse>
  /** Adds one or more `payment_method` records to the collection */
  insertIntopayment_methodCollection?: Maybe<Payment_MethodInsertResponse>
  /** Adds one or more `rental_lessee` records to the collection */
  insertIntorental_lesseeCollection?: Maybe<Rental_LesseeInsertResponse>
  /** Adds one or more `rental_property` records to the collection */
  insertIntorental_propertyCollection?: Maybe<Rental_PropertyInsertResponse>
  /** Adds one or more `service_request_technicians` records to the collection */
  insertIntoservice_request_techniciansCollection?: Maybe<Service_Request_TechniciansInsertResponse>
  /** Adds one or more `service_requests` records to the collection */
  insertIntoservice_requestsCollection?: Maybe<Service_RequestsInsertResponse>
  /** Adds one or more `service_types` records to the collection */
  insertIntoservice_typesCollection?: Maybe<Service_TypesInsertResponse>
  /** Adds one or more `statuses` records to the collection */
  insertIntostatusesCollection?: Maybe<StatusesInsertResponse>
  /** Adds one or more `technicians` records to the collection */
  insertIntotechniciansCollection?: Maybe<TechniciansInsertResponse>
  /** Adds one or more `tenants` records to the collection */
  insertIntotenantsCollection?: Maybe<TenantsInsertResponse>
  /** Adds one or more `todo` records to the collection */
  insertIntotodoCollection?: Maybe<TodoInsertResponse>
  insert_service_request_with_technicians?: Maybe<Scalars['Opaque']['output']>
  /** Updates zero or more records in the `bathrooms` collection */
  updatebathroomsCollection: BathroomsUpdateResponse
  /** Updates zero or more records in the `bedrooms` collection */
  updatebedroomsCollection: BedroomsUpdateResponse
  /** Updates zero or more records in the `foo` collection */
  updatefooCollection: FooUpdateResponse
  /** Updates zero or more records in the `kitchens` collection */
  updatekitchensCollection: KitchensUpdateResponse
  /** Updates zero or more records in the `laundry_rooms` collection */
  updatelaundry_roomsCollection: Laundry_RoomsUpdateResponse
  /** Updates zero or more records in the `lessee` collection */
  updatelesseeCollection: LesseeUpdateResponse
  /** Updates zero or more records in the `lessee_payment_method` collection */
  updatelessee_payment_methodCollection: Lessee_Payment_MethodUpdateResponse
  /** Updates zero or more records in the `listing_images` collection */
  updatelisting_imagesCollection: Listing_ImagesUpdateResponse
  /** Updates zero or more records in the `listings` collection */
  updatelistingsCollection: ListingsUpdateResponse
  /** Updates zero or more records in the `locations` collection */
  updatelocationsCollection: LocationsUpdateResponse
  /** Updates zero or more records in the `notes` collection */
  updatenotesCollection: NotesUpdateResponse
  /** Updates zero or more records in the `payment_method` collection */
  updatepayment_methodCollection: Payment_MethodUpdateResponse
  /** Updates zero or more records in the `rental_lessee` collection */
  updaterental_lesseeCollection: Rental_LesseeUpdateResponse
  /** Updates zero or more records in the `rental_property` collection */
  updaterental_propertyCollection: Rental_PropertyUpdateResponse
  /** Updates zero or more records in the `service_request_technicians` collection */
  updateservice_request_techniciansCollection: Service_Request_TechniciansUpdateResponse
  /** Updates zero or more records in the `service_requests` collection */
  updateservice_requestsCollection: Service_RequestsUpdateResponse
  /** Updates zero or more records in the `service_types` collection */
  updateservice_typesCollection: Service_TypesUpdateResponse
  /** Updates zero or more records in the `statuses` collection */
  updatestatusesCollection: StatusesUpdateResponse
  /** Updates zero or more records in the `technicians` collection */
  updatetechniciansCollection: TechniciansUpdateResponse
  /** Updates zero or more records in the `tenants` collection */
  updatetenantsCollection: TenantsUpdateResponse
  /** Updates zero or more records in the `todo` collection */
  updatetodoCollection: TodoUpdateResponse
}

/** The root type for creating and mutating data */
export type MutationDeleteFrombathroomsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<BathroomsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFrombedroomsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<BedroomsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromfooCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<FooFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromkitchensCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<KitchensFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromlaundry_RoomsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Laundry_RoomsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromlesseeCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<LesseeFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromlessee_Payment_MethodCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Lessee_Payment_MethodFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromlisting_ImagesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Listing_ImagesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromlistingsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ListingsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromlocationsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<LocationsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromnotesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<NotesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFrompayment_MethodCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Payment_MethodFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromrental_LesseeCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Rental_LesseeFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromrental_PropertyCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Rental_PropertyFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromservice_Request_TechniciansCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Service_Request_TechniciansFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromservice_RequestsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Service_RequestsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromservice_TypesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Service_TypesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromstatusesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<StatusesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromtechniciansCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<TechniciansFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromtenantsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<TenantsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromtodoCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<TodoFilter>
}

/** The root type for creating and mutating data */
export type MutationInsertIntobathroomsCollectionArgs = {
  objects: Array<BathroomsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntobedroomsCollectionArgs = {
  objects: Array<BedroomsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntofooCollectionArgs = {
  objects: Array<FooInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntokitchensCollectionArgs = {
  objects: Array<KitchensInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntolaundry_RoomsCollectionArgs = {
  objects: Array<Laundry_RoomsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntolesseeCollectionArgs = {
  objects: Array<LesseeInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntolessee_Payment_MethodCollectionArgs = {
  objects: Array<Lessee_Payment_MethodInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntolisting_ImagesCollectionArgs = {
  objects: Array<Listing_ImagesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntolistingsCollectionArgs = {
  objects: Array<ListingsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntolocationsCollectionArgs = {
  objects: Array<LocationsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntonotesCollectionArgs = {
  objects: Array<NotesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntopayment_MethodCollectionArgs = {
  objects: Array<Payment_MethodInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntorental_LesseeCollectionArgs = {
  objects: Array<Rental_LesseeInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntorental_PropertyCollectionArgs = {
  objects: Array<Rental_PropertyInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoservice_Request_TechniciansCollectionArgs = {
  objects: Array<Service_Request_TechniciansInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoservice_RequestsCollectionArgs = {
  objects: Array<Service_RequestsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoservice_TypesCollectionArgs = {
  objects: Array<Service_TypesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntostatusesCollectionArgs = {
  objects: Array<StatusesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntotechniciansCollectionArgs = {
  objects: Array<TechniciansInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntotenantsCollectionArgs = {
  objects: Array<TenantsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntotodoCollectionArgs = {
  objects: Array<TodoInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsert_Service_Request_With_TechniciansArgs = {
  completed: Scalars['Boolean']['input']
  details: Scalars['String']['input']
  location_id: Scalars['UUID']['input']
  requested_by: Scalars['UUID']['input']
  service_description: Scalars['String']['input']
  service_type_id: Scalars['UUID']['input']
  status_id: Scalars['UUID']['input']
  technician_ids: Array<InputMaybe<Scalars['String']['input']>>
}

/** The root type for creating and mutating data */
export type MutationUpdatebathroomsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<BathroomsFilter>
  set: BathroomsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatebedroomsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<BedroomsFilter>
  set: BedroomsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatefooCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<FooFilter>
  set: FooUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatekitchensCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<KitchensFilter>
  set: KitchensUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatelaundry_RoomsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Laundry_RoomsFilter>
  set: Laundry_RoomsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatelesseeCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<LesseeFilter>
  set: LesseeUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatelessee_Payment_MethodCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Lessee_Payment_MethodFilter>
  set: Lessee_Payment_MethodUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatelisting_ImagesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Listing_ImagesFilter>
  set: Listing_ImagesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatelistingsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<ListingsFilter>
  set: ListingsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatelocationsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<LocationsFilter>
  set: LocationsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatenotesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<NotesFilter>
  set: NotesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatepayment_MethodCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Payment_MethodFilter>
  set: Payment_MethodUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdaterental_LesseeCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Rental_LesseeFilter>
  set: Rental_LesseeUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdaterental_PropertyCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Rental_PropertyFilter>
  set: Rental_PropertyUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateservice_Request_TechniciansCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Service_Request_TechniciansFilter>
  set: Service_Request_TechniciansUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateservice_RequestsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Service_RequestsFilter>
  set: Service_RequestsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateservice_TypesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<Service_TypesFilter>
  set: Service_TypesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatestatusesCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<StatusesFilter>
  set: StatusesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatetechniciansCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<TechniciansFilter>
  set: TechniciansUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatetenantsCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<TenantsFilter>
  set: TenantsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdatetodoCollectionArgs = {
  atMost?: Scalars['Int']['input']
  filter?: InputMaybe<TodoFilter>
  set: TodoUpdateInput
}

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output']
}

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>
  is?: InputMaybe<FilterIs>
}

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast',
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']['output']>
  hasNextPage: Scalars['Boolean']['output']
  hasPreviousPage: Scalars['Boolean']['output']
  startCursor?: Maybe<Scalars['String']['output']>
}

/** The root type for querying data */
export type Query = {
  __typename?: 'Query'
  /** A pagable collection of type `bathrooms` */
  bathroomsCollection?: Maybe<BathroomsConnection>
  /** A pagable collection of type `bedrooms` */
  bedroomsCollection?: Maybe<BedroomsConnection>
  /** A pagable collection of type `foo` */
  fooCollection?: Maybe<FooConnection>
  /** A pagable collection of type `kitchens` */
  kitchensCollection?: Maybe<KitchensConnection>
  /** A pagable collection of type `laundry_rooms` */
  laundry_roomsCollection?: Maybe<Laundry_RoomsConnection>
  /** A pagable collection of type `lessee` */
  lesseeCollection?: Maybe<LesseeConnection>
  /** A pagable collection of type `lessee_payment_method` */
  lessee_payment_methodCollection?: Maybe<Lessee_Payment_MethodConnection>
  /** A pagable collection of type `listing_images` */
  listing_imagesCollection?: Maybe<Listing_ImagesConnection>
  /** A pagable collection of type `listings` */
  listingsCollection?: Maybe<ListingsConnection>
  /** A pagable collection of type `locations` */
  locationsCollection?: Maybe<LocationsConnection>
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>
  /** A pagable collection of type `notes` */
  notesCollection?: Maybe<NotesConnection>
  /** A pagable collection of type `payment_method` */
  payment_methodCollection?: Maybe<Payment_MethodConnection>
  /** A pagable collection of type `rental_lessee` */
  rental_lesseeCollection?: Maybe<Rental_LesseeConnection>
  /** A pagable collection of type `rental_property` */
  rental_propertyCollection?: Maybe<Rental_PropertyConnection>
  /** A pagable collection of type `service_request_technicians` */
  service_request_techniciansCollection?: Maybe<Service_Request_TechniciansConnection>
  /** A pagable collection of type `service_requests` */
  service_requestsCollection?: Maybe<Service_RequestsConnection>
  /** A pagable collection of type `service_types` */
  service_typesCollection?: Maybe<Service_TypesConnection>
  /** A pagable collection of type `statuses` */
  statusesCollection?: Maybe<StatusesConnection>
  /** A pagable collection of type `technicians` */
  techniciansCollection?: Maybe<TechniciansConnection>
  /** A pagable collection of type `tenants` */
  tenantsCollection?: Maybe<TenantsConnection>
  /** A pagable collection of type `todo` */
  todoCollection?: Maybe<TodoConnection>
}

/** The root type for querying data */
export type QueryBathroomsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<BathroomsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<BathroomsOrderBy>>
}

/** The root type for querying data */
export type QueryBedroomsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<BedroomsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<BedroomsOrderBy>>
}

/** The root type for querying data */
export type QueryFooCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<FooFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<FooOrderBy>>
}

/** The root type for querying data */
export type QueryKitchensCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<KitchensFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<KitchensOrderBy>>
}

/** The root type for querying data */
export type QueryLaundry_RoomsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Laundry_RoomsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Laundry_RoomsOrderBy>>
}

/** The root type for querying data */
export type QueryLesseeCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<LesseeFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<LesseeOrderBy>>
}

/** The root type for querying data */
export type QueryLessee_Payment_MethodCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Lessee_Payment_MethodFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Lessee_Payment_MethodOrderBy>>
}

/** The root type for querying data */
export type QueryListing_ImagesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Listing_ImagesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Listing_ImagesOrderBy>>
}

/** The root type for querying data */
export type QueryListingsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<ListingsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<ListingsOrderBy>>
}

/** The root type for querying data */
export type QueryLocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<LocationsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<LocationsOrderBy>>
}

/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root type for querying data */
export type QueryNotesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<NotesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<NotesOrderBy>>
}

/** The root type for querying data */
export type QueryPayment_MethodCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Payment_MethodFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Payment_MethodOrderBy>>
}

/** The root type for querying data */
export type QueryRental_LesseeCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Rental_LesseeFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Rental_LesseeOrderBy>>
}

/** The root type for querying data */
export type QueryRental_PropertyCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Rental_PropertyFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Rental_PropertyOrderBy>>
}

/** The root type for querying data */
export type QueryService_Request_TechniciansCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_Request_TechniciansFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_Request_TechniciansOrderBy>>
}

/** The root type for querying data */
export type QueryService_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_RequestsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_RequestsOrderBy>>
}

/** The root type for querying data */
export type QueryService_TypesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_TypesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_TypesOrderBy>>
}

/** The root type for querying data */
export type QueryStatusesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<StatusesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<StatusesOrderBy>>
}

/** The root type for querying data */
export type QueryTechniciansCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<TechniciansFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<TechniciansOrderBy>>
}

/** The root type for querying data */
export type QueryTenantsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<TenantsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<TenantsOrderBy>>
}

/** The root type for querying data */
export type QueryTodoCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<TodoFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<TodoOrderBy>>
}

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  ilike?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  iregex?: InputMaybe<Scalars['String']['input']>
  is?: InputMaybe<FilterIs>
  like?: InputMaybe<Scalars['String']['input']>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  neq?: InputMaybe<Scalars['String']['input']>
  regex?: InputMaybe<Scalars['String']['input']>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>
  contains?: InputMaybe<Array<Scalars['String']['input']>>
  eq?: InputMaybe<Array<Scalars['String']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>
}

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>
  gt?: InputMaybe<Scalars['Time']['input']>
  gte?: InputMaybe<Scalars['Time']['input']>
  in?: InputMaybe<Array<Scalars['Time']['input']>>
  is?: InputMaybe<FilterIs>
  lt?: InputMaybe<Scalars['Time']['input']>
  lte?: InputMaybe<Scalars['Time']['input']>
  neq?: InputMaybe<Scalars['Time']['input']>
}

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>
  contains?: InputMaybe<Array<Scalars['Time']['input']>>
  eq?: InputMaybe<Array<Scalars['Time']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>
}

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>
  in?: InputMaybe<Array<Scalars['UUID']['input']>>
  is?: InputMaybe<FilterIs>
  neq?: InputMaybe<Scalars['UUID']['input']>
}

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>
  is?: InputMaybe<FilterIs>
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>
}

export type Bathrooms = Node & {
  __typename?: 'bathrooms'
  area?: Maybe<Scalars['Float']['output']>
  created_at: Scalars['Datetime']['output']
  height?: Maybe<Scalars['Float']['output']>
  id: Scalars['UUID']['output']
  length?: Maybe<Scalars['Float']['output']>
  location_id?: Maybe<Scalars['UUID']['output']>
  locations?: Maybe<Locations>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  width?: Maybe<Scalars['Float']['output']>
}

export type BathroomsConnection = {
  __typename?: 'bathroomsConnection'
  edges: Array<BathroomsEdge>
  pageInfo: PageInfo
}

export type BathroomsDeleteResponse = {
  __typename?: 'bathroomsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Bathrooms>
}

export type BathroomsEdge = {
  __typename?: 'bathroomsEdge'
  cursor: Scalars['String']['output']
  node: Bathrooms
}

export type BathroomsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<BathroomsFilter>>
  area?: InputMaybe<FloatFilter>
  created_at?: InputMaybe<DatetimeFilter>
  height?: InputMaybe<FloatFilter>
  id?: InputMaybe<UuidFilter>
  length?: InputMaybe<FloatFilter>
  location_id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<BathroomsFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<BathroomsFilter>>
  width?: InputMaybe<FloatFilter>
}

export type BathroomsInsertInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type BathroomsInsertResponse = {
  __typename?: 'bathroomsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Bathrooms>
}

export type BathroomsOrderBy = {
  area?: InputMaybe<OrderByDirection>
  created_at?: InputMaybe<OrderByDirection>
  height?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  length?: InputMaybe<OrderByDirection>
  location_id?: InputMaybe<OrderByDirection>
  width?: InputMaybe<OrderByDirection>
}

export type BathroomsUpdateInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type BathroomsUpdateResponse = {
  __typename?: 'bathroomsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Bathrooms>
}

export type Bedrooms = Node & {
  __typename?: 'bedrooms'
  area?: Maybe<Scalars['Float']['output']>
  created_at: Scalars['Datetime']['output']
  height?: Maybe<Scalars['Float']['output']>
  id: Scalars['UUID']['output']
  length?: Maybe<Scalars['Float']['output']>
  location_id?: Maybe<Scalars['UUID']['output']>
  locations?: Maybe<Locations>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  width?: Maybe<Scalars['Float']['output']>
}

export type BedroomsConnection = {
  __typename?: 'bedroomsConnection'
  edges: Array<BedroomsEdge>
  pageInfo: PageInfo
}

export type BedroomsDeleteResponse = {
  __typename?: 'bedroomsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Bedrooms>
}

export type BedroomsEdge = {
  __typename?: 'bedroomsEdge'
  cursor: Scalars['String']['output']
  node: Bedrooms
}

export type BedroomsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<BedroomsFilter>>
  area?: InputMaybe<FloatFilter>
  created_at?: InputMaybe<DatetimeFilter>
  height?: InputMaybe<FloatFilter>
  id?: InputMaybe<UuidFilter>
  length?: InputMaybe<FloatFilter>
  location_id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<BedroomsFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<BedroomsFilter>>
  width?: InputMaybe<FloatFilter>
}

export type BedroomsInsertInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type BedroomsInsertResponse = {
  __typename?: 'bedroomsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Bedrooms>
}

export type BedroomsOrderBy = {
  area?: InputMaybe<OrderByDirection>
  created_at?: InputMaybe<OrderByDirection>
  height?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  length?: InputMaybe<OrderByDirection>
  location_id?: InputMaybe<OrderByDirection>
  width?: InputMaybe<OrderByDirection>
}

export type BedroomsUpdateInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type BedroomsUpdateResponse = {
  __typename?: 'bedroomsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Bedrooms>
}

export type Foo = Node & {
  __typename?: 'foo'
  created_at: Scalars['Datetime']['output']
  id: Scalars['BigInt']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  sites?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type FooConnection = {
  __typename?: 'fooConnection'
  edges: Array<FooEdge>
  pageInfo: PageInfo
}

export type FooDeleteResponse = {
  __typename?: 'fooDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Foo>
}

export type FooEdge = {
  __typename?: 'fooEdge'
  cursor: Scalars['String']['output']
  node: Foo
}

export type FooFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<FooFilter>>
  created_at?: InputMaybe<DatetimeFilter>
  id?: InputMaybe<BigIntFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<FooFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<FooFilter>>
  sites?: InputMaybe<StringListFilter>
}

export type FooInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  sites?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FooInsertResponse = {
  __typename?: 'fooInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Foo>
}

export type FooOrderBy = {
  created_at?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
}

export type FooUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  sites?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FooUpdateResponse = {
  __typename?: 'fooUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Foo>
}

export type Kitchens = Node & {
  __typename?: 'kitchens'
  area?: Maybe<Scalars['Float']['output']>
  created_at: Scalars['Datetime']['output']
  height?: Maybe<Scalars['Float']['output']>
  id: Scalars['UUID']['output']
  length?: Maybe<Scalars['Float']['output']>
  location_id?: Maybe<Scalars['UUID']['output']>
  locations?: Maybe<Locations>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  width?: Maybe<Scalars['Float']['output']>
}

export type KitchensConnection = {
  __typename?: 'kitchensConnection'
  edges: Array<KitchensEdge>
  pageInfo: PageInfo
}

export type KitchensDeleteResponse = {
  __typename?: 'kitchensDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Kitchens>
}

export type KitchensEdge = {
  __typename?: 'kitchensEdge'
  cursor: Scalars['String']['output']
  node: Kitchens
}

export type KitchensFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<KitchensFilter>>
  area?: InputMaybe<FloatFilter>
  created_at?: InputMaybe<DatetimeFilter>
  height?: InputMaybe<FloatFilter>
  id?: InputMaybe<UuidFilter>
  length?: InputMaybe<FloatFilter>
  location_id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<KitchensFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<KitchensFilter>>
  width?: InputMaybe<FloatFilter>
}

export type KitchensInsertInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type KitchensInsertResponse = {
  __typename?: 'kitchensInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Kitchens>
}

export type KitchensOrderBy = {
  area?: InputMaybe<OrderByDirection>
  created_at?: InputMaybe<OrderByDirection>
  height?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  length?: InputMaybe<OrderByDirection>
  location_id?: InputMaybe<OrderByDirection>
  width?: InputMaybe<OrderByDirection>
}

export type KitchensUpdateInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type KitchensUpdateResponse = {
  __typename?: 'kitchensUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Kitchens>
}

export type Laundry_Rooms = Node & {
  __typename?: 'laundry_rooms'
  area?: Maybe<Scalars['Float']['output']>
  created_at: Scalars['Datetime']['output']
  height?: Maybe<Scalars['Float']['output']>
  id: Scalars['BigInt']['output']
  length?: Maybe<Scalars['Float']['output']>
  location_id?: Maybe<Scalars['UUID']['output']>
  locations?: Maybe<Locations>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  width?: Maybe<Scalars['Float']['output']>
}

export type Laundry_RoomsConnection = {
  __typename?: 'laundry_roomsConnection'
  edges: Array<Laundry_RoomsEdge>
  pageInfo: PageInfo
}

export type Laundry_RoomsDeleteResponse = {
  __typename?: 'laundry_roomsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Laundry_Rooms>
}

export type Laundry_RoomsEdge = {
  __typename?: 'laundry_roomsEdge'
  cursor: Scalars['String']['output']
  node: Laundry_Rooms
}

export type Laundry_RoomsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Laundry_RoomsFilter>>
  area?: InputMaybe<FloatFilter>
  created_at?: InputMaybe<DatetimeFilter>
  height?: InputMaybe<FloatFilter>
  id?: InputMaybe<BigIntFilter>
  length?: InputMaybe<FloatFilter>
  location_id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Laundry_RoomsFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Laundry_RoomsFilter>>
  width?: InputMaybe<FloatFilter>
}

export type Laundry_RoomsInsertInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type Laundry_RoomsInsertResponse = {
  __typename?: 'laundry_roomsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Laundry_Rooms>
}

export type Laundry_RoomsOrderBy = {
  area?: InputMaybe<OrderByDirection>
  created_at?: InputMaybe<OrderByDirection>
  height?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  length?: InputMaybe<OrderByDirection>
  location_id?: InputMaybe<OrderByDirection>
  width?: InputMaybe<OrderByDirection>
}

export type Laundry_RoomsUpdateInput = {
  area?: InputMaybe<Scalars['Float']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  height?: InputMaybe<Scalars['Float']['input']>
  length?: InputMaybe<Scalars['Float']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  width?: InputMaybe<Scalars['Float']['input']>
}

export type Laundry_RoomsUpdateResponse = {
  __typename?: 'laundry_roomsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Laundry_Rooms>
}

export type Lessee = Node & {
  __typename?: 'lessee'
  date_of_birth?: Maybe<Scalars['Date']['output']>
  email_address?: Maybe<Scalars['String']['output']>
  emergency_contact?: Maybe<Scalars['String']['output']>
  emergency_contact_phone_number?: Maybe<Scalars['String']['output']>
  first_name: Scalars['String']['output']
  last_name: Scalars['String']['output']
  lease_end_date?: Maybe<Scalars['Date']['output']>
  lease_start_date?: Maybe<Scalars['Date']['output']>
  lease_status?: Maybe<Scalars['String']['output']>
  lessee_id: Scalars['Int']['output']
  lessee_payment_methodCollection?: Maybe<Lessee_Payment_MethodConnection>
  monthly_rent_amount?: Maybe<Scalars['BigFloat']['output']>
  move_in_date?: Maybe<Scalars['Date']['output']>
  move_out_date?: Maybe<Scalars['Date']['output']>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  notes?: Maybe<Scalars['String']['output']>
  occupation?: Maybe<Scalars['String']['output']>
  payment_due_day?: Maybe<Scalars['Int']['output']>
  phone_number?: Maybe<Scalars['String']['output']>
  rental_lesseeCollection?: Maybe<Rental_LesseeConnection>
  secondary_phone_number?: Maybe<Scalars['String']['output']>
  security_deposit?: Maybe<Scalars['BigFloat']['output']>
}

export type LesseeLessee_Payment_MethodCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Lessee_Payment_MethodFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Lessee_Payment_MethodOrderBy>>
}

export type LesseeRental_LesseeCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Rental_LesseeFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Rental_LesseeOrderBy>>
}

export type LesseeConnection = {
  __typename?: 'lesseeConnection'
  edges: Array<LesseeEdge>
  pageInfo: PageInfo
}

export type LesseeDeleteResponse = {
  __typename?: 'lesseeDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Lessee>
}

export type LesseeEdge = {
  __typename?: 'lesseeEdge'
  cursor: Scalars['String']['output']
  node: Lessee
}

export type LesseeFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<LesseeFilter>>
  date_of_birth?: InputMaybe<DateFilter>
  email_address?: InputMaybe<StringFilter>
  emergency_contact?: InputMaybe<StringFilter>
  emergency_contact_phone_number?: InputMaybe<StringFilter>
  first_name?: InputMaybe<StringFilter>
  last_name?: InputMaybe<StringFilter>
  lease_end_date?: InputMaybe<DateFilter>
  lease_start_date?: InputMaybe<DateFilter>
  lease_status?: InputMaybe<StringFilter>
  lessee_id?: InputMaybe<IntFilter>
  monthly_rent_amount?: InputMaybe<BigFloatFilter>
  move_in_date?: InputMaybe<DateFilter>
  move_out_date?: InputMaybe<DateFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<LesseeFilter>
  notes?: InputMaybe<StringFilter>
  occupation?: InputMaybe<StringFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<LesseeFilter>>
  payment_due_day?: InputMaybe<IntFilter>
  phone_number?: InputMaybe<StringFilter>
  secondary_phone_number?: InputMaybe<StringFilter>
  security_deposit?: InputMaybe<BigFloatFilter>
}

export type LesseeInsertInput = {
  date_of_birth?: InputMaybe<Scalars['Date']['input']>
  email_address?: InputMaybe<Scalars['String']['input']>
  emergency_contact?: InputMaybe<Scalars['String']['input']>
  emergency_contact_phone_number?: InputMaybe<Scalars['String']['input']>
  first_name?: InputMaybe<Scalars['String']['input']>
  last_name?: InputMaybe<Scalars['String']['input']>
  lease_end_date?: InputMaybe<Scalars['Date']['input']>
  lease_start_date?: InputMaybe<Scalars['Date']['input']>
  lease_status?: InputMaybe<Scalars['String']['input']>
  monthly_rent_amount?: InputMaybe<Scalars['BigFloat']['input']>
  move_in_date?: InputMaybe<Scalars['Date']['input']>
  move_out_date?: InputMaybe<Scalars['Date']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  occupation?: InputMaybe<Scalars['String']['input']>
  payment_due_day?: InputMaybe<Scalars['Int']['input']>
  phone_number?: InputMaybe<Scalars['String']['input']>
  secondary_phone_number?: InputMaybe<Scalars['String']['input']>
  security_deposit?: InputMaybe<Scalars['BigFloat']['input']>
}

export type LesseeInsertResponse = {
  __typename?: 'lesseeInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Lessee>
}

export type LesseeOrderBy = {
  date_of_birth?: InputMaybe<OrderByDirection>
  email_address?: InputMaybe<OrderByDirection>
  emergency_contact?: InputMaybe<OrderByDirection>
  emergency_contact_phone_number?: InputMaybe<OrderByDirection>
  first_name?: InputMaybe<OrderByDirection>
  last_name?: InputMaybe<OrderByDirection>
  lease_end_date?: InputMaybe<OrderByDirection>
  lease_start_date?: InputMaybe<OrderByDirection>
  lease_status?: InputMaybe<OrderByDirection>
  lessee_id?: InputMaybe<OrderByDirection>
  monthly_rent_amount?: InputMaybe<OrderByDirection>
  move_in_date?: InputMaybe<OrderByDirection>
  move_out_date?: InputMaybe<OrderByDirection>
  notes?: InputMaybe<OrderByDirection>
  occupation?: InputMaybe<OrderByDirection>
  payment_due_day?: InputMaybe<OrderByDirection>
  phone_number?: InputMaybe<OrderByDirection>
  secondary_phone_number?: InputMaybe<OrderByDirection>
  security_deposit?: InputMaybe<OrderByDirection>
}

export type LesseeUpdateInput = {
  date_of_birth?: InputMaybe<Scalars['Date']['input']>
  email_address?: InputMaybe<Scalars['String']['input']>
  emergency_contact?: InputMaybe<Scalars['String']['input']>
  emergency_contact_phone_number?: InputMaybe<Scalars['String']['input']>
  first_name?: InputMaybe<Scalars['String']['input']>
  last_name?: InputMaybe<Scalars['String']['input']>
  lease_end_date?: InputMaybe<Scalars['Date']['input']>
  lease_start_date?: InputMaybe<Scalars['Date']['input']>
  lease_status?: InputMaybe<Scalars['String']['input']>
  monthly_rent_amount?: InputMaybe<Scalars['BigFloat']['input']>
  move_in_date?: InputMaybe<Scalars['Date']['input']>
  move_out_date?: InputMaybe<Scalars['Date']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  occupation?: InputMaybe<Scalars['String']['input']>
  payment_due_day?: InputMaybe<Scalars['Int']['input']>
  phone_number?: InputMaybe<Scalars['String']['input']>
  secondary_phone_number?: InputMaybe<Scalars['String']['input']>
  security_deposit?: InputMaybe<Scalars['BigFloat']['input']>
}

export type LesseeUpdateResponse = {
  __typename?: 'lesseeUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Lessee>
}

export type Lessee_Payment_Method = Node & {
  __typename?: 'lessee_payment_method'
  lessee?: Maybe<Lessee>
  lessee_id: Scalars['Int']['output']
  method_id: Scalars['Int']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  payment_method?: Maybe<Payment_Method>
}

export type Lessee_Payment_MethodConnection = {
  __typename?: 'lessee_payment_methodConnection'
  edges: Array<Lessee_Payment_MethodEdge>
  pageInfo: PageInfo
}

export type Lessee_Payment_MethodDeleteResponse = {
  __typename?: 'lessee_payment_methodDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Lessee_Payment_Method>
}

export type Lessee_Payment_MethodEdge = {
  __typename?: 'lessee_payment_methodEdge'
  cursor: Scalars['String']['output']
  node: Lessee_Payment_Method
}

export type Lessee_Payment_MethodFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Lessee_Payment_MethodFilter>>
  lessee_id?: InputMaybe<IntFilter>
  method_id?: InputMaybe<IntFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Lessee_Payment_MethodFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Lessee_Payment_MethodFilter>>
}

export type Lessee_Payment_MethodInsertInput = {
  lessee_id?: InputMaybe<Scalars['Int']['input']>
  method_id?: InputMaybe<Scalars['Int']['input']>
}

export type Lessee_Payment_MethodInsertResponse = {
  __typename?: 'lessee_payment_methodInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Lessee_Payment_Method>
}

export type Lessee_Payment_MethodOrderBy = {
  lessee_id?: InputMaybe<OrderByDirection>
  method_id?: InputMaybe<OrderByDirection>
}

export type Lessee_Payment_MethodUpdateInput = {
  lessee_id?: InputMaybe<Scalars['Int']['input']>
  method_id?: InputMaybe<Scalars['Int']['input']>
}

export type Lessee_Payment_MethodUpdateResponse = {
  __typename?: 'lessee_payment_methodUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Lessee_Payment_Method>
}

export type Listing_Images = Node & {
  __typename?: 'listing_images'
  created_at: Scalars['Datetime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  listing_id?: Maybe<Scalars['UUID']['output']>
  listings?: Maybe<Listings>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  url?: Maybe<Scalars['String']['output']>
}

export type Listing_ImagesConnection = {
  __typename?: 'listing_imagesConnection'
  edges: Array<Listing_ImagesEdge>
  pageInfo: PageInfo
}

export type Listing_ImagesDeleteResponse = {
  __typename?: 'listing_imagesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Listing_Images>
}

export type Listing_ImagesEdge = {
  __typename?: 'listing_imagesEdge'
  cursor: Scalars['String']['output']
  node: Listing_Images
}

export type Listing_ImagesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Listing_ImagesFilter>>
  created_at?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  listing_id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Listing_ImagesFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Listing_ImagesFilter>>
  url?: InputMaybe<StringFilter>
}

export type Listing_ImagesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  listing_id?: InputMaybe<Scalars['UUID']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type Listing_ImagesInsertResponse = {
  __typename?: 'listing_imagesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Listing_Images>
}

export type Listing_ImagesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>
  description?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  listing_id?: InputMaybe<OrderByDirection>
  url?: InputMaybe<OrderByDirection>
}

export type Listing_ImagesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  listing_id?: InputMaybe<Scalars['UUID']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type Listing_ImagesUpdateResponse = {
  __typename?: 'listing_imagesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Listing_Images>
}

export type Listings = Node & {
  __typename?: 'listings'
  address_1?: Maybe<Scalars['String']['output']>
  address_2?: Maybe<Scalars['String']['output']>
  city?: Maybe<Scalars['String']['output']>
  cover_image_url: Scalars['String']['output']
  created_at: Scalars['Datetime']['output']
  description?: Maybe<Scalars['String']['output']>
  features?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  id: Scalars['UUID']['output']
  lease_terms?: Maybe<Scalars['String']['output']>
  listing_imagesCollection?: Maybe<Listing_ImagesConnection>
  location_id?: Maybe<Scalars['UUID']['output']>
  locations?: Maybe<Locations>
  monthly_rent?: Maybe<Scalars['BigFloat']['output']>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  postal_code?: Maybe<Scalars['String']['output']>
  required_legal_statement?: Maybe<Scalars['String']['output']>
  rooms?: Maybe<Scalars['String']['output']>
  state_province?: Maybe<Scalars['String']['output']>
}

export type ListingsListing_ImagesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Listing_ImagesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Listing_ImagesOrderBy>>
}

export type ListingsConnection = {
  __typename?: 'listingsConnection'
  edges: Array<ListingsEdge>
  pageInfo: PageInfo
}

export type ListingsDeleteResponse = {
  __typename?: 'listingsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Listings>
}

export type ListingsEdge = {
  __typename?: 'listingsEdge'
  cursor: Scalars['String']['output']
  node: Listings
}

export type ListingsFilter = {
  address_1?: InputMaybe<StringFilter>
  address_2?: InputMaybe<StringFilter>
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ListingsFilter>>
  city?: InputMaybe<StringFilter>
  cover_image_url?: InputMaybe<StringFilter>
  created_at?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<StringFilter>
  features?: InputMaybe<StringListFilter>
  id?: InputMaybe<UuidFilter>
  lease_terms?: InputMaybe<StringFilter>
  location_id?: InputMaybe<UuidFilter>
  monthly_rent?: InputMaybe<BigFloatFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<ListingsFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ListingsFilter>>
  postal_code?: InputMaybe<StringFilter>
  required_legal_statement?: InputMaybe<StringFilter>
  rooms?: InputMaybe<StringFilter>
  state_province?: InputMaybe<StringFilter>
}

export type ListingsInsertInput = {
  address_1?: InputMaybe<Scalars['String']['input']>
  address_2?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  cover_image_url?: InputMaybe<Scalars['String']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  features?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id?: InputMaybe<Scalars['UUID']['input']>
  lease_terms?: InputMaybe<Scalars['String']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  monthly_rent?: InputMaybe<Scalars['BigFloat']['input']>
  postal_code?: InputMaybe<Scalars['String']['input']>
  required_legal_statement?: InputMaybe<Scalars['String']['input']>
  rooms?: InputMaybe<Scalars['String']['input']>
  state_province?: InputMaybe<Scalars['String']['input']>
}

export type ListingsInsertResponse = {
  __typename?: 'listingsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Listings>
}

export type ListingsOrderBy = {
  address_1?: InputMaybe<OrderByDirection>
  address_2?: InputMaybe<OrderByDirection>
  city?: InputMaybe<OrderByDirection>
  cover_image_url?: InputMaybe<OrderByDirection>
  created_at?: InputMaybe<OrderByDirection>
  description?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  lease_terms?: InputMaybe<OrderByDirection>
  location_id?: InputMaybe<OrderByDirection>
  monthly_rent?: InputMaybe<OrderByDirection>
  postal_code?: InputMaybe<OrderByDirection>
  required_legal_statement?: InputMaybe<OrderByDirection>
  rooms?: InputMaybe<OrderByDirection>
  state_province?: InputMaybe<OrderByDirection>
}

export type ListingsUpdateInput = {
  address_1?: InputMaybe<Scalars['String']['input']>
  address_2?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  cover_image_url?: InputMaybe<Scalars['String']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  features?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id?: InputMaybe<Scalars['UUID']['input']>
  lease_terms?: InputMaybe<Scalars['String']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  monthly_rent?: InputMaybe<Scalars['BigFloat']['input']>
  postal_code?: InputMaybe<Scalars['String']['input']>
  required_legal_statement?: InputMaybe<Scalars['String']['input']>
  rooms?: InputMaybe<Scalars['String']['input']>
  state_province?: InputMaybe<Scalars['String']['input']>
}

export type ListingsUpdateResponse = {
  __typename?: 'listingsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Listings>
}

export type Locations = Node & {
  __typename?: 'locations'
  bathroomsCollection?: Maybe<BathroomsConnection>
  bedroomsCollection?: Maybe<BedroomsConnection>
  city: Scalars['String']['output']
  id: Scalars['UUID']['output']
  kitchensCollection?: Maybe<KitchensConnection>
  laundry_roomsCollection?: Maybe<Laundry_RoomsConnection>
  listings?: Maybe<Listings>
  location_name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  notes?: Maybe<Scalars['String']['output']>
  postal_code: Scalars['String']['output']
  service_requestsCollection?: Maybe<Service_RequestsConnection>
  state_province: Scalars['String']['output']
  street_address: Scalars['String']['output']
  unit_number?: Maybe<Scalars['String']['output']>
}

export type LocationsBathroomsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<BathroomsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<BathroomsOrderBy>>
}

export type LocationsBedroomsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<BedroomsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<BedroomsOrderBy>>
}

export type LocationsKitchensCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<KitchensFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<KitchensOrderBy>>
}

export type LocationsLaundry_RoomsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Laundry_RoomsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Laundry_RoomsOrderBy>>
}

export type LocationsService_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_RequestsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_RequestsOrderBy>>
}

export type LocationsConnection = {
  __typename?: 'locationsConnection'
  edges: Array<LocationsEdge>
  pageInfo: PageInfo
}

export type LocationsDeleteResponse = {
  __typename?: 'locationsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Locations>
}

export type LocationsEdge = {
  __typename?: 'locationsEdge'
  cursor: Scalars['String']['output']
  node: Locations
}

export type LocationsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<LocationsFilter>>
  city?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  location_name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<LocationsFilter>
  notes?: InputMaybe<StringFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<LocationsFilter>>
  postal_code?: InputMaybe<StringFilter>
  state_province?: InputMaybe<StringFilter>
  street_address?: InputMaybe<StringFilter>
  unit_number?: InputMaybe<StringFilter>
}

export type LocationsInsertInput = {
  city?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  location_name?: InputMaybe<Scalars['String']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  postal_code?: InputMaybe<Scalars['String']['input']>
  state_province?: InputMaybe<Scalars['String']['input']>
  street_address?: InputMaybe<Scalars['String']['input']>
  unit_number?: InputMaybe<Scalars['String']['input']>
}

export type LocationsInsertResponse = {
  __typename?: 'locationsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Locations>
}

export type LocationsOrderBy = {
  city?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  location_name?: InputMaybe<OrderByDirection>
  notes?: InputMaybe<OrderByDirection>
  postal_code?: InputMaybe<OrderByDirection>
  state_province?: InputMaybe<OrderByDirection>
  street_address?: InputMaybe<OrderByDirection>
  unit_number?: InputMaybe<OrderByDirection>
}

export type LocationsUpdateInput = {
  city?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  location_name?: InputMaybe<Scalars['String']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  postal_code?: InputMaybe<Scalars['String']['input']>
  state_province?: InputMaybe<Scalars['String']['input']>
  street_address?: InputMaybe<Scalars['String']['input']>
  unit_number?: InputMaybe<Scalars['String']['input']>
}

export type LocationsUpdateResponse = {
  __typename?: 'locationsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Locations>
}

export type Notes = Node & {
  __typename?: 'notes'
  id: Scalars['BigInt']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type NotesConnection = {
  __typename?: 'notesConnection'
  edges: Array<NotesEdge>
  pageInfo: PageInfo
}

export type NotesDeleteResponse = {
  __typename?: 'notesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Notes>
}

export type NotesEdge = {
  __typename?: 'notesEdge'
  cursor: Scalars['String']['output']
  node: Notes
}

export type NotesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<NotesFilter>>
  id?: InputMaybe<BigIntFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<NotesFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<NotesFilter>>
  title?: InputMaybe<StringFilter>
}

export type NotesInsertInput = {
  title?: InputMaybe<Scalars['String']['input']>
}

export type NotesInsertResponse = {
  __typename?: 'notesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Notes>
}

export type NotesOrderBy = {
  id?: InputMaybe<OrderByDirection>
  title?: InputMaybe<OrderByDirection>
}

export type NotesUpdateInput = {
  title?: InputMaybe<Scalars['String']['input']>
}

export type NotesUpdateResponse = {
  __typename?: 'notesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Notes>
}

export type Payment_Method = Node & {
  __typename?: 'payment_method'
  lessee_payment_methodCollection?: Maybe<Lessee_Payment_MethodConnection>
  method_id: Scalars['Int']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  payment_method_stripe: Scalars['String']['output']
}

export type Payment_MethodLessee_Payment_MethodCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Lessee_Payment_MethodFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Lessee_Payment_MethodOrderBy>>
}

export type Payment_MethodConnection = {
  __typename?: 'payment_methodConnection'
  edges: Array<Payment_MethodEdge>
  pageInfo: PageInfo
}

export type Payment_MethodDeleteResponse = {
  __typename?: 'payment_methodDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Payment_Method>
}

export type Payment_MethodEdge = {
  __typename?: 'payment_methodEdge'
  cursor: Scalars['String']['output']
  node: Payment_Method
}

export type Payment_MethodFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Payment_MethodFilter>>
  method_id?: InputMaybe<IntFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Payment_MethodFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Payment_MethodFilter>>
  payment_method_stripe?: InputMaybe<StringFilter>
}

export type Payment_MethodInsertInput = {
  payment_method_stripe?: InputMaybe<Scalars['String']['input']>
}

export type Payment_MethodInsertResponse = {
  __typename?: 'payment_methodInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Payment_Method>
}

export type Payment_MethodOrderBy = {
  method_id?: InputMaybe<OrderByDirection>
  payment_method_stripe?: InputMaybe<OrderByDirection>
}

export type Payment_MethodUpdateInput = {
  payment_method_stripe?: InputMaybe<Scalars['String']['input']>
}

export type Payment_MethodUpdateResponse = {
  __typename?: 'payment_methodUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Payment_Method>
}

export type Rental_Lessee = Node & {
  __typename?: 'rental_lessee'
  lessee?: Maybe<Lessee>
  lessee_id: Scalars['Int']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  rental_id: Scalars['Int']['output']
  rental_property?: Maybe<Rental_Property>
}

export type Rental_LesseeConnection = {
  __typename?: 'rental_lesseeConnection'
  edges: Array<Rental_LesseeEdge>
  pageInfo: PageInfo
}

export type Rental_LesseeDeleteResponse = {
  __typename?: 'rental_lesseeDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Rental_Lessee>
}

export type Rental_LesseeEdge = {
  __typename?: 'rental_lesseeEdge'
  cursor: Scalars['String']['output']
  node: Rental_Lessee
}

export type Rental_LesseeFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Rental_LesseeFilter>>
  lessee_id?: InputMaybe<IntFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Rental_LesseeFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Rental_LesseeFilter>>
  rental_id?: InputMaybe<IntFilter>
}

export type Rental_LesseeInsertInput = {
  lessee_id?: InputMaybe<Scalars['Int']['input']>
  rental_id?: InputMaybe<Scalars['Int']['input']>
}

export type Rental_LesseeInsertResponse = {
  __typename?: 'rental_lesseeInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Rental_Lessee>
}

export type Rental_LesseeOrderBy = {
  lessee_id?: InputMaybe<OrderByDirection>
  rental_id?: InputMaybe<OrderByDirection>
}

export type Rental_LesseeUpdateInput = {
  lessee_id?: InputMaybe<Scalars['Int']['input']>
  rental_id?: InputMaybe<Scalars['Int']['input']>
}

export type Rental_LesseeUpdateResponse = {
  __typename?: 'rental_lesseeUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Rental_Lessee>
}

export type Rental_Property = Node & {
  __typename?: 'rental_property'
  city: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  notes?: Maybe<Scalars['String']['output']>
  postal_code: Scalars['String']['output']
  property_id: Scalars['Int']['output']
  rental_lesseeCollection?: Maybe<Rental_LesseeConnection>
  state_province: Scalars['String']['output']
  street_address: Scalars['String']['output']
  unit_number?: Maybe<Scalars['String']['output']>
}

export type Rental_PropertyRental_LesseeCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Rental_LesseeFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Rental_LesseeOrderBy>>
}

export type Rental_PropertyConnection = {
  __typename?: 'rental_propertyConnection'
  edges: Array<Rental_PropertyEdge>
  pageInfo: PageInfo
}

export type Rental_PropertyDeleteResponse = {
  __typename?: 'rental_propertyDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Rental_Property>
}

export type Rental_PropertyEdge = {
  __typename?: 'rental_propertyEdge'
  cursor: Scalars['String']['output']
  node: Rental_Property
}

export type Rental_PropertyFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Rental_PropertyFilter>>
  city?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Rental_PropertyFilter>
  notes?: InputMaybe<StringFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Rental_PropertyFilter>>
  postal_code?: InputMaybe<StringFilter>
  property_id?: InputMaybe<IntFilter>
  state_province?: InputMaybe<StringFilter>
  street_address?: InputMaybe<StringFilter>
  unit_number?: InputMaybe<StringFilter>
}

export type Rental_PropertyInsertInput = {
  city?: InputMaybe<Scalars['String']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  postal_code?: InputMaybe<Scalars['String']['input']>
  state_province?: InputMaybe<Scalars['String']['input']>
  street_address?: InputMaybe<Scalars['String']['input']>
  unit_number?: InputMaybe<Scalars['String']['input']>
}

export type Rental_PropertyInsertResponse = {
  __typename?: 'rental_propertyInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Rental_Property>
}

export type Rental_PropertyOrderBy = {
  city?: InputMaybe<OrderByDirection>
  notes?: InputMaybe<OrderByDirection>
  postal_code?: InputMaybe<OrderByDirection>
  property_id?: InputMaybe<OrderByDirection>
  state_province?: InputMaybe<OrderByDirection>
  street_address?: InputMaybe<OrderByDirection>
  unit_number?: InputMaybe<OrderByDirection>
}

export type Rental_PropertyUpdateInput = {
  city?: InputMaybe<Scalars['String']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  postal_code?: InputMaybe<Scalars['String']['input']>
  state_province?: InputMaybe<Scalars['String']['input']>
  street_address?: InputMaybe<Scalars['String']['input']>
  unit_number?: InputMaybe<Scalars['String']['input']>
}

export type Rental_PropertyUpdateResponse = {
  __typename?: 'rental_propertyUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Rental_Property>
}

export type Service_Request_Technicians = Node & {
  __typename?: 'service_request_technicians'
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  service_request_id: Scalars['UUID']['output']
  service_requests?: Maybe<Service_Requests>
  technician_id: Scalars['UUID']['output']
  technicians?: Maybe<Technicians>
}

export type Service_Request_TechniciansConnection = {
  __typename?: 'service_request_techniciansConnection'
  edges: Array<Service_Request_TechniciansEdge>
  pageInfo: PageInfo
}

export type Service_Request_TechniciansDeleteResponse = {
  __typename?: 'service_request_techniciansDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Request_Technicians>
}

export type Service_Request_TechniciansEdge = {
  __typename?: 'service_request_techniciansEdge'
  cursor: Scalars['String']['output']
  node: Service_Request_Technicians
}

export type Service_Request_TechniciansFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Service_Request_TechniciansFilter>>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Service_Request_TechniciansFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Service_Request_TechniciansFilter>>
  service_request_id?: InputMaybe<UuidFilter>
  technician_id?: InputMaybe<UuidFilter>
}

export type Service_Request_TechniciansInsertInput = {
  service_request_id?: InputMaybe<Scalars['UUID']['input']>
  technician_id?: InputMaybe<Scalars['UUID']['input']>
}

export type Service_Request_TechniciansInsertResponse = {
  __typename?: 'service_request_techniciansInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Request_Technicians>
}

export type Service_Request_TechniciansOrderBy = {
  service_request_id?: InputMaybe<OrderByDirection>
  technician_id?: InputMaybe<OrderByDirection>
}

export type Service_Request_TechniciansUpdateInput = {
  service_request_id?: InputMaybe<Scalars['UUID']['input']>
  technician_id?: InputMaybe<Scalars['UUID']['input']>
}

export type Service_Request_TechniciansUpdateResponse = {
  __typename?: 'service_request_techniciansUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Request_Technicians>
}

export type Service_Requests = Node & {
  __typename?: 'service_requests'
  completed?: Maybe<Scalars['Boolean']['output']>
  date_created?: Maybe<Scalars['Datetime']['output']>
  date_updated?: Maybe<Scalars['Datetime']['output']>
  description?: Maybe<Scalars['String']['output']>
  details?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  location_id?: Maybe<Scalars['UUID']['output']>
  locations?: Maybe<Locations>
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  requested_by?: Maybe<Scalars['UUID']['output']>
  rich_details?: Maybe<Scalars['JSON']['output']>
  service_request_techniciansCollection?: Maybe<Service_Request_TechniciansConnection>
  service_type_id?: Maybe<Scalars['UUID']['output']>
  service_types?: Maybe<Service_Types>
  status_id?: Maybe<Scalars['UUID']['output']>
  statuses?: Maybe<Statuses>
  steps?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  tenants?: Maybe<Tenants>
}

export type Service_RequestsService_Request_TechniciansCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_Request_TechniciansFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_Request_TechniciansOrderBy>>
}

export type Service_RequestsConnection = {
  __typename?: 'service_requestsConnection'
  edges: Array<Service_RequestsEdge>
  pageInfo: PageInfo
}

export type Service_RequestsDeleteResponse = {
  __typename?: 'service_requestsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Requests>
}

export type Service_RequestsEdge = {
  __typename?: 'service_requestsEdge'
  cursor: Scalars['String']['output']
  node: Service_Requests
}

export type Service_RequestsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Service_RequestsFilter>>
  completed?: InputMaybe<BooleanFilter>
  date_created?: InputMaybe<DatetimeFilter>
  date_updated?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<StringFilter>
  details?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  location_id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Service_RequestsFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Service_RequestsFilter>>
  requested_by?: InputMaybe<UuidFilter>
  service_type_id?: InputMaybe<UuidFilter>
  status_id?: InputMaybe<UuidFilter>
  steps?: InputMaybe<StringListFilter>
}

export type Service_RequestsInsertInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>
  date_created?: InputMaybe<Scalars['Datetime']['input']>
  date_updated?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  details?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  requested_by?: InputMaybe<Scalars['UUID']['input']>
  rich_details?: InputMaybe<Scalars['JSON']['input']>
  service_type_id?: InputMaybe<Scalars['UUID']['input']>
  status_id?: InputMaybe<Scalars['UUID']['input']>
  steps?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type Service_RequestsInsertResponse = {
  __typename?: 'service_requestsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Requests>
}

export type Service_RequestsOrderBy = {
  completed?: InputMaybe<OrderByDirection>
  date_created?: InputMaybe<OrderByDirection>
  date_updated?: InputMaybe<OrderByDirection>
  description?: InputMaybe<OrderByDirection>
  details?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  location_id?: InputMaybe<OrderByDirection>
  requested_by?: InputMaybe<OrderByDirection>
  service_type_id?: InputMaybe<OrderByDirection>
  status_id?: InputMaybe<OrderByDirection>
}

export type Service_RequestsUpdateInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>
  date_created?: InputMaybe<Scalars['Datetime']['input']>
  date_updated?: InputMaybe<Scalars['Datetime']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  details?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  location_id?: InputMaybe<Scalars['UUID']['input']>
  requested_by?: InputMaybe<Scalars['UUID']['input']>
  rich_details?: InputMaybe<Scalars['JSON']['input']>
  service_type_id?: InputMaybe<Scalars['UUID']['input']>
  status_id?: InputMaybe<Scalars['UUID']['input']>
  steps?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type Service_RequestsUpdateResponse = {
  __typename?: 'service_requestsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Requests>
}

export type Service_Types = Node & {
  __typename?: 'service_types'
  id: Scalars['UUID']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  service_name: Scalars['String']['output']
  service_requestsCollection?: Maybe<Service_RequestsConnection>
}

export type Service_TypesService_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_RequestsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_RequestsOrderBy>>
}

export type Service_TypesConnection = {
  __typename?: 'service_typesConnection'
  edges: Array<Service_TypesEdge>
  pageInfo: PageInfo
}

export type Service_TypesDeleteResponse = {
  __typename?: 'service_typesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Types>
}

export type Service_TypesEdge = {
  __typename?: 'service_typesEdge'
  cursor: Scalars['String']['output']
  node: Service_Types
}

export type Service_TypesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Service_TypesFilter>>
  id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<Service_TypesFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Service_TypesFilter>>
  service_name?: InputMaybe<StringFilter>
}

export type Service_TypesInsertInput = {
  id?: InputMaybe<Scalars['UUID']['input']>
  service_name?: InputMaybe<Scalars['String']['input']>
}

export type Service_TypesInsertResponse = {
  __typename?: 'service_typesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Types>
}

export type Service_TypesOrderBy = {
  id?: InputMaybe<OrderByDirection>
  service_name?: InputMaybe<OrderByDirection>
}

export type Service_TypesUpdateInput = {
  id?: InputMaybe<Scalars['UUID']['input']>
  service_name?: InputMaybe<Scalars['String']['input']>
}

export type Service_TypesUpdateResponse = {
  __typename?: 'service_typesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Service_Types>
}

export type Statuses = Node & {
  __typename?: 'statuses'
  id: Scalars['UUID']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  service_requestsCollection?: Maybe<Service_RequestsConnection>
  status_name: Scalars['String']['output']
}

export type StatusesService_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_RequestsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_RequestsOrderBy>>
}

export type StatusesConnection = {
  __typename?: 'statusesConnection'
  edges: Array<StatusesEdge>
  pageInfo: PageInfo
}

export type StatusesDeleteResponse = {
  __typename?: 'statusesDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Statuses>
}

export type StatusesEdge = {
  __typename?: 'statusesEdge'
  cursor: Scalars['String']['output']
  node: Statuses
}

export type StatusesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<StatusesFilter>>
  id?: InputMaybe<UuidFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<StatusesFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<StatusesFilter>>
  status_name?: InputMaybe<StringFilter>
}

export type StatusesInsertInput = {
  id?: InputMaybe<Scalars['UUID']['input']>
  status_name?: InputMaybe<Scalars['String']['input']>
}

export type StatusesInsertResponse = {
  __typename?: 'statusesInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Statuses>
}

export type StatusesOrderBy = {
  id?: InputMaybe<OrderByDirection>
  status_name?: InputMaybe<OrderByDirection>
}

export type StatusesUpdateInput = {
  id?: InputMaybe<Scalars['UUID']['input']>
  status_name?: InputMaybe<Scalars['String']['input']>
}

export type StatusesUpdateResponse = {
  __typename?: 'statusesUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Statuses>
}

export type Technicians = Node & {
  __typename?: 'technicians'
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  service_request_techniciansCollection?: Maybe<Service_Request_TechniciansConnection>
}

export type TechniciansService_Request_TechniciansCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_Request_TechniciansFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_Request_TechniciansOrderBy>>
}

export type TechniciansConnection = {
  __typename?: 'techniciansConnection'
  edges: Array<TechniciansEdge>
  pageInfo: PageInfo
}

export type TechniciansDeleteResponse = {
  __typename?: 'techniciansDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Technicians>
}

export type TechniciansEdge = {
  __typename?: 'techniciansEdge'
  cursor: Scalars['String']['output']
  node: Technicians
}

export type TechniciansFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<TechniciansFilter>>
  email?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<TechniciansFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<TechniciansFilter>>
}

export type TechniciansInsertInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type TechniciansInsertResponse = {
  __typename?: 'techniciansInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Technicians>
}

export type TechniciansOrderBy = {
  email?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
}

export type TechniciansUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type TechniciansUpdateResponse = {
  __typename?: 'techniciansUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Technicians>
}

export type Tenants = Node & {
  __typename?: 'tenants'
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['UUID']['output']
  name: Scalars['String']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  service_requestsCollection?: Maybe<Service_RequestsConnection>
}

export type TenantsService_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  filter?: InputMaybe<Service_RequestsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Service_RequestsOrderBy>>
}

export type TenantsConnection = {
  __typename?: 'tenantsConnection'
  edges: Array<TenantsEdge>
  pageInfo: PageInfo
}

export type TenantsDeleteResponse = {
  __typename?: 'tenantsDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Tenants>
}

export type TenantsEdge = {
  __typename?: 'tenantsEdge'
  cursor: Scalars['String']['output']
  node: Tenants
}

export type TenantsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<TenantsFilter>>
  email?: InputMaybe<StringFilter>
  id?: InputMaybe<UuidFilter>
  name?: InputMaybe<StringFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<TenantsFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<TenantsFilter>>
}

export type TenantsInsertInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type TenantsInsertResponse = {
  __typename?: 'tenantsInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Tenants>
}

export type TenantsOrderBy = {
  email?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  name?: InputMaybe<OrderByDirection>
}

export type TenantsUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['UUID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type TenantsUpdateResponse = {
  __typename?: 'tenantsUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Tenants>
}

export type Todo = Node & {
  __typename?: 'todo'
  completed?: Maybe<Scalars['Boolean']['output']>
  created_at: Scalars['Datetime']['output']
  id: Scalars['BigInt']['output']
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type TodoConnection = {
  __typename?: 'todoConnection'
  edges: Array<TodoEdge>
  pageInfo: PageInfo
}

export type TodoDeleteResponse = {
  __typename?: 'todoDeleteResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Todo>
}

export type TodoEdge = {
  __typename?: 'todoEdge'
  cursor: Scalars['String']['output']
  node: Todo
}

export type TodoFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<TodoFilter>>
  completed?: InputMaybe<BooleanFilter>
  created_at?: InputMaybe<DatetimeFilter>
  id?: InputMaybe<BigIntFilter>
  nodeId?: InputMaybe<IdFilter>
  /** Negates a filter */
  not?: InputMaybe<TodoFilter>
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<TodoFilter>>
  title?: InputMaybe<StringFilter>
}

export type TodoInsertInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type TodoInsertResponse = {
  __typename?: 'todoInsertResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Todo>
}

export type TodoOrderBy = {
  completed?: InputMaybe<OrderByDirection>
  created_at?: InputMaybe<OrderByDirection>
  id?: InputMaybe<OrderByDirection>
  title?: InputMaybe<OrderByDirection>
}

export type TodoUpdateInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>
  created_at?: InputMaybe<Scalars['Datetime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type TodoUpdateResponse = {
  __typename?: 'todoUpdateResponse'
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output']
  /** Array of records impacted by the mutation */
  records: Array<Todo>
}

// export class TypedDocumentString<TResult, TVariables>
//   extends String
//   implements DocumentTypeDecoration<TResult, TVariables>
// {
//   __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

//   constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
//     super(value);
//   }

//   toString(): string & DocumentTypeDecoration<TResult, TVariables> {
//     return this.value;
//   }
// }
