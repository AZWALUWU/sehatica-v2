"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Filter } from "lucide-react"
import { useSupabase } from "@/lib/supabase/supabase-provider"
import { formatDate, getImageUrl } from "@/lib/utils"
import PostAuthor from "@/components/post-author"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function BlogPage() {
  const searchParams = useSearchParams()
  const { supabase } = useSupabase()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "semua")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let query = supabase
          .from("posts")
          .select("id, title, excerpt, image_url, created_at, slug, author_id, category")
          .eq("published", true)
          .order("created_at", { ascending: false })

        if (categoryFilter && categoryFilter !== "semua") {
          query = query.eq("category", categoryFilter)
        }

        if (searchTerm) {
          query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
        }

        const { data, error } = await query

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
  }, [supabase, searchTerm, categoryFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Blog Sehatica</h1>
        <p className="mt-2 text-muted-foreground">Artikel dan informasi kesehatan terbaru dari tim Sehatica</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari artikel..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Kategori</SelectItem>
              <SelectItem value="Penyakit Serius">Penyakit Serius</SelectItem>
              <SelectItem value="Penyakit Ringan">Penyakit Ringan</SelectItem>
              <SelectItem value="Penyakit Parah">Penyakit Parah</SelectItem>
              <SelectItem value="Kesehatan Mental">Kesehatan Mental</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
          <p className="text-muted-foreground mb-6">
            {searchTerm || categoryFilter !== "semua"
              ? `Tidak ada artikel yang sesuai dengan pencarian Anda. Coba kata kunci atau kategori lain.`
              : "Belum ada artikel yang dipublikasikan."}
          </p>
          {(searchTerm || categoryFilter !== "semua") && (
            <Button
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("semua")
              }}
            >
              Reset Pencarian
            </Button>
          )}
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

