import { createClient } from "@/Back-End/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VisitDurationChart } from "@/Front-End/components/admin/analytics/visit-duration-chart"
import { UserVisitsTable } from "@/Front-End/components/admin/analytics/user-visits-table"

export default async function AnalyticsPage() {
  const supabase = createClient()

  // Fetch user analytics data
  const { data: analytics, error } = await supabase
    .from("user_analytics")
    .select("*")
    .order("last_visit", { ascending: false })

  if (error) {
    console.error("Error fetching analytics:", error)
  }

  // Calculate average visit duration
  const totalDuration = analytics?.reduce((sum, user) => sum + user.visit_duration, 0) || 0
  const avgDuration = analytics?.length ? Math.floor(totalDuration / analytics.length) : 0

  // Format duration in minutes and seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes === 0) {
      return `${remainingSeconds} seconds`
    }

    return `${minutes} minutes ${remainingSeconds} seconds`
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Visit Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatDuration(totalDuration)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Visit Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatDuration(avgDuration)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Visit Duration Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitDurationChart analytics={analytics || []} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <UserVisitsTable analytics={analytics || []} />
        </CardContent>
      </Card>
    </div>
  )
}

