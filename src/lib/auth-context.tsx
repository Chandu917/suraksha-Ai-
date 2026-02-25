'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Restore session from localStorage
        try {
            const stored = localStorage.getItem('suraksha_user')
            if (stored) setUser(JSON.parse(stored))
        } catch { }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        if (!email || !password) return { success: false, error: 'Please fill in all fields.' }
        if (!email.includes('@')) return { success: false, error: 'Enter a valid email address.' }
        if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' }

        // Check against stored accounts
        try {
            const accounts = JSON.parse(localStorage.getItem('suraksha_accounts') || '[]')
            const match = accounts.find((a: any) => a.email === email && a.password === password)
            if (!match) return { success: false, error: 'Invalid email or password.' }

            const u = { name: match.name, email: match.email }
            setUser(u)
            localStorage.setItem('suraksha_user', JSON.stringify(u))
            return { success: true }
        } catch {
            return { success: false, error: 'Something went wrong. Please try again.' }
        }
    }

    const signup = async (name: string, email: string, password: string) => {
        if (!name || !email || !password) return { success: false, error: 'Please fill in all fields.' }
        if (!email.includes('@')) return { success: false, error: 'Enter a valid email address.' }
        if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' }

        try {
            const accounts = JSON.parse(localStorage.getItem('suraksha_accounts') || '[]')
            if (accounts.find((a: any) => a.email === email)) {
                return { success: false, error: 'An account with this email already exists.' }
            }
            accounts.push({ name, email, password })
            localStorage.setItem('suraksha_accounts', JSON.stringify(accounts))

            const u = { name, email }
            setUser(u)
            localStorage.setItem('suraksha_user', JSON.stringify(u))
            return { success: true }
        } catch {
            return { success: false, error: 'Something went wrong. Please try again.' }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('suraksha_user')
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
