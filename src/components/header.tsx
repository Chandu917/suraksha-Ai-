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
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{getTitle()}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Logo className="w-8 h-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/settings">Profile & Security</Link></DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
