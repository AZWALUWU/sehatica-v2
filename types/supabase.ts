export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          id: string
          email: string
          last_visit: string
          visit_duration: number
          visit_count: number
          created_at: string
        }
        Insert: {
          id: string
          email: string
          last_visit?: string
          visit_duration?: number
          visit_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          last_visit?: string
          visit_duration?: number
          visit_count?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_analytics_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_visit_duration: {
        Args: {
          user_id: string
          duration: number
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

