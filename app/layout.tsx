import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BrandPulse",
  description: "Monitor and analyze your employer brand performance",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        {children}
      </body>
    </html>
  )
}

