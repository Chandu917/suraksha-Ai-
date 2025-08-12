import { KeyRound } from "lucide-react";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function PasswordStrengthPage() {
  return (
     <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
            <KeyRound className="h-16 w-16 text-muted-foreground" />
            <h1 className="text-2xl font-bold tracking-tight">Password Strength Checker</h1>
            <p className="text-muted-foreground">Check the strength of your passwords. This feature is coming soon!</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
