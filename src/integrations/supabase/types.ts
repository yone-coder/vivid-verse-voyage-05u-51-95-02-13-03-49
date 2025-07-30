export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      game_rooms: {
        Row: {
          board: Json
          code: string
          created_at: string
          current_player: string
          id: string
          last_move: Json | null
          player1_id: string | null
          player2_id: string | null
          status: string
          time_left_o: number
          time_left_x: number
          winner: string | null
        }
        Insert: {
          board: Json
          code: string
          created_at?: string
          current_player?: string
          id?: string
          last_move?: Json | null
          player1_id?: string | null
          player2_id?: string | null
          status?: string
          time_left_o?: number
          time_left_x?: number
          winner?: string | null
        }
        Update: {
          board?: Json
          code?: string
          created_at?: string
          current_player?: string
          id?: string
          last_move?: Json | null
          player1_id?: string | null
          player2_id?: string | null
          status?: string
          time_left_o?: number
          time_left_x?: number
          winner?: string | null
        }
        Relationships: []
      }
      hero_banners: {
        Row: {
          alt: string
          created_at: string
          duration: number | null
          id: string
          image: string
          position: number
          updated_at: string
        }
        Insert: {
          alt: string
          created_at?: string
          duration?: number | null
          id?: string
          image: string
          position?: number
          updated_at?: string
        }
        Update: {
          alt?: string
          created_at?: string
          duration?: number | null
          id?: string
          image?: string
          position?: number
          updated_at?: string
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          otp_code: string
          purpose: string | null
          used: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          otp_code: string
          purpose?: string | null
          used?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          otp_code?: string
          purpose?: string | null
          used?: boolean | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt: string
          created_at: string
          id: string
          product_id: string
          src: string
          updated_at: string
        }
        Insert: {
          alt: string
          created_at?: string
          id?: string
          product_id: string
          src: string
          updated_at?: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: string
          product_id?: string
          src?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string
          discount_price: number | null
          flash_deal: boolean | null
          flash_start_time: string | null
          id: string
          inventory: number | null
          last_activity: string | null
          location: string | null
          name: string
          price: number
          product_type: string | null
          saves: number | null
          seller_id: string | null
          seller_trust_score: number | null
          status: string | null
          tags: string[] | null
          updated_at: string
          views: number | null
        }
        Insert: {
          created_at?: string
          description: string
          discount_price?: number | null
          flash_deal?: boolean | null
          flash_start_time?: string | null
          id?: string
          inventory?: number | null
          last_activity?: string | null
          location?: string | null
          name: string
          price: number
          product_type?: string | null
          saves?: number | null
          seller_id?: string | null
          seller_trust_score?: number | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string
          views?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          discount_price?: number | null
          flash_deal?: boolean | null
          flash_start_time?: string | null
          id?: string
          inventory?: number | null
          last_activity?: string | null
          location?: string | null
          name?: string
          price?: number
          product_type?: string | null
          saves?: number | null
          seller_id?: string | null
          seller_trust_score?: number | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_provider: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          google_access_token: string | null
          google_id: string | null
          id: string
          last_login: string | null
          password_hash: string | null
          phone: string | null
          profile_picture: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          auth_provider?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          google_access_token?: string | null
          google_id?: string | null
          id: string
          last_login?: string | null
          password_hash?: string | null
          phone?: string | null
          profile_picture?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          auth_provider?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          google_access_token?: string | null
          google_id?: string | null
          id?: string
          last_login?: string | null
          password_hash?: string | null
          phone?: string | null
          profile_picture?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      sellers: {
        Row: {
          address: string | null
          category: string | null
          created_at: string
          description: string | null
          email: string | null
          followers_count: number
          id: string
          image_url: string | null
          name: string
          phone: string | null
          rating: number | null
          status: string
          total_sales: number
          trust_score: number
          updated_at: string
          verified: boolean
        }
        Insert: {
          address?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          followers_count?: number
          id?: string
          image_url?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          status?: string
          total_sales?: number
          trust_score?: number
          updated_at?: string
          verified?: boolean
        }
        Update: {
          address?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          followers_count?: number
          id?: string
          image_url?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          status?: string
          total_sales?: number
          trust_score?: number
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      transactions: {
        Row: {
          created: string
          id: number
          item_name: string | null
          item_number: string | null
          item_price: number | null
          item_price_currency: string | null
          modified: string
          order_id: string
          paid_amount: number
          paid_amount_currency: string
          payment_source: string | null
          payment_source_card_brand: string | null
          payment_source_card_expiry: string | null
          payment_source_card_last_digits: string | null
          payment_source_card_name: string | null
          payment_source_card_type: string | null
          payment_status: string
          transaction_id: string
        }
        Insert: {
          created?: string
          id?: never
          item_name?: string | null
          item_number?: string | null
          item_price?: number | null
          item_price_currency?: string | null
          modified?: string
          order_id: string
          paid_amount: number
          paid_amount_currency: string
          payment_source?: string | null
          payment_source_card_brand?: string | null
          payment_source_card_expiry?: string | null
          payment_source_card_last_digits?: string | null
          payment_source_card_name?: string | null
          payment_source_card_type?: string | null
          payment_status: string
          transaction_id: string
        }
        Update: {
          created?: string
          id?: never
          item_name?: string | null
          item_number?: string | null
          item_price?: number | null
          item_price_currency?: string | null
          modified?: string
          order_id?: string
          paid_amount?: number
          paid_amount_currency?: string
          payment_source?: string | null
          payment_source_card_brand?: string | null
          payment_source_card_expiry?: string | null
          payment_source_card_last_digits?: string | null
          payment_source_card_name?: string | null
          payment_source_card_type?: string | null
          payment_status?: string
          transaction_id?: string
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          phone: string | null
          verified: boolean | null
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          phone?: string | null
          verified?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          phone?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          duration: number
          id: string
          likes: number
          tags: string[] | null
          thumbnail_url: string
          title: string
          updated_at: string
          user_id: string | null
          username: string
          video_url: string
          views: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          likes?: number
          tags?: string[] | null
          thumbnail_url: string
          title: string
          updated_at?: string
          user_id?: string | null
          username: string
          video_url: string
          views?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          likes?: number
          tags?: string[] | null
          thumbnail_url?: string
          title?: string
          updated_at?: string
          user_id?: string | null
          username?: string
          video_url?: string
          views?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_select_flash_deals: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_otps: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_product_saves: {
        Args: { product_id: string }
        Returns: undefined
      }
      increment_product_views: {
        Args: { product_id: string }
        Returns: undefined
      }
      join_game_room: {
        Args: { p_room_id: string; p_user_id: string }
        Returns: {
          board: Json
          code: string
          created_at: string
          current_player: string
          id: string
          last_move: Json | null
          player1_id: string | null
          player2_id: string | null
          status: string
          time_left_o: number
          time_left_x: number
          winner: string | null
        }[]
      }
      update_product: {
        Args: {
          p_id: string
          p_name?: string
          p_description?: string
          p_price?: number
          p_discount_price?: number
          p_inventory?: number
        }
        Returns: {
          created_at: string
          description: string
          discount_price: number | null
          flash_deal: boolean | null
          flash_start_time: string | null
          id: string
          inventory: number | null
          last_activity: string | null
          location: string | null
          name: string
          price: number
          product_type: string | null
          saves: number | null
          seller_id: string | null
          seller_trust_score: number | null
          status: string | null
          tags: string[] | null
          updated_at: string
          views: number | null
        }[]
      }
    }
    Enums: {
      tournament_status: "in-progress" | "closed" | "completed" | "upcoming"
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
      tournament_status: ["in-progress", "closed", "completed", "upcoming"],
    },
  },
} as const
