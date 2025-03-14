"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useSupabase } from "@/lib/supabase/supabase-provider"
import { formatDate, getImageUrl } from "@/lib/utils"
import PostAuthor from "@/components/post-author"

type Post = {
  id: string
  title: string
  excerpt: string | null
  image_url: string | null
  created_at: string
  slug: string
  author_id: string
  category: string
}

export default function FeaturedPosts() {
  const { supabase } = useSupabase()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, excerpt, image_url, created_at, slug, author_id, category")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(3)

        if (error) {
          throw error
        }

        setPosts(data as Post[])
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [supabase])

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video bg-muted animate-pulse" />
            <CardContent className="p-6">
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // If no posts, show placeholder
  if (posts.length === 0) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Image
              src={`/placeholder.svg?height=200&width=400&text=Segera+Hadir`}
              alt="Placeholder"
              width={400}
              height={200}
              className="aspect-video object-cover"
            />
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Segera Hadir</h3>
              <p className="text-muted-foreground">Artikel baru akan ditampilkan di sini.</p>
            </CardContent>
            <CardFooter className="border-t p-6 pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="text-sm text-muted-foreground">Oleh Admin</div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden flex flex-col">
          <div className="aspect-video overflow-hidden">
            <Image
              src={getImageUrl(post.image_url) || "/placeholder.svg"}
              alt={post.title}
              width={400}
              height={200}
              className="aspect-video object-cover transition-transform hover:scale-105"
            />
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">{formatDate(post.created_at)}</span>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{post.category}</span>
            </div>
            <h3 className="mb-2 text-xl font-bold line-clamp-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h3>
            <p className="text-muted-foreground line-clamp-3">{post.excerpt || "Tidak ada ringkasan."}</p>
          </CardContent>
          <CardFooter className="border-t p-6 pt-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Oleh <PostAuthor authorId={post.author_id} />
              </div>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href={`/blog/${post.slug}`}>
                  Baca <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

