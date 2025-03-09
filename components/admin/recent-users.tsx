"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface UserAnalytics {
  id: string
  email: string
  last_visit: string
  visit_duration: number
}

export function RecentUsers() {
  const [users, setUsers] = useState<UserAnalytics[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users?limit=5")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch recent users",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [toast])

  if (isLoading) {
    return <div>Loading recent users...</div>
  }

  if (users.length === 0) {
    return <div>No users found</div>
  }

  // Format duration in minutes
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min${minutes !== 1 ? "s" : ""}`
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <h3 className="font-medium truncate max-w-[200px]">{user.email}</h3>
              <p className="text-sm text-muted-foreground">
                Last visit: {new Date(user.last_visit).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDuration(user.visit_duration)}</span>
          </div>
        </div>
      ))}
      <Button asChild className="w-full">
        <Link href="/admin/users">View All Users</Link>
      </Button>
    </div>
  )
}

