"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase/supabase-provider"

type Profile = {
  full_name: string | null
  avatar_url: string | null
}

export default function PostAuthor({ authorId }: { authorId: string }) {
  const { supabase } = useSupabase()
  const [author, setAuthor] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", authorId)
          .single()

        if (error) {
          throw error
        }

        setAuthor(data as Profile)
      } catch (error) {
        console.error("Error fetching author:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (authorId) {
      fetchAuthor()
    } else {
      setIsLoading(false)
    }
  }, [supabase, authorId])

  if (isLoading) {
    return <span>Memuat...</span>
  }

  return <span>{author?.full_name || "Admin"}</span>
}

