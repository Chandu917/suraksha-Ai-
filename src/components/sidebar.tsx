
'use client'

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/icons/logo'
import {
  Home,
  BookText,
  Search,
  Settings,
  LogOut,
  LogIn,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

const menuItems = [
  { href: '/', label: 'Chat', icon: Home },
  { href: '/library', label: 'Library', icon: BookText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isLoggedIn = true // Placeholder for authentication state

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0" asChild>
            <span className="flex items-center justify-center">
              <Logo className="size-5 text-primary" />
            </span>
          </Button>
          <span className="text-lg font-semibold">SurakshaAI</span>
        </Link>
      </SidebarHeader>

      <SidebarMenu className="flex-1">
        {menuItems.map(item => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter>
        <SidebarMenuItem>
          <Link href="#">
            <SidebarMenuButton tooltip={isLoggedIn ? 'Logout' : 'Login'}>
              {isLoggedIn ? <LogOut /> : <LogIn />}
              <span>{isLoggedIn ? 'Logout' : 'Login'}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
