import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block font-bold text-xl mb-4 flex items-center gap-2">
              <Image src="/logo.svg" alt="Sehatica Logo" width={32} height={32} className="h-8 w-8" />
              <span>SEHATICA</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Platform informasi kesehatan terpercaya untuk masyarakat Indonesia. Kami menyediakan informasi kesehatan
              yang akurat dan terpercaya.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/kategori/penyakit-serius" className="text-muted-foreground hover:text-primary">
                  Penyakit Serius
                </Link>
              </li>
              <li>
                <Link href="/kategori/penyakit-ringan" className="text-muted-foreground hover:text-primary">
                  Penyakit Ringan
                </Link>
              </li>
              <li>
                <Link href="/kategori/penyakit-parah" className="text-muted-foreground hover:text-primary">
                  Penyakit Parah
                </Link>
              </li>
              <li>
                <Link href="/kategori/kesehatan-mental" className="text-muted-foreground hover:text-primary">
                  Kesehatan Mental
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-muted-foreground hover:text-primary">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-muted-foreground hover:text-primary">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Email: info@sehatica.id</li>
              <li className="text-muted-foreground">Telepon: +62 21 1234 5678</li>
              <li className="text-muted-foreground">Alamat: Jl. Kesehatan No. 123, Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sehatica. Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/syarat-ketentuan" className="hover:text-primary">
              Syarat & Ketentuan
            </Link>
            <Link href="/kebijakan-privasi" className="hover:text-primary">
              Kebijakan Privasi
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

