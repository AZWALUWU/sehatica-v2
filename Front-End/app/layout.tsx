import type React from "react"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/Front-End/components/common/site-header"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/Front-End/components/auth/auth-provider"
import { AnalyticsTracker } from "@/Front-End/components/auth/analytics-tracker"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sehatica - Your Health Companion",
  description:
    "Discover expert advice, latest health trends, and personalized insights to help you live your best life.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2023 Sehatica. Your Health Companion.
                </p>
              </div>
            </footer>
          </div>
          <AnalyticsTracker />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}

