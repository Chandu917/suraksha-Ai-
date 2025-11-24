
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
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="border-b border-border/40 p-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Logo className="size-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">SurakshaAI</span>
        </Link>
      </SidebarHeader>

      <SidebarMenu className="flex-1 px-2 py-4 gap-1">
        {menuItems.map(item => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
                className="h-10 rounded-md transition-all hover:bg-muted/80 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium"
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter className="border-t border-border/40 p-2">
        <SidebarMenuItem>
          <Link href="/settings">
            <SidebarMenuButton
              isActive={pathname.startsWith('/settings')}
              tooltip={'Profile & Security'}
              className="h-10 rounded-md hover:bg-muted/80"
            >
              <Settings className="size-4" />
              <span>{'Profile & Security'}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="#">
            <SidebarMenuButton tooltip={isLoggedIn ? 'Logout' : 'Login'} className="h-10 rounded-md hover:bg-muted/80">
              {isLoggedIn ? <LogOut className="size-4" /> : <LogIn className="size-4" />}
              <span>{isLoggedIn ? 'Logout' : 'Login'}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
