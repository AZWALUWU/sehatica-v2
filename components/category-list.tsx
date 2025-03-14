"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSupabase } from "@/lib/supabase/supabase-provider"
import { Card, CardContent } from "@/components/ui/card"

type Category = {
  name: string
  slug: string
  description: string
  icon: string
}

const categories: Category[] = [
  {
    name: "Penyakit Serius",
    slug: "penyakit-serius",
    description: "Informasi tentang penyakit-penyakit serius yang memerlukan penanganan medis segera",
    icon: "🏥",
  },
  {
    name: "Penyakit Ringan",
    slug: "penyakit-ringan",
    description: "Informasi tentang penyakit ringan yang umumnya dapat sembuh dengan perawatan di rumah",
    icon: "🤒",
  },
  {
    name: "Penyakit Parah",
    slug: "penyakit-parah",
    description: "Informasi tentang penyakit parah yang memerlukan perawatan intensif",
    icon: "⚠️",
  },
  {
    name: "Kesehatan Mental",
    slug: "kesehatan-mental",
    description: "Informasi tentang kesehatan mental dan cara menjaganya",
    icon: "🧠",
  },
]

export default function CategoryList() {
  const { supabase } = useSupabase()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const countData: Record<string, number> = {}

        for (const category of categories) {
          const { count, error } = await supabase
            .from("posts")
            .select("id", { count: "exact", head: true })
            .eq("category", category.name)
            .eq("published", true)

          if (error) {
            throw error
          }

          countData[category.slug] = count || 0
        }

        setCounts(countData)
      } catch (error) {
        console.error("Error fetching category counts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryCounts()
  }, [supabase])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link key={category.slug} href={`/kategori/${category.slug}`}>
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{category.description}</p>
              <div className="text-sm text-primary font-medium">
                {isLoading ? (
                  <span className="animate-pulse">Memuat...</span>
                ) : (
                  <span>{counts[category.slug] || 0} artikel</span>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

