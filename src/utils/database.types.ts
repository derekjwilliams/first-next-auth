export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bathrooms: {
        Row: {
          area: number | null
          created_at: string
          height: number | null
          id: string
          length: number | null
          location_id: string | null
          width: number | null
        }
        Insert: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: string
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Update: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: string
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bathrooms_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      bedrooms: {
        Row: {
          area: number | null
          created_at: string
          height: number | null
          id: string
          length: number | null
          location_id: string | null
          width: number | null
        }
        Insert: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: string
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Update: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: string
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bedrooms_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string | null
          created_at: string
          department: string | null
          id: string
          owner_id: string
          sensitivity: Database["public"]["Enums"]["sensitivity"]
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          department?: string | null
          id?: string
          owner_id: string
          sensitivity?: Database["public"]["Enums"]["sensitivity"]
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          department?: string | null
          id?: string
          owner_id?: string
          sensitivity?: Database["public"]["Enums"]["sensitivity"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      foo: {
        Row: {
          created_at: string
          id: number
          sites: string[] | null
        }
        Insert: {
          created_at?: string
          id?: number
          sites?: string[] | null
        }
        Update: {
          created_at?: string
          id?: number
          sites?: string[] | null
        }
        Relationships: []
      }
      kitchens: {
        Row: {
          area: number | null
          created_at: string
          height: number | null
          id: string
          length: number | null
          location_id: string | null
          width: number | null
        }
        Insert: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: string
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Update: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: string
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kitchens_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      laundry_rooms: {
        Row: {
          area: number | null
          created_at: string
          height: number | null
          id: number
          length: number | null
          location_id: string | null
          width: number | null
        }
        Insert: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: number
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Update: {
          area?: number | null
          created_at?: string
          height?: number | null
          id?: number
          length?: number | null
          location_id?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "laundry_rooms_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
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
            foreignKeyName: "lessee_payment_method_lessee_id_fkey"
            columns: ["lessee_id"]
            isOneToOne: false
            referencedRelation: "lessee"
            referencedColumns: ["lessee_id"]
          },
          {
            foreignKeyName: "lessee_payment_method_method_id_fkey"
            columns: ["method_id"]
            isOneToOne: false
            referencedRelation: "payment_method"
            referencedColumns: ["method_id"]
          },
        ]
      }
      listing_images: {
        Row: {
          created_at: string
          description: string | null
          id: string
          listing_id: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          listing_id?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          listing_id?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          address_1: string | null
          address_2: string | null
          city: string | null
          cover_image_url: string
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          lease_terms: string | null
          location_id: string | null
          monthly_rent: number | null
          postal_code: string | null
          required_legal_statement: string | null
          rooms: string | null
          state_province: string | null
        }
        Insert: {
          address_1?: string | null
          address_2?: string | null
          city?: string | null
          cover_image_url: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          lease_terms?: string | null
          location_id?: string | null
          monthly_rent?: number | null
          postal_code?: string | null
          required_legal_statement?: string | null
          rooms?: string | null
          state_province?: string | null
        }
        Update: {
          address_1?: string | null
          address_2?: string | null
          city?: string | null
          cover_image_url?: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          lease_terms?: string | null
          location_id?: string | null
          monthly_rent?: number | null
          postal_code?: string | null
          required_legal_statement?: string | null
          rooms?: string | null
          state_province?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_location"
            columns: ["location_id"]
            isOneToOne: true
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          city: string
          id: string
          location_name: string
          notes: string | null
          postal_code: string
          state_province: string
          street_address: string
          tenant_organization_id: string | null
          unit_number: string | null
        }
        Insert: {
          city: string
          id?: string
          location_name: string
          notes?: string | null
          postal_code: string
          state_province: string
          street_address: string
          tenant_organization_id?: string | null
          unit_number?: string | null
        }
        Update: {
          city?: string
          id?: string
          location_name?: string
          notes?: string | null
          postal_code?: string
          state_province?: string
          street_address?: string
          tenant_organization_id?: string | null
          unit_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_tenant_organization_id_fkey"
            columns: ["tenant_organization_id"]
            isOneToOne: false
            referencedRelation: "tenant_organization"
            referencedColumns: ["id"]
          },
        ]
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          full_name: string | null
          id: string
          roles: string[]
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id: string
          roles?: string[]
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id?: string
          roles?: string[]
          updated_at?: string
          username?: string | null
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
            foreignKeyName: "rental_lessee_lessee_id_fkey"
            columns: ["lessee_id"]
            isOneToOne: false
            referencedRelation: "lessee"
            referencedColumns: ["lessee_id"]
          },
          {
            foreignKeyName: "rental_lessee_rental_id_fkey"
            columns: ["rental_id"]
            isOneToOne: false
            referencedRelation: "rental_property"
            referencedColumns: ["property_id"]
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
      saved_images: {
        Row: {
          created_at: string
          file_key: string
          file_url: string
          id: number
        }
        Insert: {
          created_at?: string
          file_key: string
          file_url: string
          id?: number
        }
        Update: {
          created_at?: string
          file_key?: string
          file_url?: string
          id?: number
        }
        Relationships: []
      }
      service_request_technicians: {
        Row: {
          service_request_id: string
          technician_id: string
          tenant_organization_id: string | null
        }
        Insert: {
          service_request_id: string
          technician_id: string
          tenant_organization_id?: string | null
        }
        Update: {
          service_request_id?: string
          technician_id?: string
          tenant_organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_request_technicians_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_request_technicians_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_request_technicians_tenant_organization_id_fkey"
            columns: ["tenant_organization_id"]
            isOneToOne: false
            referencedRelation: "tenant_organization"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          completed: boolean | null
          date_created: string | null
          date_updated: string | null
          description: string | null
          details: string | null
          due_date: string | null
          id: string
          labor_cost: number | null
          location_id: string | null
          material_cost: number | null
          recurring_date_cron: string | null
          requested_by: string | null
          rich_details: Json | null
          service_type_id: string | null
          status_id: string | null
          steps: string[] | null
          tenant_organization_id: string | null
        }
        Insert: {
          completed?: boolean | null
          date_created?: string | null
          date_updated?: string | null
          description?: string | null
          details?: string | null
          due_date?: string | null
          id?: string
          labor_cost?: number | null
          location_id?: string | null
          material_cost?: number | null
          recurring_date_cron?: string | null
          requested_by?: string | null
          rich_details?: Json | null
          service_type_id?: string | null
          status_id?: string | null
          steps?: string[] | null
          tenant_organization_id?: string | null
        }
        Update: {
          completed?: boolean | null
          date_created?: string | null
          date_updated?: string | null
          description?: string | null
          details?: string | null
          due_date?: string | null
          id?: string
          labor_cost?: number | null
          location_id?: string | null
          material_cost?: number | null
          recurring_date_cron?: string | null
          requested_by?: string | null
          rich_details?: Json | null
          service_type_id?: string | null
          status_id?: string | null
          steps?: string[] | null
          tenant_organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_service_requests_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_service_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_service_requests_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_service_requests_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_tenant_organization_id_fkey"
            columns: ["tenant_organization_id"]
            isOneToOne: false
            referencedRelation: "tenant_organization"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          id: string
          service_name: string
          tenant_organization_id: string | null
        }
        Insert: {
          id?: string
          service_name: string
          tenant_organization_id?: string | null
        }
        Update: {
          id?: string
          service_name?: string
          tenant_organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_types_tenant_organization_id_fkey"
            columns: ["tenant_organization_id"]
            isOneToOne: false
            referencedRelation: "tenant_organization"
            referencedColumns: ["id"]
          },
        ]
      }
      statuses: {
        Row: {
          id: string
          status_name: string
          tenant_organization_id: string | null
        }
        Insert: {
          id?: string
          status_name: string
          tenant_organization_id?: string | null
        }
        Update: {
          id?: string
          status_name?: string
          tenant_organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "statuses_tenant_organization_id_fkey"
            columns: ["tenant_organization_id"]
            isOneToOne: false
            referencedRelation: "tenant_organization"
            referencedColumns: ["id"]
          },
        ]
      }
      technicians: {
        Row: {
          email: string | null
          id: string
          name: string
          tenant_organization_id: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          name: string
          tenant_organization_id?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string
          tenant_organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technicians_tenant_organization_id_fkey"
            columns: ["tenant_organization_id"]
            isOneToOne: false
            referencedRelation: "tenant_organization"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_organization: {
        Row: {
          created_at: string | null
          id: string
          is_default: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          email: string | null
          id: string
          name: string
        }
        Insert: {
          email?: string | null
          id?: string
          name: string
        }
        Update: {
          email?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      todo: {
        Row: {
          completed: boolean | null
          created_at: string
          id: number
          title: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_service_request_with_technicians: {
        Args: {
          completed: boolean
          details: string
          location_id: string
          requested_by: string
          service_description: string
          service_type_id: string
          status_id: string
          technician_ids: string[]
        }
        Returns: undefined
      }
    }
    Enums: {
      sensitivity: "public" | "internal" | "confidential"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      sensitivity: ["public", "internal", "confidential"],
    },
  },
} as const
