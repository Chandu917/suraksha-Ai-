import { Settings as SettingsIcon } from "lucide-react";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
            <SettingsIcon className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences. This feature is coming soon!</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
