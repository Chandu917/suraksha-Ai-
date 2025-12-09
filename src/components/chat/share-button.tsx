'use client'

import { useState } from 'react'
import { Share2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShareDialog } from './share-dialog'
import { shareChat } from '@/app/share-actions'
import { type Message } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

interface ShareButtonProps {
    messages: Message[]
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function ShareButton({ messages, variant = 'outline', size = 'sm' }: ShareButtonProps) {
    const [isSharing, setIsSharing] = useState(false)
    const [shareUrl, setShareUrl] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const { toast } = useToast()

    const handleShare = async () => {
        if (messages.length === 0) {
            toast({
                variant: 'destructive',
                title: 'No messages to share',
                description: 'Start a conversation first before sharing.',
            })
            return
        }

        setIsSharing(true)
        try {
            const result = await shareChat(messages)

            if (result.success && result.shareUrl) {
                setShareUrl(result.shareUrl)
                setDialogOpen(true)
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Failed to share',
                    description: result.error || 'Could not create shareable link. Please try again.',
                })
            }
        } catch (error) {
            console.error('Error sharing chat:', error)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.',
            })
        } finally {
            setIsSharing(false)
        }
    }

    return (
        <>
            <Button
                variant={variant}
                size={size}
                onClick={handleShare}
                disabled={isSharing || messages.length === 0}
            >
                {isSharing ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sharing...
                    </>
                ) : (
                    <>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </>
                )}
            </Button>

            <ShareDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                shareUrl={shareUrl}
            />
        </>
    )
}
