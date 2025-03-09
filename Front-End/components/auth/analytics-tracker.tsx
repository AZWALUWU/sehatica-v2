"use client"

import { useEffect } from "react"
import { useAuth } from "@/Front-End/hooks/use-auth"

export function AnalyticsTracker() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    let startTime = Date.now()
    let intervalId: NodeJS.Timeout

    // Update visit duration every minute
    intervalId = setInterval(async () => {
      const duration = Math.floor((Date.now() - startTime) / 1000)
      startTime = Date.now()

      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ duration }),
        })
      } catch (error) {
        console.error("Failed to update visit duration:", error)
      }
    }, 60000) // Every minute

    // Update on page unload
    const handleUnload = async () => {
      const duration = Math.floor((Date.now() - startTime) / 1000)

      // Use sendBeacon for more reliable tracking on page unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/track", JSON.stringify({ duration }))
      } else {
        // Fallback for browsers that don't support sendBeacon
        try {
          await fetch("/api/analytics/track", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ duration }),
            keepalive: true,
          })
        } catch (error) {
          console.error("Failed to update visit duration:", error)
        }
      }
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("beforeunload", handleUnload)

      // Update duration when component unmounts
      const duration = Math.floor((Date.now() - startTime) / 1000)
      if (duration > 0) {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ duration }),
          keepalive: true,
        }).catch((error) => {
          console.error("Failed to update visit duration:", error)
        })
      }
    }
  }, [user])

  return null
}

