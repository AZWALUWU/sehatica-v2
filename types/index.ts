export interface BlogPost {
  id: number
  title: string
  content: string
  created_at: string
  user_id?: string
}

export interface UserAnalytics {
  id: string
  email: string
  last_visit: string
  visit_duration: number
  visit_count: number
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
  raw_user_meta_data: {
    is_admin?: boolean
  }
}

