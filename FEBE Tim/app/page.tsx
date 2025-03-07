import { Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeaturedGuides } from "@/components/featured-guides"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Sehatica Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Your Health, Our Priority</h1>
          <div className="w-full max-w-md mx-auto relative">
            <Input
              type="search"
              placeholder="Search health topics..."
              className="pl-10 pr-4 py-6 rounded-lg text-black"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
          <p className="mt-2 text-center">or</p>
          <Button variant="outline" className="mt-2 bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30">
            Browse Topics
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Empowering Your Health Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover expert advice, latest health trends, and personalized insights to help you live your best life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-lg overflow-hidden shadow-md">
            <div className="aspect-video relative">
              <Image src="/placeholder.svg?height=200&width=400" alt="Expert Advice" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Expert Advice</h3>
              <p className="text-muted-foreground">Get insights from leading health professionals on various topics.</p>
            </div>
          </div>

          <div className="bg-card rounded-lg overflow-hidden shadow-md">
            <div className="aspect-video relative">
              <Image src="/placeholder.svg?height=200&width=400" alt="Health Trends" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Health Trends</h3>
              <p className="text-muted-foreground">Stay updated with the latest developments in health and wellness.</p>
            </div>
          </div>

          <div className="bg-card rounded-lg overflow-hidden shadow-md">
            <div className="aspect-video relative">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Personalized Insights"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Personalized Insights</h3>
              <p className="text-muted-foreground">Receive tailored health recommendations based on your profile.</p>
            </div>
          </div>
        </div>

        <FeaturedGuides />
      </div>
    </div>
  )
}

