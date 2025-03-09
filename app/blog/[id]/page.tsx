import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog?id=${id}`, { cache: "no-store" })
  if (!res.ok) {
    return null
  }
  return res.json()
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const isAdmin = session?.user.user_metadata.is_admin

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">Published on {new Date(post.created_at).toLocaleDateString()}</p>
      <div className="prose max-w-none mb-6">{post.content}</div>
      <div className="flex gap-4">
        {isAdmin && (
          <Link href={`/blog/edit/${post.id}`}>
            <Button variant="outline">Edit Post</Button>
          </Link>
        )}
        <Link href="/blog">
          <Button variant="secondary">Back to Blog</Button>
        </Link>
      </div>
    </div>
  )
}

