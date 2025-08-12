'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
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
import { Badge } from './ui/badge'
import { CheckCircle } from 'lucide-react'

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
             <div className="relative">
                <Avatar>
                  <AvatarImage src="https://placehold.co/32x32.png" alt="User Avatar" data-ai-hint="person avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className="absolute -bottom-1 -right-2 p-0.5 border-2 border-background">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                </Badge>
             </div>
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
