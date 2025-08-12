import { BookText } from "lucide-react";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function LibraryPage() {
  return (
     <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
            <BookText className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-2xl font-bold tracking-tight">Library</h1>
            <p className="text-muted-foreground">Your saved tips and chats will appear here. This feature is coming soon!</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
