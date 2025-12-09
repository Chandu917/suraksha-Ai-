'use client'

import { type Message } from '@/lib/types'
import { ChatMessages } from './chat-messages'
import { Button } from '@/components/ui/button'
import { Shield, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface SharedChatViewProps {
    messages: Message[]
    title: string
    createdAt: string
}

export function SharedChatView({ messages, title, createdAt }: SharedChatViewProps) {
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">SurakshaGPT</h1>
                            <p className="text-xs text-muted-foreground">Shared Conversation</p>
                        </div>
                    </div>
                    <Link href="/">
                        <Button variant="default" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Try SurakshaGPT
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="container max-w-4xl py-8">
                {/* Chat Info */}
                <div className="mb-6 rounded-lg border bg-card p-4">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-sm text-muted-foreground">Shared on {formattedDate}</p>
                </div>

                {/* Messages */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <ChatMessages messages={messages} isLoading={false} onSaveMessage={() => { }} />
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 rounded-lg border bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">Want to ask your own cybersecurity questions?</h3>
                    <p className="text-muted-foreground mb-4">
                        SurakshaGPT helps you understand cyber threats, Indian cyber laws, and stay safe online.
                    </p>
                    <Link href="/">
                        <Button size="lg" className="bg-gradient-to-br from-purple-500 to-blue-500">
                            <Shield className="h-5 w-5 mr-2" />
                            Start Your Own Conversation
                        </Button>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t py-6 mt-12">
                <div className="container text-center text-sm text-muted-foreground">
                    <p>Powered by SurakshaGPT - Your AI Cybersecurity Assistant</p>
                </div>
            </footer>
        </div>
    )
}
