import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        <Shield className="h-10 w-10 text-white" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2 className="text-2xl font-semibold">Shared Chat Not Found</h2>
                    <p className="text-muted-foreground">
                        This shared conversation doesn't exist or may have been removed.
                    </p>
                </div>

                <div className="pt-4">
                    <Link href="/">
                        <Button size="lg" className="bg-gradient-to-br from-purple-500 to-blue-500">
                            <Home className="h-5 w-5 mr-2" />
                            Go to SurakshaGPT
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
