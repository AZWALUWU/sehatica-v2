import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { BlogPostsTable } from "@/components/admin/blog-posts-table"
import { Plus } from "lucide-react"

export default async function AdminBlogPage() {
  const supabase = createClient()

  // Fetch all blog posts
  const { data: posts, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <BlogPostsTable initialPosts={posts || []} />
    </div>
  )
}

