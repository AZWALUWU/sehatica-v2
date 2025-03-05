"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/blog?id=${params.id}`)
      if (response.ok) {
        const post = await response.json()
        setTitle(post.title)
        setContent(post.content)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch blog post.",
          variant: "destructive",
        })
      }
    }
    fetchPost()
  }, [params.id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/blog?id=${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      })
      router.push("/blog")
    } else {
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const response = await fetch(`/api/blog?id=${params.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully.",
        })
        router.push("/blog")
      } else {
        toast({
          title: "Error",
          description: "Failed to delete blog post. Please try again.",
          variant: "destructive",
        })
      }
    }
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
          <Button type="submit">Update Post</Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete Post
          </Button>
        </div>
      </form>
    </div>
  )
}

