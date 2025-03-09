import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentPosts } from "@/components/admin/recent-posts"
import { RecentUsers } from "@/components/admin/recent-users"

export default async function AdminDashboard() {
  const supabase = createClient()

  // Get counts for dashboard
  const { count: postsCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

  const { count: usersCount } = await supabase.from("user_analytics").select("*", { count: "exact", head: true })

  const { data: adminUsers } = await supabase.auth.admin.listUsers()
  const adminCount = adminUsers?.users.filter((user) => user.user_metadata?.is_admin).length || 0

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <DashboardStats postsCount={postsCount || 0} usersCount={usersCount || 0} adminCount={adminCount || 0} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentPosts />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentUsers />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

