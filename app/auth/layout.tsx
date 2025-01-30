import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-center pt-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
            BrandPulse
          </div>
        </div>
        {children}
      </div>
    </div>
  )
} 