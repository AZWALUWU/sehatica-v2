import Link from "next/link"
import { BlogPostList } from "@/components/blog-post-list"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function BlogPage() {
  const supabase = createClient()
  const posts = await getPosts()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const isAdmin = session?.user.user_metadata.is_admin

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Health Blog</h1>
        {isAdmin && (
          <Link href="/blog/new">
            <Button>Create New Post</Button>
          </Link>
        )}
      </div>
      <BlogPostList posts={posts} isAdmin={isAdmin} />
    </div>
  )
}

