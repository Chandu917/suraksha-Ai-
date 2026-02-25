'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { type SavedItem } from '@/lib/types'
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/sidebar"
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import {
  BookText,
  Trash2,
  Shield,
  User,
  Search,
  Filter,
  Clock,
  Zap,
  Bookmark,
  Share2
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Logo } from '@/components/icons/logo'
import { cn } from '@/lib/utils'

export default function LibraryPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      try {
        const items = JSON.parse(localStorage.getItem('suraksha-library-items') || '[]')
        setSavedItems(items)
      } catch (error) {
        console.error('Failed to parse library items from localStorage', error)
      }
    }
  }, [])

  const removeItem = (id: string) => {
    const updatedItems = savedItems.filter(item => item.id !== id)
    setSavedItems(updatedItems)
    if (typeof window !== 'undefined') {
      localStorage.setItem('suraksha-library-items', JSON.stringify(updatedItems))
    }
  }

  const clearAllItems = () => {
    setSavedItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('suraksha-library-items')
    }
  }

  const filteredItems = savedItems.filter(item =>
    item.message.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isClient) return null

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header />
        <main className="p-6 space-y-12 animate-in fade-in duration-700 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Intelligence Library</h1>
              <p className="text-white/40 font-medium uppercase text-[10px] tracking-[0.2em]">Archived Security Protocols & Neural Responses</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  placeholder="Filter protocols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 glass border-white/5 rounded-xl text-xs font-bold text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-all"
                />
              </div>
              {savedItems.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="h-10 px-4 rounded-xl glass border-red-500/10 text-red-500 hover:bg-red-500/10 hover:text-red-500 text-xs font-black uppercase tracking-widest">
                      Purge All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">INITIATE DATA PURGE?</AlertDialogTitle>
                      <AlertDialogDescription className="text-white/50">
                        This action will permanently delete all archived security protocols. This cannot be reversed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="glass border-white/10 text-white hover:bg-white/5">ABORT</AlertDialogCancel>
                      <AlertDialogAction onClick={clearAllItems} className="bg-red-500 hover:bg-red-600 border-none text-white font-black">CONFIRM PURGE</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Archived Logs", value: savedItems.length, icon: Bookmark, color: "text-primary" },
              { label: "Threat Insights", value: savedItems.filter(i => i.message.threatData).length, icon: Shield, color: "text-secondary" },
              { label: "Stored Bitrate", value: `${(JSON.stringify(savedItems).length / 1024).toFixed(1)} KB`, icon: Zap, color: "text-orange-500" },
              { label: "Storage Health", value: "Optimal", icon: Clock, color: "text-green-500" },
            ].map((stat, idx) => (
              <div key={idx} className="glass border-white/5 p-6 rounded-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {savedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 py-32 text-center glass-card border-white/5 border-dashed">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                <BookText className="h-16 w-16 text-primary relative" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Archives Offline</h2>
                <p className="text-white/40 max-w-sm mx-auto font-medium text-sm leading-relaxed">
                  No security protocols have been archived yet. Go to the Neural Chat to save intelligence responses.
                </p>
              </div>
              <Button className="cyber-button neon-glow border-none" onClick={() => window.location.href = '/chat'}>
                Initialize Neural Core
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map(item => (
                <div key={item.id} className="glass-card !p-0 border-white/5 flex flex-col group hover:border-primary/20 transition-all duration-500">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg glass border-white/10", item.message.role === 'assistant' ? 'text-primary' : 'text-secondary')}>
                        {item.message.role === 'assistant' ? <Logo className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">
                        {item.message.role === 'assistant' ? 'SURAKSHAAI' : 'AUTHORIZED USER'}
                      </span>
                    </div>
                    <Button variant="ghost" className="h-2 w-2 rounded-full text-white/20 hover:text-white" onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="p-6 flex-1">
                    <p className="text-sm font-medium text-white/70 leading-relaxed line-clamp-6">
                      {item.message.content}
                    </p>
                    {item.message.threatData && (
                      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">High Value Threat Intel</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(item.savedAt), { addSuffix: true })}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg glass border-white/10 text-white/30 hover:text-white hover:border-primary/30 transition-all">
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
