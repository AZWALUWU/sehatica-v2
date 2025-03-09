import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, ShieldCheck } from "lucide-react"

interface DashboardStatsProps {
  postsCount: number
  usersCount: number
  adminCount: number
}

export function DashboardStats({ postsCount, usersCount, adminCount }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Blog Posts",
      value: postsCount,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Total Users",
      value: usersCount,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Admin Users",
      value: adminCount,
      icon: ShieldCheck,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

