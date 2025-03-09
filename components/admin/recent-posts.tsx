"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Post {
  id: number
  title: string
  created_at: string
}

export function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog?limit=5")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        setPosts(data.slice(0, 5))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch recent posts",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [toast])

  if (isLoading) {
    return <div>Loading recent posts...</div>
  }

  if (posts.length === 0) {
    return <div>No posts found</div>
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center justify-between border-b pb-2">
          <div>
            <h3 className="font-medium truncate max-w-[200px]">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/admin/blog/edit/${post.id}`}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
          </div>
        </div>
      ))}
      <Button asChild className="w-full">
        <Link href="/admin/blog">View All Posts</Link>
      </Button>
    </div>
  )
}

