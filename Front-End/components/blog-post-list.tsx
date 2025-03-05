import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type BlogPost = {
  id: number
  title: string
  content: string
  created_at: string
}

export function BlogPostList({ posts, isAdmin }: { posts: BlogPost[]; isAdmin: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/blog/${post.id}`}>
              <Button variant="outline">Read More</Button>
            </Link>
            {isAdmin && (
              <Link href={`/blog/edit/${post.id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

