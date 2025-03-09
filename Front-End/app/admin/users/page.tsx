import { createClient } from "@/lib/supabase/server"
import { UserManagement } from "@/components/admin/user-management"

export default async function UsersPage() {
  const supabase = createClient()

  // Fetch all users
  const { data: users, error } = await supabase.auth.admin.listUsers()

  if (error) {
    console.error("Error fetching users:", error)
  }

  // Format users for the component
  const formattedUsers = users?.users.map((user) => ({
    id: user.id,
    email: user.email || "",
    created_at: user.created_at,
    raw_user_meta_data: user.user_metadata,
  }))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      <UserManagement initialUsers={formattedUsers || []} />
    </div>
  )
}

