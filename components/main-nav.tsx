"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart3, Users, FileText, Settings, LogOut } from "lucide-react"
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true)
      await signOut(auth)
      // Clear any stored company data
      localStorage.removeItem('selectedCompanyId')
      router.push('/auth/signin')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Sidebar className="bg-card border-r border-border">
      <SidebarHeader className="border-b border-border px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent-cyan" />
          <span className="font-semibold text-text-primary">BrandPulse</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"} className="hover:bg-background">
              <Link href="/">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/vacancy"} className="hover:bg-background">
              <Link href="/vacancy">
                <FileText className="h-4 w-4" />
                <span>Vacancies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/competitors"} className="hover:bg-background">
              <Link href="/competitors">
                <Users className="h-4 w-4" />
                <span>Competitors</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/settings")} className="hover:bg-background">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Acme Inc</span>
              <span className="text-xs text-muted-foreground">Enterprise Plan</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="p-2 hover:bg-background rounded-md transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

