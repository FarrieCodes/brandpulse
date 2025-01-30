import "./globals.css"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground")}>
        <SidebarProvider>
          <MainNav />
          <SidebarInset className="bg-background">{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}

