export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      lessee: {
        Row: {
          date_of_birth: string | null
          email_address: string | null
          emergency_contact: string | null
          emergency_contact_phone_number: string | null
          first_name: string
          last_name: string
          lease_end_date: string | null
          lease_start_date: string | null
          lease_status: string | null
          lessee_id: number
          monthly_rent_amount: number | null
          move_in_date: string | null
          move_out_date: string | null
          notes: string | null
          occupation: string | null
          payment_due_day: number | null
          phone_number: string | null
          secondary_phone_number: string | null
          security_deposit: number | null
        }
        Insert: {
          date_of_birth?: string | null
          email_address?: string | null
          emergency_contact?: string | null
          emergency_contact_phone_number?: string | null
          first_name: string
          last_name: string
          lease_end_date?: string | null
          lease_start_date?: string | null
          lease_status?: string | null
          lessee_id?: number
          monthly_rent_amount?: number | null
          move_in_date?: string | null
          move_out_date?: string | null
          notes?: string | null
          occupation?: string | null
          payment_due_day?: number | null
          phone_number?: string | null
          secondary_phone_number?: string | null
          security_deposit?: number | null
        }
        Update: {
          date_of_birth?: string | null
          email_address?: string | null
          emergency_contact?: string | null
          emergency_contact_phone_number?: string | null
          first_name?: string
          last_name?: string
          lease_end_date?: string | null
          lease_start_date?: string | null
          lease_status?: string | null
          lessee_id?: number
          monthly_rent_amount?: number | null
          move_in_date?: string | null
          move_out_date?: string | null
          notes?: string | null
          occupation?: string | null
          payment_due_day?: number | null
          phone_number?: string | null
          secondary_phone_number?: string | null
          security_deposit?: number | null
        }
        Relationships: []
      }
      lessee_payment_method: {
        Row: {
          lessee_id: number
          method_id: number
        }
        Insert: {
          lessee_id: number
          method_id: number
        }
        Update: {
          lessee_id?: number
          method_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'lessee_payment_method_lessee_id_fkey'
            columns: ['lessee_id']
            isOneToOne: false
            referencedRelation: 'lessee'
            referencedColumns: ['lessee_id']
          },
          {
            foreignKeyName: 'lessee_payment_method_method_id_fkey'
            columns: ['method_id']
            isOneToOne: false
            referencedRelation: 'payment_method'
            referencedColumns: ['method_id']
          },
        ]
      }
      locations: {
        Row: {
          location_id: number
          location_name: string
        }
        Insert: {
          location_id?: number
          location_name: string
        }
        Update: {
          location_id?: number
          location_name?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      payment_method: {
        Row: {
          method_id: number
          payment_method_stripe: string
        }
        Insert: {
          method_id?: number
          payment_method_stripe: string
        }
        Update: {
          method_id?: number
          payment_method_stripe?: string
        }
        Relationships: []
      }
      priorities: {
        Row: {
          priority_id: number
          priority_name: string
        }
        Insert: {
          priority_id?: number
          priority_name: string
        }
        Update: {
          priority_id?: number
          priority_name?: string
        }
        Relationships: []
      }
      rental_lessee: {
        Row: {
          lessee_id: number
          rental_id: number
        }
        Insert: {
          lessee_id: number
          rental_id: number
        }
        Update: {
          lessee_id?: number
          rental_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'rental_lessee_lessee_id_fkey'
            columns: ['lessee_id']
            isOneToOne: false
            referencedRelation: 'lessee'
            referencedColumns: ['lessee_id']
          },
          {
            foreignKeyName: 'rental_lessee_rental_id_fkey'
            columns: ['rental_id']
            isOneToOne: false
            referencedRelation: 'rental_property'
            referencedColumns: ['property_id']
          },
        ]
      }
      rental_property: {
        Row: {
          city: string
          notes: string | null
          postal_code: string
          property_id: number
          state_province: string
          street_address: string
          unit_number: string | null
        }
        Insert: {
          city: string
          notes?: string | null
          postal_code: string
          property_id?: number
          state_province: string
          street_address: string
          unit_number?: string | null
        }
        Update: {
          city?: string
          notes?: string | null
          postal_code?: string
          property_id?: number
          state_province?: string
          street_address?: string
          unit_number?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          date_created: string | null
          date_updated: string | null
          description: string | null
          location_id: number | null
          priority_id: number | null
          request_id: number
          requester_id: number | null
          service_type_id: number | null
          status_id: number | null
          technician_id: number | null
        }
        Insert: {
          date_created?: string | null
          date_updated?: string | null
          description?: string | null
          location_id?: number | null
          priority_id?: number | null
          request_id?: number
          requester_id?: number | null
          service_type_id?: number | null
          status_id?: number | null
          technician_id?: number | null
        }
        Update: {
          date_created?: string | null
          date_updated?: string | null
          description?: string | null
          location_id?: number | null
          priority_id?: number | null
          request_id?: number
          requester_id?: number | null
          service_type_id?: number | null
          status_id?: number | null
          technician_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'service_requests_location_id_fkey'
            columns: ['location_id']
            isOneToOne: false
            referencedRelation: 'locations'
            referencedColumns: ['location_id']
          },
          {
            foreignKeyName: 'service_requests_priority_id_fkey'
            columns: ['priority_id']
            isOneToOne: false
            referencedRelation: 'priorities'
            referencedColumns: ['priority_id']
          },
          {
            foreignKeyName: 'service_requests_requester_id_fkey'
            columns: ['requester_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
          },
          {
            foreignKeyName: 'service_requests_service_type_id_fkey'
            columns: ['service_type_id']
            isOneToOne: false
            referencedRelation: 'service_types'
            referencedColumns: ['service_type_id']
          },
          {
            foreignKeyName: 'service_requests_status_id_fkey'
            columns: ['status_id']
            isOneToOne: false
            referencedRelation: 'statuses'
            referencedColumns: ['status_id']
          },
          {
            foreignKeyName: 'service_requests_technician_id_fkey'
            columns: ['technician_id']
            isOneToOne: false
            referencedRelation: 'technicians'
            referencedColumns: ['technician_id']
          },
        ]
      }
      service_types: {
        Row: {
          service_name: string
          service_type_id: number
        }
        Insert: {
          service_name: string
          service_type_id?: number
        }
        Update: {
          service_name?: string
          service_type_id?: number
        }
        Relationships: []
      }
      statuses: {
        Row: {
          status_id: number
          status_name: string
        }
        Insert: {
          status_id?: number
          status_name: string
        }
        Update: {
          status_id?: number
          status_name?: string
        }
        Relationships: []
      }
      technicians: {
        Row: {
          email: string | null
          name: string
          technician_id: number
        }
        Insert: {
          email?: string | null
          name: string
          technician_id?: number
        }
        Update: {
          email?: string | null
          name?: string
          technician_id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          name: string
          user_id: number
        }
        Insert: {
          email?: string | null
          name: string
          user_id?: number
        }
        Update: {
          email?: string | null
          name?: string
          user_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
