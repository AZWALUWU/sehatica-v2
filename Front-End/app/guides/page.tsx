import type { Metadata } from "next"
import Image from "next/image"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Lorem Ipsum Guides",
  description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lorem Ipsum Guides</h1>
          <p className="text-muted-foreground">Consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input type="search" placeholder="Lorem ipsum..." className="pl-8 pr-4" />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Dolor</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Consectetur</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Lorem Ipsum
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Dolor Sit
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Amet Consectetur
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Adipiscing Elit
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Sed Do Eiusmod
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Adipiscing</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Tempor Incididunt
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Ut Labore
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Et Dolore
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Magna Aliqua
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Eiusmod</h3>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Tempor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Incididunt</SelectItem>
                <SelectItem value="easy">Ut Labore</SelectItem>
                <SelectItem value="moderate">Et Dolore</SelectItem>
                <SelectItem value="difficult">Magna Aliqua</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-[3/2] relative">
                  <Image
                    src={`/placeholder.svg?height=200&width=300&text=Guide ${i + 1}`}
                    alt={`Lorem Ipsum ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {i % 3 === 0 ? "Tempor" : i % 3 === 1 ? "Incididunt" : "Ut Labore"}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-2">Lorem Ipsum Dolor Sit Amet {i + 1}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
                <span>{10 + i * 5} min</span>
                <div className="flex items-center gap-2">
                  <span>{1000 + i * 234} views</span>
                  <span>•</span>
                  <span>{50 + i * 12} likes</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

