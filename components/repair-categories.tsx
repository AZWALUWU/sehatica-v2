import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: 1, name: "Lorem Ipsum", slug: "lorem-ipsum", image_url: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Dolor Sit", slug: "dolor-sit", image_url: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Amet Consectetur", slug: "amet-consectetur", image_url: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Adipiscing Elit", slug: "adipiscing-elit", image_url: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Sed Do Eiusmod", slug: "sed-do-eiusmod", image_url: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Tempor Incididunt", slug: "tempor-incididunt", image_url: "/placeholder.svg?height=100&width=100" },
]

export function RepairCategories() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Consectetur Adipiscing Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`} className="flex flex-col items-center group">
            <div className="relative w-24 h-24 mb-2 rounded-full overflow-hidden border-2 border-muted group-hover:border-primary transition-colors">
              <Image src={category.image_url || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
            </div>
            <span className="text-sm text-center group-hover:text-primary transition-colors">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

