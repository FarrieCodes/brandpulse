"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Users, FileText, Settings } from "lucide-react"
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
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Acme Inc</span>
            <span className="text-xs text-muted-foreground">Enterprise Plan</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

