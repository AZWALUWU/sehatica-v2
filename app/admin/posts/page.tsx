"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { useSupabase } from "@/lib/supabase/supabase-provider"
import { formatDate, getImageUrl } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Post = {
  id: string
  title: string
  created_at: string
  updated_at: string
  published: boolean
  slug: string
  image_url: string | null
  category: string
}

export default function AdminPostsPage() {
  const { supabase, user, profile, isLoading: authLoading } = useSupabase()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
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

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return

      try {
        let query = supabase
          .from("posts")
          .select("id, title, created_at, updated_at, published, slug, image_url, category")
          .order("created_at", { ascending: false })

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
        toast({
          title: "Error",
          description: "Gagal memuat artikel. Silakan coba lagi.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [supabase, user, searchTerm, toast])

  const handleDeletePost = async () => {
    if (!postToDelete) return

    try {
      // Delete the post
      const { error } = await supabase.from("posts").delete().eq("id", postToDelete)

      if (error) {
        throw error
      }

      // Remove from local state
      setPosts(posts.filter((post) => post.id !== postToDelete))

      toast({
        title: "Berhasil",
        description: "Artikel berhasil dihapus.",
      })
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus artikel. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setPostToDelete(null)
    }
  }

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("posts").update({ published: !currentStatus }).eq("id", id)

      if (error) {
        throw error
      }

      // Update local state
      setPosts(posts.map((post) => (post.id === id ? { ...post, published: !currentStatus } : post)))

      toast({
        title: "Berhasil",
        description: `Artikel berhasil ${!currentStatus ? "dipublikasikan" : "disembunyikan"}.`,
      })
    } catch (error) {
      console.error("Error updating post status:", error)
      toast({
        title: "Error",
        description: "Gagal mengubah status artikel. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  if (authLoading) {
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

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Kelola Artikel</h1>
          <p className="mt-2 text-muted-foreground">Buat, edit, dan kelola artikel blog Anda</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Artikel Baru
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari artikel..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-md border">
          <div className="h-24 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="ml-2 text-muted-foreground">Memuat artikel...</p>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-md border bg-muted/40 p-8 text-center">
          <h2 className="text-xl font-medium mb-2">Tidak ada artikel ditemukan</h2>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? `Tidak ada artikel yang cocok dengan "${searchTerm}". Coba kata kunci lain.`
              : "Mulai dengan membuat artikel pertama Anda."}
          </p>
          {searchTerm ? (
            <Button onClick={() => setSearchTerm("")}>Hapus Pencarian</Button>
          ) : (
            <Button asChild>
              <Link href="/admin/posts/new">Buat Artikel</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead>Diperbarui</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {post.image_url && (
                        <Image
                          src={getImageUrl(post.image_url) || "/placeholder.svg"}
                          alt={post.title}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded object-cover"
                        />
                      )}
                      <span className="line-clamp-1">{post.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Button
                      variant={post.published ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePublishStatus(post.id, post.published)}
                    >
                      {post.published ? "Dipublikasikan" : "Draft"}
                    </Button>
                  </TableCell>
                  <TableCell>{formatDate(post.created_at)}</TableCell>
                  <TableCell>{formatDate(post.updated_at)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Aksi
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" /> Lihat
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/posts/${post.id}/edit`} className="flex items-center gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => setPostToDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-destructive text-destructive-foreground">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

