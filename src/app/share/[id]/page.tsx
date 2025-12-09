import { getSharedChat } from '@/app/share-actions'
import { SharedChatView } from '@/components/chat/shared-chat-view'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface SharePageProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
    const sharedChat = await getSharedChat(params.id)

    if (!sharedChat) {
        return {
            title: 'Shared Chat Not Found - SurakshaGPT',
        }
    }

    const description = sharedChat.messages.find(m => m.role === 'user')?.content.slice(0, 160) || 'A conversation shared from SurakshaGPT'

    return {
        title: `${sharedChat.title} - SurakshaGPT`,
        description,
        openGraph: {
            title: sharedChat.title,
            description,
            type: 'website',
            siteName: 'SurakshaGPT',
            images: [
                {
                    url: '/og-image.png', // You can create this later
                    width: 1200,
                    height: 630,
                    alt: 'SurakshaGPT - AI Cybersecurity Assistant',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: sharedChat.title,
            description,
            images: ['/og-image.png'],
        },
    }
}

export default async function SharePage({ params }: SharePageProps) {
    const sharedChat = await getSharedChat(params.id)

    if (!sharedChat) {
        notFound()
    }

    return (
        <SharedChatView
            messages={sharedChat.messages}
            title={sharedChat.title}
            createdAt={sharedChat.createdAt}
        />
    )
}
