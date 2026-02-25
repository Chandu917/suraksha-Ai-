
'use client'

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  Search,
  Settings,
  Power,
  BarChart,
  Globe,
  Lock,
  Link2,
  KeyRound,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'



export function AppSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-white/10 glass">
      <SidebarHeader className="border-b border-white/10 p-6">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">
            Suraksha<span className="text-primary italic-none not-italic">AI</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarMenu className="flex-1 px-3 py-6 gap-1">
        {[
          { href: '/chat', label: 'AI Chat', icon: MessageSquare },
          { href: '/scan-url', label: 'URL Scanner', icon: Link2 },
          { href: '/password-strength', label: 'Password Strength', icon: KeyRound },
          { href: '/reports', label: 'Reports', icon: BarChart },
        ].map(item => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
                className="h-10 rounded-lg transition-all duration-200 hover:bg-white/5 hover:text-white data-[active=true]:bg-primary/10 data-[active=true]:text-primary border border-transparent data-[active=true]:border-primary/20"
              >
                <item.icon className="size-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}

      </SidebarMenu>

      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/settings" className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
            <Settings className="size-4" />
            <span>Settings</span>
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/20 transition-all"
            title="Logout"
            onClick={logout}
          >
            <Power className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
