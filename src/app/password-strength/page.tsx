
'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { getPasswordStrengthResponse } from '@/app/actions';
import { type PasswordStrengthOutput } from '@/ai/flows/password-strength-checker';

import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eye, EyeOff, KeyRound, Lightbulb, Check, X } from 'lucide-react';
import React from 'react';


export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<PasswordStrengthOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedPassword] = useDebounce(password, 500);

  React.useEffect(() => {
    if (debouncedPassword) {
      setIsLoading(true);
      getPasswordStrengthResponse({ password: debouncedPassword }).then((res) => {
        setResult(res);
        setIsLoading(false);
      });
    } else {
      setResult(null);
    }
  }, [debouncedPassword]);
  
  const strengthColor = () => {
    if (!result || result.score < 20) return 'bg-destructive';
    if (result.score < 40) return 'bg-orange-500';
    if (result.score < 60) return 'bg-yellow-500';
    if (result.score < 80) return 'bg-blue-500';
    return 'bg-green-500';
  }

  return (
     <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
           <div className="mx-auto max-w-2xl space-y-8">
             <div className="text-center">
                <KeyRound className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-2 text-3xl font-bold tracking-tight">Password Strength Checker</h1>
                <p className="mt-2 text-muted-foreground">Enter a password to see how strong it is.</p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 text-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                  {password && (
                    <div className="mt-4 space-y-2">
                       <Progress value={result?.score || 0} className="h-2 [&>div]:transition-all [&>div]:duration-500" indicatorClassName={strengthColor()} />
                       <p className="text-sm font-medium text-right">
                         {isLoading ? 'Analyzing...' : result?.strength}
                       </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {isLoading && !result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analyzing...</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {result && !isLoading && (
                 <Card>
                   <CardHeader>
                     <CardTitle>Analysis Report</CardTitle>
                     <CardDescription>{result.feedback}</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     <div>
                       <h3 className="mb-2 font-semibold">Suggestions for Improvement</h3>
                       <ul className="space-y-2">
                         {result.suggestions.map((suggestion, index) => (
                           <li key={index} className="flex items-start gap-2 text-sm">
                             <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                             <span>{suggestion}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   </CardContent>
                 </Card>
              )}

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Tips for a Strong Password</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    <li>Use at least 12 characters.</li>
                    <li>Mix uppercase letters, lowercase letters, numbers, and symbols.</li>
                    <li>Avoid common words, phrases, or personal information.</li>
                    <li>Don't reuse passwords across different sites.</li>
                    <li>Consider using a password manager.</li>
                  </ul>
                </AlertDescription>
              </Alert>
           </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
