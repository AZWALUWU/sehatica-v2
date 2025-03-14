import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, BookOpen, MessageSquare, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Tentang Sehatica</h1>
              <p className="mb-6 text-lg md:text-xl">
                Sehatica adalah platform informasi kesehatan terpercaya yang didedikasikan untuk membantu masyarakat
                Indonesia mendeteksi masalah kesehatan dan memberikan solusi pertolongan pertama.
              </p>
              <p className="mb-8 text-lg md:text-xl">
                Kami berkomitmen untuk menyediakan informasi kesehatan yang akurat, terpercaya, dan mudah dipahami oleh
                semua kalangan masyarakat.
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/blog">Jelajahi Artikel Kami</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <Image src="/about-hero.jpg" alt="Tim Sehatica" width={500} height={400} className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Misi Kami</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Misi kami adalah menyediakan informasi kesehatan yang akurat dan terpercaya untuk membantu masyarakat
              Indonesia mendeteksi masalah kesehatan dan memberikan solusi pertolongan pertama. Kami percaya bahwa akses
              terhadap informasi kesehatan yang berkualitas adalah hak setiap orang.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Mendeteksi Masalah Kesehatan</h3>
              <p className="text-muted-foreground">
                Membantu masyarakat mengenali gejala-gejala penyakit dan masalah kesehatan sejak dini untuk penanganan
                yang lebih cepat dan efektif.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Memberikan Solusi Pertolongan Pertama</h3>
              <p className="text-muted-foreground">
                Menyediakan panduan langkah demi langkah untuk pertolongan pertama dan penanganan awal berbagai kondisi
                kesehatan sebelum mendapatkan bantuan medis profesional.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Membangun Komunitas Peduli Kesehatan</h3>
              <p className="text-muted-foreground">
                Menciptakan komunitas yang peduli terhadap kesehatan diri sendiri dan orang lain, serta berbagi
                pengetahuan dan pengalaman untuk saling mendukung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-accent py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Fitur Utama</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <BookOpen className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Panduan Kesehatan Komprehensif</h3>
              <p className="text-muted-foreground">
                Artikel dan panduan lengkap tentang berbagai penyakit, gejala, pengobatan, dan pencegahan yang disusun
                oleh tim medis profesional.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <MessageSquare className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Dukungan Komunitas</h3>
              <p className="text-muted-foreground">
                Forum diskusi untuk berbagi pengalaman dan mendapatkan dukungan dari sesama anggota komunitas dan pakar
                kesehatan.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Lightbulb className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Blog Kesehatan</h3>
              <p className="text-muted-foreground">
                Artikel terbaru tentang tren kesehatan, penelitian medis, dan tips menjaga kesehatan yang ditulis oleh
                pakar di bidangnya.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Shield className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Prosedur Pertolongan Pertama</h3>
              <p className="text-muted-foreground">
                Panduan langkah demi langkah untuk pertolongan pertama dalam situasi darurat dengan ilustrasi dan video
                yang mudah diikuti.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Users className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Akun Pengguna</h3>
              <p className="text-muted-foreground">
                Buat akun untuk menyimpan artikel favorit, mengikuti topik kesehatan tertentu, dan mendapatkan
                rekomendasi konten yang sesuai dengan kebutuhan Anda.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Heart className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Pemantauan Kesehatan</h3>
              <p className="text-muted-foreground">
                Fitur untuk memantau kondisi kesehatan, mencatat gejala, dan melacak perkembangan kesehatan Anda dari
                waktu ke waktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Tim Kami</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <Image
                  src="/team-1.jpg"
                  alt="Dr. Andi Wijaya"
                  width={200}
                  height={200}
                  className="h-48 w-48 object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">Dr. Andi Wijaya</h3>
              <p className="mb-3 text-primary">Dokter Umum</p>
              <p className="text-sm text-muted-foreground">
                Spesialis dalam bidang kedokteran umum dengan pengalaman lebih dari 10 tahun.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <Image
                  src="/team-2.jpg"
                  alt="Dr. Siti Rahayu"
                  width={200}
                  height={200}
                  className="h-48 w-48 object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">Dr. Siti Rahayu</h3>
              <p className="mb-3 text-primary">Ahli Gizi</p>
              <p className="text-sm text-muted-foreground">
                Pakar nutrisi dan gizi dengan fokus pada pola makan sehat untuk pencegahan penyakit.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <Image
                  src="/team-3.jpg"
                  alt="Dr. Budi Santoso"
                  width={200}
                  height={200}
                  className="h-48 w-48 object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">Dr. Budi Santoso</h3>
              <p className="mb-3 text-primary">Psikiater</p>
              <p className="text-sm text-muted-foreground">
                Spesialis kesehatan mental dengan pendekatan holistik untuk kesejahteraan mental.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 overflow-hidden rounded-full">
                <Image
                  src="/team-4.jpg"
                  alt="Dewi Anggraini"
                  width={200}
                  height={200}
                  className="h-48 w-48 object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">Dewi Anggraini</h3>
              <p className="mb-3 text-primary">Perawat</p>
              <p className="text-sm text-muted-foreground">
                Perawat berpengalaman dengan keahlian dalam pertolongan pertama dan perawatan darurat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Bergabunglah dengan Komunitas Kami</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Dapatkan akses ke informasi kesehatan terbaru, panduan pertolongan pertama, dan dukungan dari komunitas
            peduli kesehatan.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/signup">Daftar Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/blog">Jelajahi Artikel</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

