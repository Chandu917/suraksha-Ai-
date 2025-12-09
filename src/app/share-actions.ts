'use server'

import { db } from '@/lib/firebase-config'
import { collection, addDoc, getDoc, doc } from 'firebase/firestore'
import { type Message, type SharedChat, type ShareResult } from '@/lib/types'

export async function shareChat(messages: Message[]): Promise<ShareResult> {
    try {
        if (!messages || messages.length === 0) {
            return {
                success: false,
                error: 'No messages to share',
            }
        }

        // Generate a title from the first user message
        const firstUserMessage = messages.find(m => m.role === 'user')
        const title = firstUserMessage
            ? firstUserMessage.content.slice(0, 60) + (firstUserMessage.content.length > 60 ? '...' : '')
            : 'SurakshaGPT Conversation'

        const sharedChat: Omit<SharedChat, 'id'> = {
            title,
            messages,
            createdAt: new Date().toISOString(),
        }

        // Add to Firestore
        const docRef = await addDoc(collection(db, 'shared-chats'), sharedChat)

        // Generate shareable URL
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const shareUrl = `${baseUrl}/share/${docRef.id}`

        return {
            success: true,
            shareUrl,
        }
    } catch (error) {
        console.error('Error sharing chat:', error)
        return {
            success: false,
            error: 'Failed to create shareable link. Please try again.',
        }
    }
}

export async function getSharedChat(id: string): Promise<SharedChat | null> {
    try {
        const docRef = doc(db, 'shared-chats', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as SharedChat
        }

        return null
    } catch (error) {
        console.error('Error fetching shared chat:', error)
        return null
    }
}
