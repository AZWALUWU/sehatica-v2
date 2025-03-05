import { BreadcrumbPage } from "@/components/ui/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Clock, ThumbsUp, ThumbsDown, Share2, Printer, Eye, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GuidePage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Lorem</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/guides">Ipsum Guides</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/dolor-sit">Dolor Sit</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Lorem Ipsum Dolor Sit Amet Guide</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">Lorem Ipsum Dolor Sit Amet Guide</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>30 min</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>3,456 views</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={16} />
              <span>24 comments</span>
            </div>
            <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">Tempor</div>
          </div>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image src="/placeholder.svg?height=400&width=800" alt="Guide cover" fill className="object-cover" />
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button variant="outline" size="sm" className="gap-2">
              <ThumbsUp size={16} />
              <span>Helpful (245)</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <ThumbsDown size={16} />
              <span>Not Helpful (12)</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 size={16} />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Printer size={16} />
              <span>Print</span>
            </Button>
          </div>

          <Tabs defaultValue="guide">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guide">Lorem Guide</TabsTrigger>
              <TabsTrigger value="comments">Ipsum Comments (24)</TabsTrigger>
            </TabsList>
            <TabsContent value="guide" className="pt-6">
              <div className="prose max-w-none">
                <h2>Lorem Ipsum</h2>
                <p>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>

                <h3>Step 1: Dolor Sit Amet</h3>
                <div className="aspect-video relative rounded-lg overflow-hidden my-4">
                  <Image
                    src="/placeholder.svg?height=300&width=600&text=Step 1"
                    alt="Step 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
                <ul>
                  <li>Lorem ipsum dolor sit amet</li>
                  <li>Consectetur adipiscing elit</li>
                  <li>Sed do eiusmod tempor incididunt</li>
                </ul>

                <h3>Step 2: Consectetur Adipiscing</h3>
                <div className="aspect-video relative rounded-lg overflow-hidden my-4">
                  <Image
                    src="/placeholder.svg?height=300&width=600&text=Step 2"
                    alt="Step 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                  <p className="font-medium">Tempor Incididunt</p>
                  <p className="text-sm">
                    Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <h3>Step 3: Elit Sed Do</h3>
                <div className="aspect-video relative rounded-lg overflow-hidden my-4">
                  <Image
                    src="/placeholder.svg?height=300&width=600&text=Step 3"
                    alt="Step 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="pt-6">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Comments will be loaded from Supabase.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-medium mb-4">Dolor Sit Tools</h3>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={`/placeholder.svg?height=64&width=64&text=Tool ${i + 1}`}
                      alt={`Tool ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Lorem Ipsum Tool {i + 1}</h4>
                    <p className="text-sm text-muted-foreground mb-1">$19.99</p>
                    <Button size="sm" variant="outline">
                      Dolor Sit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-medium mb-4">Amet Consectetur</h3>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Link key={i} href={`/guide/lorem-ipsum-${i + 1}`} className="flex gap-3 group">
                  <div className="w-16 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={`/placeholder.svg?height=48&width=64&text=Guide ${i + 1}`}
                      alt={`Guide ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                      Lorem Ipsum Dolor Sit Amet {i + 1}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {10 + i * 5} min • {1000 + i * 234} views
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

