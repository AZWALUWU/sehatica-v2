"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseAuth } from "@/lib/supabase/auth-provider"

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const { id } = params
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useSupabaseAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (user) {
      setIsAdmin(user?.email === "admin@example.com")
    } else {
      setIsAdmin(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setShouldRedirect(true)
    } else if (!isAdmin) {
      setShouldRedirect(true)
    } else {
      setShouldRedirect(false)
    }
  }, [user, isAdmin])

  useEffect(() => {
    if (shouldRedirect) {
      if (!user) {
        router.push("/login")
      } else {
        router.push("/blog")
      }
    }
  }, [shouldRedirect, router, user])

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // In production, this would fetch from the Flask API
        // const response = await fetch(`http://localhost:5000/api/blog/${id}`)
        // const data = await response.json()

        // Mock API response
        await new Promise((resolve) => setTimeout(resolve, 500))
        const data = {
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
          category: "Health Tips",
        }

        setTitle(data.title)
        setContent(data.content)
        setCategory(data.category)
      } catch (error) {
        console.error("Error fetching blog post:", error)
        toast({
          title: "Error",
          description: "Failed to load blog post. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (!shouldRedirect) {
      fetchBlogPost()
    }
  }, [id, toast, shouldRedirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In production, this would make a PUT request to the Flask API
      // const response = await fetch(`http://localhost:5000/api/blog/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     title,
      //     content,
      //     category,
      //   }),
      // })

      // Mock successful API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      })

      router.push(`/blog/${id}`)
    } catch (error) {
      console.error("Error updating blog post:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (shouldRedirect) {
    return null
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">Edit Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Health Tips">Health Tips</SelectItem>
                <SelectItem value="First Aid">First Aid</SelectItem>
                <SelectItem value="Mental Health">Mental Health</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[300px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push(`/blog/${id}`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

