"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { UserVisitsTableProps } from "@/Front-End/types"

export function UserVisitsTable({ analytics }: UserVisitsTableProps) {
  // Format duration in minutes and seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes === 0) {
      return `${remainingSeconds} sec${remainingSeconds !== 1 ? "s" : ""}`
    }

    return `${minutes} min${minutes !== 1 ? "s" : ""} ${remainingSeconds} sec${remainingSeconds !== 1 ? "s" : ""}`
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Last Visit</TableHead>
          <TableHead>Visit Count</TableHead>
          <TableHead>Total Visit Duration</TableHead>
          <TableHead>Avg. Duration Per Visit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {analytics.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{new Date(user.last_visit).toLocaleString()}</TableCell>
            <TableCell>{user.visit_count}</TableCell>
            <TableCell>{formatDuration(user.visit_duration)}</TableCell>
            <TableCell>{formatDuration(Math.floor(user.visit_duration / (user.visit_count || 1)))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

