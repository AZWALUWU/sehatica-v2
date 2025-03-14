"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useSupabase } from "@/lib/supabase/supabase-provider"
import { useToast } from "@/hooks/use-toast"
import { slugify } from "@/lib/utils"
import { Loader2, X } from "lucide-react"
import dynamic from "next/dynamic"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dynamically import the editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md p-4 w-full min-h-[200px] flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
})

type Post = {
  id: string
  title: string
  content: string
  excerpt: string | null
  slug: string
  published: boolean
  image_url: string | null
  category: string
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { supabase, user, profile, isLoading: authLoading } = useSupabase()
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("")
  const [published, setPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [keepExistingImage, setKeepExistingImage] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is admin
  useEffect(() => {
    if (!authLoading && (!user || (profile && profile.role !== "admin"))) {
      router.push("/")
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk mengakses halaman ini.",
        variant: "destructive",
      })
    }
  }, [user, profile, authLoading, router, toast])

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()

        if (error) {
          throw error
        }

        setPost(data as Post)
        setTitle(data.title)
        setContent(data.content)
        setExcerpt(data.excerpt || "")
        setSlug(data.slug)
        setCategory(data.category || "")
        setPublished(data.published)

        if (data.image_url) {
          setImagePreview(data.image_url)
        }
      } catch (error) {
        console.error("Error fetching post:", error)
        toast({
          title: "Error",
          description: "Gagal memuat artikel. Silakan coba lagi.",
          variant: "destructive",
        })
        router.push("/admin/posts")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchPost()
    }
  }, [id, supabase, user, router, toast])

  // Generate slug from title if title changes and slug is empty
  useEffect(() => {
    if (title && !slug) {
      setSlug(slugify(title))
    }
  }, [title, slug])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Tipe file tidak valid",
        description: "Silakan unggah file gambar.",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran gambar harus kurang dari 5MB.",
        variant: "destructive",
      })
      return
    }

    setImage(file)
    setKeepExistingImage(false)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
    setKeepExistingImage(false)
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!image || !user) return null

    setImageUploading(true)
    try {
      const fileExt = image.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `posts/${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage.from("blog-images").upload(filePath, image)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      throw error
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content || !slug || !category) {
      toast({
        title: "Kolom wajib kosong",
        description: "Silakan isi semua kolom yang diperlukan.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      let imageUrl = keepExistingImage ? post?.image_url : null

      // Upload new image if exists
      if (image) {
        imageUrl = await uploadImage()
      }

      // Update post
      const { error } = await supabase
        .from("posts")
        .update({
          title,
          content,
          excerpt: excerpt || null,
          slug,
          published,
          image_url: imageUrl,
          category,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) {
        throw error
      }

      toast({
        title: "Berhasil",
        description: "Artikel berhasil diperbarui.",
      })

      router.push("/admin/posts")
    } catch (error: any) {
      console.error("Error updating post:", error)
      toast({
        title: "Error",
        description: error.message || "Gagal memperbarui artikel. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!user || (profile && profile.role !== "admin")) {
    return null // Will redirect in useEffect
  }

  if (!post) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">Artikel yang Anda coba edit tidak ada atau telah dihapus.</p>
        <Button asChild>
          <Link href="/admin/posts">Kembali ke Artikel</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Artikel</h1>
          <Button variant="outline" asChild>
            <Link href="/admin/posts">Batal</Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul artikel"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-artikel"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Penyakit Serius">Penyakit Serius</SelectItem>
                <SelectItem value="Penyakit Ringan">Penyakit Ringan</SelectItem>
                <SelectItem value="Penyakit Parah">Penyakit Parah</SelectItem>
                <SelectItem value="Kesehatan Mental">Kesehatan Mental</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Ringkasan (opsional)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan singkat dari artikel"
              className="resize-none h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Gambar Utama</Label>
            <div className="mt-1">
              {imagePreview ? (
                <div className="relative mb-4">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={600}
                    height={300}
                    className="rounded-md object-cover w-full h-[300px]"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published">Publikasikan</Label>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting || imageUploading} className="flex items-center gap-2">
              {(isSubmitting || imageUploading) && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

