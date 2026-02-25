import { ChatPanel } from '@/components/chat/chat-panel'
import { Header } from '@/components/header'
import { AppSidebar } from '@/components/sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AuthGuard } from '@/components/auth-guard'

export default function ChatPage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex flex-col min-h-0">
            <ChatPanel />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
