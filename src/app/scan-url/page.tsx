
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUrlScanResponse } from '@/app/actions';
import { type ScanUrlOutput } from '@/ai/schemas/url-scanner';

import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, ShieldQuestion, Link2, ScanLine } from 'lucide-react';


const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export default function ScanUrlPage() {
  const [result, setResult] = useState<ScanUrlOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await getUrlScanResponse({ url: values.url });
    setResult(response);
    setIsLoading(false);
  }

  const getResultIcon = () => {
    if (!result) return <ShieldQuestion className="h-16 w-16 text-muted-foreground" />;
    if (result.isSafe) return <CheckCircle2 className="h-16 w-16 text-green-500" />;
    return <AlertTriangle className="h-16 w-16 text-destructive" />;
  };

  const getResultColor = () => {
    if (!result) return 'border-border';
    if (result.isSafe) return 'border-green-500';
    return 'border-destructive';
  }

  const getThreatLabel = (threatType: ScanUrlOutput['threatType']) => {
    const labels: Record<ScanUrlOutput['threatType'], string> = {
      None: 'No Threats Detected',
      Phishing: 'Phishing Attempt',
      Malware: 'Malware Link',
      Spam: 'Spam Content',
      Suspicious: 'Suspicious URL',
      Unknown: 'Unknown Threat',
    };
    return labels[threatType];
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="text-center">
              <ScanLine className="mx-auto h-12 w-12 text-primary" />
              <h1 className="mt-2 text-3xl font-bold tracking-tight">URL Threat Scanner</h1>
              <p className="mt-2 text-muted-foreground">Enter a URL to check if it's safe to visit.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scan a URL</CardTitle>
                <CardDescription>Paste a link below and we'll analyze it for you.</CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">URL</FormLabel>
                          <div className="relative">
                             <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                             <FormControl>
                                <Input placeholder="https://example.com" {...field} className="pl-10" />
                              </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Scanning...' : 'Scan URL'}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>

            {isLoading && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis in Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-8 w-1/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            )}

            {result && (
              <Card className={cn("transition-colors", getResultColor())}>
                <CardHeader className="text-center">
                   {getResultIcon()}
                   <CardTitle className={cn("text-2xl", {
                     'text-green-500': result.isSafe,
                     'text-destructive': !result.isSafe
                   })}>
                     {result.isSafe ? "URL is Safe" : "Potential Threat Detected"}
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div>
                     <h3 className="font-semibold">Threat Type</h3>
                     <p className="text-muted-foreground">{getThreatLabel(result.threatType)}</p>
                   </div>
                   <div>
                     <h3 className="font-semibold">Report</h3>
                     <p className="text-muted-foreground whitespace-pre-wrap">{result.report}</p>
                   </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
