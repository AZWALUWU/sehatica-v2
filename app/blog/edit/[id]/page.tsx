"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { isAdmin } = useAuth()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog?id=${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch blog post")
        }
        const post = await response.json()
        setTitle(post.title)
        setContent(post.content)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch blog post.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [params.id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to edit blog posts.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/blog?id=${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update blog post")
      }

      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      })
      router.push("/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to delete blog posts.",
        variant: "destructive",
      })
      return
    }

    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/blog?id=${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete blog post")
      }

      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      })
      router.push("/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Unauthorized</h1>
        <p>You don't have permission to edit blog posts.</p>
        <Button className="mt-4" onClick={() => router.push("/blog")}>
          Back to Blog
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required rows={10} />
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Post"}
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? "Deleting..." : "Delete Post"}
          </Button>
        </div>
      </form>
    </div>
  )
}

