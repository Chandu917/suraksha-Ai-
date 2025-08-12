
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
  MessageSquare,
  BookText,
  Search,
  Settings,
  LogOut,
  LogIn,
  Home,
  BotMessageSquare,
  Link2,
  KeyRound,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

const menuItems = [
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/scan-url', label: 'URL Scanner', icon: Link2 },
  { href: '/password-strength', label: 'Password Strength', icon: KeyRound },
  { href: '/library', label: 'Library', icon: BookText },
  { href: '/search', label: 'Search', icon: Search },
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
              <Logo className="size-6 text-primary" />
            </span>
          </Button>
          <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">SurakshaAI</span>
        </Link>
      </SidebarHeader>

      <SidebarMenu className="flex-1">
        {menuItems.map(item => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
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
            <Link href="/settings">
              <SidebarMenuButton
                isActive={pathname.startsWith('/settings')}
                tooltip={'Profile & Security'}
              >
                <Settings />
                <span>{'Profile & Security'}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
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
