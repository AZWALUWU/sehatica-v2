import CategoryList from "@/components/category-list"

export default function CategoriesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Kategori</h1>
        <p className="mt-2 text-muted-foreground">Jelajahi artikel berdasarkan kategori penyakit</p>
      </div>

      <CategoryList />
    </div>
  )
}

