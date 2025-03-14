import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import FeaturedPosts from "@/components/featured-posts"
import CategoryList from "@/components/category-list"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Informasi Kesehatan Terpercaya</h1>
              <p className="mb-6 text-lg md:text-xl">
                Sehatica menyediakan informasi kesehatan yang akurat dan terpercaya untuk membantu Anda menjaga
                kesehatan dan mengatasi berbagai penyakit.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link href="/blog">Baca Artikel</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/kategori">Lihat Kategori</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/hero-image.jpg"
                alt="Sehatica - Informasi Kesehatan"
                width={500}
                height={400}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold text-center">Kategori Penyakit</h2>
          <CategoryList />
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="bg-accent py-16">
        <div className="container">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Artikel Terbaru</h2>
            <Button variant="outline" asChild>
              <Link href="/blog" className="flex items-center gap-1">
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <FeaturedPosts />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Mengapa Sehatica?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19.73 14.87a2.63 2.63 0 0 1-3.72 3.72L12 14.59a1.2 1.2 0 0 0-1.7 0l-2.92 2.92a2.63 2.63 0 1 1-3.72-3.72L7.59 10a1.2 1.2 0 0 0 0-1.7l-4.01-4.01a2.63 2.63 0 0 1 3.72-3.72L11.3 4.58a1.2 1.2 0 0 0 1.7 0l4.01-4.01a2.63 2.63 0 0 1 3.72 3.72L16.72 8.3a1.2 1.2 0 0 0 0 1.7Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Informasi Terpercaya</h3>
              <p className="text-muted-foreground">
                Semua informasi kesehatan di Sehatica ditulis oleh tim medis profesional dan didasarkan pada penelitian
                ilmiah terkini.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Mudah Dipahami</h3>
              <p className="text-muted-foreground">
                Kami menyajikan informasi kesehatan yang kompleks dalam bahasa yang mudah dipahami oleh semua kalangan
                masyarakat.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Selalu Diperbarui</h3>
              <p className="text-muted-foreground">
                Konten kami selalu diperbarui sesuai dengan perkembangan ilmu kedokteran dan penelitian kesehatan
                terbaru.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Jaga Kesehatan Anda Bersama Sehatica</h2>
            <p className="mb-8 text-lg">
              Dapatkan informasi kesehatan terbaru dan tips menjaga kesehatan langsung di email Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/signup">Daftar Sekarang</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/blog">Jelajahi Artikel</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

