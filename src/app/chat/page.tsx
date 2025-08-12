import { ChatPanel } from '@/components/chat/chat-panel'
import { Header } from '@/components/header'
import { AppSidebar } from '@/components/sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function ChatPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex-1 overflow-hidden">
          <ChatPanel />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
