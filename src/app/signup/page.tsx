'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { Shield, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function SignupPage() {
    const { signup, user, isLoading: authLoading } = useAuth()
    const router = useRouter()

    // Already logged in → skip to chat
    useEffect(() => {
        if (!authLoading && user) router.replace('/chat')
    }, [user, authLoading, router])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        const result = await signup(name, email, password)
        setIsLoading(false)
        if (result.success) {
            router.replace('/chat')
        } else {
            setError(result.error || 'Signup failed.')
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo + Heading */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 ring-1 ring-primary/20 mb-5 shadow-[0_0_40px_rgba(0,168,232,0.2)]">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                        Create your account
                    </h1>
                    <p className="text-white/40 text-sm font-medium">
                        Join SurakshaAI and protect your digital life
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                <Input
                                    id="signup-name"
                                    type="text"
                                    placeholder="Your full name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="h-12 pl-10 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                    required
                                    autoComplete="name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="h-12 pl-10 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                <Input
                                    id="signup-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Min. 6 characters"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="h-12 pl-10 pr-10 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            id="signup-submit"
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl text-base font-bold cyber-button border-none mt-2"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Creating account...
                                </span>
                            ) : 'Create Account'}
                        </Button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center mt-6 text-white/35 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
