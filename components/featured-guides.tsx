import Link from "next/link"
import Image from "next/image"
import { Clock, ThumbsUp, Eye } from "lucide-react"

const featuredPosts = [
  {
    id: 1,
    title: "10 Tips for a Healthy Lifestyle",
    slug: "healthy-lifestyle-tips",
    image_url: "/placeholder.svg?height=200&width=300",
    category: "Wellness",
    read_time: "5 min",
    views: 1234,
    likes: 98,
  },
  {
    id: 2,
    title: "Understanding Mental Health",
    slug: "understanding-mental-health",
    image_url: "/placeholder.svg?height=200&width=300",
    category: "Mental Health",
    read_time: "8 min",
    views: 2345,
    likes: 156,
  },
  {
    id: 3,
    title: "The Importance of Regular Exercise",
    slug: "importance-of-exercise",
    image_url: "/placeholder.svg?height=200&width=300",
    category: "Fitness",
    read_time: "6 min",
    views: 3456,
    likes: 210,
  },
  {
    id: 4,
    title: "Nutrition Myths Debunked",
    slug: "nutrition-myths-debunked",
    image_url: "/placeholder.svg?height=200&width=300",
    category: "Nutrition",
    read_time: "7 min",
    views: 4567,
    likes: 321,
  },
]

export function FeaturedGuides() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Health Articles</h2>
        <Link href="/blog" className="text-primary hover:underline">
          View All Articles →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[3/2] relative">
                <Image
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-2 gap-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.read_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

