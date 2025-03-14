"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
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

const categoryMap: Record<string, string> = {
  "penyakit-serius": "Penyakit Serius",
  "penyakit-ringan": "Penyakit Ringan",
  "penyakit-parah": "Penyakit Parah",
  "kesehatan-mental": "Kesehatan Mental",
}

const categoryDescriptions: Record<string, string> = {
  "penyakit-serius": "Informasi tentang penyakit-penyakit serius yang memerlukan penanganan medis segera",
  "penyakit-ringan": "Informasi tentang penyakit ringan yang umumnya dapat sembuh dengan perawatan di rumah",
  "penyakit-parah": "Informasi tentang penyakit parah yang memerlukan perawatan intensif",
  "kesehatan-mental": "Informasi tentang kesehatan mental dan cara menjaganya",
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { supabase } = useSupabase()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categoryName = categoryMap[slug] || "Kategori Tidak Ditemukan"
  const categoryDescription = categoryDescriptions[slug] || ""

  useEffect(() => {
    const fetchPosts = async () => {
      if (!categoryMap[slug]) {
        setError("Kategori tidak ditemukan")
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, excerpt, image_url, created_at, slug, author_id, category")
          .eq("category", categoryMap[slug])
          .eq("published", true)
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        setPosts(data as Post[])
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError("Gagal memuat artikel")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [supabase, slug])

  if (error) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Kategori Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-6">Kategori yang Anda cari tidak tersedia.</p>
          <Button asChild>
            <Link href="/kategori">Lihat Semua Kategori</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/kategori" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Semua Kategori
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">{categoryName}</h1>
        <p className="mt-2 text-muted-foreground">{categoryDescription}</p>
      </div>

      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Tidak ada artikel ditemukan</h2>
          <p className="text-muted-foreground mb-6">Belum ada artikel dalam kategori ini.</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}

