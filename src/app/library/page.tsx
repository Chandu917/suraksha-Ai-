'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { type SavedItem } from '@/lib/types'
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/sidebar"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { BookText, Trash2, Shield, User } from "lucide-react"
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

export default function LibraryPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    try {
      const items = JSON.parse(localStorage.getItem('suraksha-library-items') || '[]')
      setSavedItems(items)
    } catch (error) {
      console.error("Failed to parse library items from localStorage", error)
    }
  }, [])

  const removeItem = (id: string) => {
    const updatedItems = savedItems.filter(item => item.id !== id)
    setSavedItems(updatedItems)
    localStorage.setItem('suraksha-library-items', JSON.stringify(updatedItems))
  }
  
  const clearAllItems = () => {
    setSavedItems([])
    localStorage.removeItem('suraksha-library-items')
  }

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">Library</h1>
                <p className="text-muted-foreground">Your saved tips and chats appear here.</p>
              </div>
              {savedItems.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Clear All
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your saved items from the library.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearAllItems}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            {savedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center border-2 border-dashed rounded-lg">
                <BookText className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-xl font-bold tracking-tight">Your Library is Empty</h2>
                <p className="text-muted-foreground">
                  Go to the chat and click the bookmark icon on any message to save it here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedItems.map(item => (
                  <Card key={item.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {item.message.role === 'assistant' ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        <span>{item.message.role === 'assistant' ? 'SurakshaAI' : 'You'}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{item.message.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                       <span>Saved {formatDistanceToNow(new Date(item.savedAt), { addSuffix: true })}</span>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to remove this item from your library? This action cannot be undone.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => removeItem(item.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
