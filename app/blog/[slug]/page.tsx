"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { useSupabase } from "@/lib/supabase/supabase-provider"
import { formatDate, getImageUrl } from "@/lib/utils"
import PostAuthor from "@/components/post-author"

type Post = {
  id: string
  title: string
  content: string
  image_url: string | null
  created_at: string
  updated_at: string
  author_id: string
  category: string
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { supabase } = useSupabase()
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, content, image_url, created_at, updated_at, author_id, category")
          .eq("slug", slug)
          .eq("published", true)
          .single()

        if (error) {
          throw error
        }

        setPost(data as Post)

        // Fetch related posts from the same category
        if (data) {
          const { data: relatedData, error: relatedError } = await supabase
            .from("posts")
            .select("id, title, slug, image_url")
            .eq("category", data.category)
            .eq("published", true)
            .neq("id", data.id)
            .limit(3)

          if (!relatedError) {
            setRelatedPosts(relatedData)
          }
        }
      } catch (error: any) {
        console.error("Error fetching post:", error)
        setError(error.message || "Gagal memuat artikel")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [supabase, slug])

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-1/4 bg-muted animate-pulse rounded mb-4" />
          <div className="h-12 bg-muted animate-pulse rounded mb-8" />
          <div className="aspect-video bg-muted animate-pulse rounded mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-8">
            {error || "Artikel yang Anda cari tidak ada atau telah dihapus."}
          </p>
          <Button asChild>
            <Link href="/blog">Kembali ke Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Blog
          </Link>
        </Button>

        <h1 className="text-3xl font-bold md:text-4xl mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <PostAuthor authorId={post.author_id} />
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <Link href={`/kategori/${post.category.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary">
              {post.category}
            </Link>
          </div>
        </div>

        {post.image_url && (
          <div className="mb-8">
            <Image
              src={getImageUrl(post.image_url) || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full aspect-video"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                  <div className="rounded-lg overflow-hidden mb-2">
                    <Image
                      src={getImageUrl(related.image_url) || "/placeholder.svg"}
                      alt={related.title}
                      width={300}
                      height={150}
                      className="aspect-video object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-primary line-clamp-2">{related.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

