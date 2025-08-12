'use client'

import { useState } from 'react'
import {
  CheckCircle,
  FileClock,
  KeyRound,
  ShieldCheck,
  Upload,
  User,
} from 'lucide-react'

import { AppSidebar } from '@/components/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  const [is2faEnabled, setIs2faEnabled] = useState(true)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Profile & Security
            </h1>

            {/* Profile Section */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>
                  Manage your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src="https://placehold.co/100x100.png"
                        alt="User Avatar"
                        data-ai-hint="person avatar"
                      />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload picture</span>
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">John Doe</h2>
                      <Badge variant="outline" className="flex items-center gap-1 border-green-500 bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3" /> Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Security Score: 95%</p>
                    <Progress value={95} className="mt-2 h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="User" disabled />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-4 flex justify-end">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

             {/* Security Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Update your password and manage two-factor authentication.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Change Password</h3>
                            <p className="text-sm text-muted-foreground">Update your password regularly to keep your account secure.</p>
                        </div>
                        <Button variant="outline">
                            <KeyRound className="mr-2 h-4 w-4" /> Change Password
                        </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                        </div>
                        <Switch
                            checked={is2faEnabled}
                            onCheckedChange={setIs2faEnabled}
                            aria-label="Toggle Two-Factor Authentication"
                        />
                    </div>
                </CardContent>
            </Card>


            {/* Activity History Section */}
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>
                  Review recent login activity on your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <FileClock className="h-5 w-5 text-muted-foreground" />
                         <div>
                            <p className="font-medium">Last login: 2 hours ago</p>
                            <p className="text-sm text-muted-foreground">Chrome on macOS, Delhi, IN</p>
                         </div>
                    </div>
                    <Button variant="link">View all history</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
