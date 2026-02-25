'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Logo } from './icons/logo'

export function Header() {
  const pathname = usePathname()
  const getTitle = () => {
    if (pathname.startsWith('/chat')) return 'Chat'
    if (pathname.startsWith('/scan-url')) return 'URL Scanner'
    if (pathname.startsWith('/password-strength')) return 'Password Strength'
    if (pathname.startsWith('/library')) return 'Library'
    if (pathname.startsWith('/search')) return 'Search'
    if (pathname.startsWith('/settings')) return 'Profile & Security'
    return 'Home'
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-white/5 px-4 backdrop-blur-xl bg-background/50 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{getTitle()}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-105">
            <Logo className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass border-white/10 rounded-xl p-2 min-w-[200px]">
          <DropdownMenuLabel className="font-bold text-white/90 px-3 py-2">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10 my-1" />
          <DropdownMenuItem asChild className="rounded-lg px-3 py-2 focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer">
            <Link href="/settings" className="flex items-center w-full">Profile & Security</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg px-3 py-2 focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer">Support</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10 my-1" />
          <DropdownMenuItem className="rounded-lg px-3 py-2 focus:bg-red-500/20 focus:text-red-400 transition-colors cursor-pointer text-red-400">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
