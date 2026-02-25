'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react'

/* ─── Floating binary particles ─── */
function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)

    const chars = '01アイウエオ</>{}[]#$%@!SECURE'.split('')
    const columns = Math.floor(canvas.width / 28)
    const drops = Array(columns).fill(0).map(() => -Math.random() * 60)

    let raf: number
    function draw() {
      ctx.fillStyle = 'rgba(8,12,20,0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const alpha = Math.random() * 0.12 + 0.05
        ctx.fillStyle = `rgba(0,180,255,${alpha})`
        ctx.font = `${Math.random() > 0.9 ? '14px' : '11px'} monospace`
        ctx.fillText(char, i * 28, y * 18)
        drops[i] = (y > canvas.height / 18 + Math.random() * 10) ? -10 : y + 0.25
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.55 }} />
}

export default function LoginPage() {
  const { login, user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && user) router.replace('/chat')
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)
    if (result.success) router.replace('/chat')
    else setError(result.error || 'Invalid credentials. Please try again.')
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .lp { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #06090f; position: relative; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; }

        /* ══════════ FINGERPRINT ══════════ */
        .fp-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-58%, -50%);
          width: 680px; height: 680px;
          pointer-events: none;
          z-index: 1;
        }
        .fp-svg { width: 100%; height: 100%; }
        .fp-ridge {
          fill: none;
          stroke: rgba(0,180,255,0.18);
          stroke-width: 1.5;
          stroke-linecap: round;
        }
        /* scan clip rect animates top->bottom revealing a bright color */
        .fp-scan-group .fp-ridge-lit {
          fill: none;
          stroke: rgba(0,220,255,0.75);
          stroke-width: 1.8;
          stroke-linecap: round;
          filter: url(#neon);
        }
        .scan-rect {
          animation: scanMove 4s ease-in-out infinite;
        }
        @keyframes scanMove {
          0%   { y: -350px; height: 60px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { y: 350px; height: 60px; opacity: 0; }
        }

        /* scan beam line */
        .scan-line {
          animation: scanLineMove 4s ease-in-out infinite;
          opacity: 0;
        }
        @keyframes scanLineMove {
          0%   { transform: translateY(-340px); opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 1; }
          100% { transform: translateY(340px); opacity: 0; }
        }

        /* pulse ring after scan */
        .fp-verified-ring {
          r: 0;
          opacity: 0;
          stroke: #00e5ff;
          stroke-width: 2;
          fill: none;
          animation: verifyRing 4s ease-in-out infinite;
        }
        @keyframes verifyRing {
          0%, 80%  { r: 0; opacity: 0; }
          85%      { r: 40px; opacity: 0.8; }
          95%      { r: 200px; opacity: 0; }
          100%     { r: 200px; opacity: 0; }
        }

        /* overall fingerprint glow pulse */
        .fp-glow { animation: fpGlow 4s ease-in-out infinite; }
        @keyframes fpGlow {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }

        /* ══════════ CIRCUIT CORNERS ══════════ */
        .circuit { position: absolute; pointer-events: none; z-index: 1; }
        .circuit-path {
          fill: none;
          stroke: rgba(0,180,255,0.22);
          stroke-width: 1.2;
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: tracePath 5s ease-in-out infinite;
        }
        .circuit-path:nth-child(2) { animation-delay: 0.6s; }
        .circuit-path:nth-child(3) { animation-delay: 1.2s; }
        .circuit-path:nth-child(4) { animation-delay: 1.8s; }
        @keyframes tracePath {
          0%   { stroke-dashoffset: 300; opacity: 0.2; }
          40%  { stroke-dashoffset: 0;   opacity: 0.8; }
          70%  { stroke-dashoffset: 0;   opacity: 0.8; }
          100% { stroke-dashoffset: -300; opacity: 0.1; }
        }
        .circuit-dot {
          fill: #00b4ff;
          r: 3;
          opacity: 0;
          animation: dotPulse 5s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 30% { opacity: 0; }
          50%     { opacity: 1; r: 4; }
          80%     { opacity: 0.5; r: 3; }
          100%    { opacity: 0; }
        }

        /* ══════════ FLOATING SECURITY ICONS ══════════ */
        .float-icon {
          position: absolute; pointer-events: none; z-index: 1;
          opacity: 0;
          animation: floatUp 8s ease-in-out infinite;
        }
        .float-icon:nth-child(1)  { left: 8%;  top: 15%; animation-delay: 0s;   animation-duration: 9s; }
        .float-icon:nth-child(2)  { left: 88%; top: 20%; animation-delay: 1.5s; animation-duration: 11s; }
        .float-icon:nth-child(3)  { left: 5%;  top: 65%; animation-delay: 3s;   animation-duration: 8s; }
        .float-icon:nth-child(4)  { left: 90%; top: 70%; animation-delay: 4.5s; animation-duration: 12s; }
        .float-icon:nth-child(5)  { left: 50%; top: 5%;  animation-delay: 2s;   animation-duration: 10s; }
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(20px) scale(0.8); }
          20%  { opacity: 0.22; }
          80%  { opacity: 0.18; }
          100% { opacity: 0; transform: translateY(-20px) scale(1); }
        }

        /* ══════════ AMBIENT GLOW ══════════ */
        .glow-top {
          position: absolute; top: -250px; left: 50%; transform: translateX(-50%);
          width: 900px; height: 600px; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse, rgba(0,120,255,0.22) 0%, rgba(0,60,180,0.1) 35%, transparent 65%);
        }

        /* ══════════ CARD ══════════ */
        .card-wrap { position: relative; z-index: 20; width: 100%; max-width: 420px; padding: 0 18px; }
        .brand { text-align: center; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .brand-icon { width: 30px; height: 30px; border-radius: 9px; background: linear-gradient(135deg,#2563eb,#0ea5e9); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px rgba(37,99,235,0.55); }
        .brand-name { font-size: 17px; font-weight: 700; color: #e2eeff; letter-spacing: -0.3px; }
        .brand-name span { color: #38bdf8; }

        .card {
          background: rgba(12,18,35,0.85);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          padding: 36px 32px 32px;
          backdrop-filter: blur(48px);
          -webkit-backdrop-filter: blur(48px);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.7), 0 0 100px rgba(0,120,255,0.08);
          position: relative; overflow: hidden;
        }
        .card::before {
          content: '';
          position: absolute; inset-x: 0; top: 0; height: 1px;
          background: linear-gradient(90deg, transparent 5%, rgba(56,189,248,0.6) 40%, rgba(99,102,241,0.5) 60%, transparent 95%);
        }

        .shield-wrap { display: flex; justify-content: center; margin-bottom: 20px; }
        .shield-icon {
          width: 58px; height: 58px; border-radius: 16px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(37,99,235,0.3) 0%, rgba(6,182,212,0.12) 100%);
          border: 1px solid rgba(56,189,248,0.35);
          box-shadow: 0 0 0 6px rgba(37,99,235,0.08), 0 0 25px rgba(14,165,233,0.25);
          color: #38bdf8;
          animation: shieldPulse 3s ease-in-out infinite;
        }
        @keyframes shieldPulse {
          0%,100% { box-shadow: 0 0 0 6px rgba(37,99,235,0.08), 0 0 25px rgba(14,165,233,0.25); }
          50%     { box-shadow: 0 0 0 8px rgba(37,99,235,0.12), 0 0 40px rgba(14,165,233,0.4); }
        }

        .heading { text-align: center; margin-bottom: 24px; }
        .heading h1 { font-size: 22px; font-weight: 700; color: #f0f6ff; letter-spacing: -0.4px; margin-bottom: 5px; }
        .heading p  { font-size: 13px; color: rgba(148,180,220,0.55); font-weight: 400; }

        .error-box { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 10px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.22); color: #f87171; font-size: 13px; font-weight: 500; margin-bottom: 16px; }

        .field { margin-bottom: 15px; }
        .field-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
        .label { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em; color: rgba(148,180,220,0.45); }
        .forgot { font-size: 12px; font-weight: 500; color: #38bdf8; text-decoration: none; }
        .forgot:hover { opacity: 0.75; }

        .input-wrap { position: relative; display: flex; align-items: center; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); transition: all 0.2s; }
        .input-wrap.focused { border-color: rgba(56,189,248,0.55); background: rgba(14,165,233,0.06); box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
        .input-icon { position: absolute; left: 14px; color: rgba(148,180,220,0.3); pointer-events: none; display: flex; align-items: center; transition: color 0.2s; }
        .input-wrap.focused .input-icon { color: #38bdf8; }
        .input-field { width: 100%; background: transparent; border: none; outline: none; padding: 13px 14px 13px 42px; font-size: 14px; font-weight: 450; color: #e2eeff; font-family: inherit; caret-color: #38bdf8; }
        .input-field::placeholder { color: rgba(148,180,220,0.28); }
        .eye-btn { position: absolute; right: 12px; background: none; border: none; cursor: pointer; color: rgba(148,180,220,0.3); display: flex; align-items: center; padding: 4px; border-radius: 6px; }
        .eye-btn:hover { color: rgba(148,180,220,0.65); }

        .btn-signin {
          width: 100%; height: 48px; border: none; border-radius: 10px;
          font-size: 14.5px; font-weight: 600; color: white; cursor: pointer;
          margin-top: 18px; position: relative; overflow: hidden; font-family: inherit;
          letter-spacing: 0.015em; transition: transform 0.15s, box-shadow 0.2s;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #0ea5e9 80%, #06b6d4 100%);
          box-shadow: 0 0 22px rgba(37,99,235,0.5), 0 4px 18px rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-signin:hover { transform: translateY(-1px); box-shadow: 0 0 36px rgba(37,99,235,0.7), 0 8px 26px rgba(0,0,0,0.5); }
        .btn-signin:active { transform: scale(0.98); }
        .btn-signin:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .btn-shine { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent); transform: translateX(-100%); transition: transform 0.6s ease; }
        .btn-signin:hover .btn-shine { transform: translateX(100%); }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider { display: flex; align-items: center; gap: 12px; margin: 16px 0; }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.18); }

        .btn-secondary { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); color: rgba(148,180,220,0.55); font-size: 13.5px; font-weight: 500; text-decoration: none; font-family: inherit; transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); color: rgba(200,225,255,0.85); }

        .trust-row { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 20px; flex-wrap: wrap; }
        .ti { display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 500; color: rgba(120,160,210,0.35); }
        .td { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .sep { color: rgba(255,255,255,0.1); font-size: 10px; }

        .fp { text-align: center; margin-top: 16px; font-size: 12.5px; color: rgba(120,160,210,0.38); }
        .fp a { color: #38bdf8; text-decoration: none; font-weight: 600; margin-left: 4px; }
        .fp a:hover { opacity: 0.8; }
      `}</style>

      <div className="lp">

        {/* === Binary / code rain === */}
        <BinaryRain />

        {/* === Ambient top glow === */}
        <div className="glow-top" />

        {/* === FINGERPRINT (large BG element) === */}
        <div className="fp-wrap">
          <svg className="fp-svg" viewBox="-340 -340 680 680" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="neon" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <clipPath id="scanClip">
                <rect className="scan-rect" x="-340" y="-350" width="680" height="60" />
              </clipPath>
              <radialGradient id="fp-fade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="0.7" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="fp-mask">
                <circle cx="0" cy="0" r="310" fill="url(#fp-fade)" />
              </mask>
            </defs>

            {/* ── dim ridge layer ── */}
            <g mask="url(#fp-mask)" className="fp-glow">
              {/* Core loops */}
              {[18, 32, 46, 60, 75, 90, 106, 122, 138, 156, 174, 192, 212, 232, 253, 274, 296].map((r, i) => (
                <ellipse key={`e${i}`} cx="0" cy="10" rx={r} ry={r * 0.62}
                  className="fp-ridge" style={{ strokeOpacity: 0.15 + Math.min(i, 8) * 0.012 }} />
              ))}
              {/* Upper arch ridges */}
              {[80, 100, 120, 140, 160, 182, 204, 226, 250, 274].map((r, i) => (
                <path key={`a${i}`}
                  d={`M ${-r} 40 Q 0 ${-r * 0.55} ${r} 40`}
                  className="fp-ridge" style={{ strokeOpacity: 0.14 + i * 0.008 }} />
              ))}
              {/* Lower arch ridges */}
              {[70, 90, 110, 130, 150, 170, 194, 218, 244, 268].map((r, i) => (
                <path key={`b${i}`}
                  d={`M ${-r * 0.9} -20 Q 0 ${r * 0.48} ${r * 0.9} -20`}
                  className="fp-ridge" style={{ strokeOpacity: 0.14 + i * 0.008 }} />
              ))}
              {/* Diagonal ridges left */}
              {[50, 70, 90, 110, 130, 150, 170, 195, 220, 246].map((r, i) => (
                <path key={`dl${i}`}
                  d={`M ${-r - 30} ${-r * 0.2} Q ${-r * 0.5} ${r * 0.55} ${r * 0.1} ${r * 0.65}`}
                  className="fp-ridge" style={{ strokeOpacity: 0.12 + i * 0.008 }} />
              ))}
              {/* Diagonal ridges right */}
              {[50, 70, 90, 110, 130, 150, 170, 195, 220, 246].map((r, i) => (
                <path key={`dr${i}`}
                  d={`M ${r + 30} ${-r * 0.2} Q ${r * 0.5} ${r * 0.55} ${-r * 0.1} ${r * 0.65}`}
                  className="fp-ridge" style={{ strokeOpacity: 0.12 + i * 0.008 }} />
              ))}
            </g>

            {/* ── bright scan-revealed layer ── */}
            <g clipPath="url(#scanClip)" mask="url(#fp-mask)" filter="url(#neon)">
              {[18, 32, 46, 60, 75, 90, 106, 122, 138, 156, 174, 192, 212, 232, 253, 274, 296].map((r, i) => (
                <ellipse key={`el${i}`} cx="0" cy="10" rx={r} ry={r * 0.62}
                  className="fp-ridge-lit" />
              ))}
              {[80, 100, 120, 140, 160, 182, 204, 226, 250, 274].map((r, i) => (
                <path key={`al${i}`} d={`M ${-r} 40 Q 0 ${-r * 0.55} ${r} 40`}
                  className="fp-ridge-lit" />
              ))}
              {[70, 90, 110, 130, 150, 170, 194, 218, 244, 268].map((r, i) => (
                <path key={`bl${i}`} d={`M ${-r * 0.9} -20 Q 0 ${r * 0.48} ${r * 0.9} -20`}
                  className="fp-ridge-lit" />
              ))}
            </g>

            {/* ── scan beam line ── */}
            <g className="scan-line">
              <rect x="-340" y="-2" width="680" height="4" rx="2"
                fill="url(#scanBeam)" filter="url(#neon)" />
              <defs>
                <linearGradient id="scanBeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="25%" stopColor="rgba(0,220,255,0.3)" />
                  <stop offset="50%" stopColor="rgba(0,240,255,0.95)" />
                  <stop offset="75%" stopColor="rgba(0,220,255,0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </g>

            {/* ── verify ring pulse ── */}
            <circle className="fp-verified-ring" cx="0" cy="10" />

            {/* ── centre core dot ── */}
            <circle cx="0" cy="10" r="6" fill="#00e5ff" opacity="0.7"
              style={{ filter: 'drop-shadow(0 0 6px #00e5ff)' }} />
          </svg>
        </div>

        {/* === Circuit traces — top-left === */}
        <div className="circuit" style={{ top: 0, left: 0 }}>
          <svg width="200" height="180" viewBox="0 0 200 180">
            <path className="circuit-path" d="M20,10 H80 V50 H140 V90 H180" />
            <path className="circuit-path" d="M10,80 H60 V130 H120 V160 H190" style={{ animationDelay: '0.8s' }} />
            <path className="circuit-path" d="M0,150 H50 V110 H100 V70 H170 V30" style={{ animationDelay: '1.6s' }} />
            <circle className="circuit-dot" cx="80" cy="50" style={{ animationDelay: '1.2s' }} />
            <circle className="circuit-dot" cx="140" cy="90" style={{ animationDelay: '1.8s' }} />
            <circle className="circuit-dot" cx="60" cy="130" style={{ animationDelay: '0.5s' }} />
          </svg>
        </div>

        {/* === Circuit traces — bottom-right === */}
        <div className="circuit" style={{ bottom: 0, right: 0 }}>
          <svg width="220" height="200" viewBox="0 0 220 200" style={{ transform: 'rotate(180deg)' }}>
            <path className="circuit-path" d="M20,10 H90 V60 H150 V100 H200" style={{ animationDelay: '2s' }} />
            <path className="circuit-path" d="M10,90 H70 V140 H130 V170 H210" style={{ animationDelay: '2.6s' }} />
            <circle className="circuit-dot" cx="90" cy="60" style={{ animationDelay: '3s' }} />
            <circle className="circuit-dot" cx="150" cy="100" style={{ animationDelay: '3.5s' }} />
          </svg>
        </div>

        {/* === Floating security icons === */}
        {(['🔒', '🛡', '🔑', '⚡', '🔐'] as const).map((icon, i) => (
          <div key={i} className="float-icon" style={{
            fontSize: '22px',
            filter: 'drop-shadow(0 0 8px rgba(0,180,255,0.8))',
          }}>
            {icon}
          </div>
        ))}

        {/* === LOGIN CARD === */}
        <div className="card-wrap">
          {/* Brand */}
          <div className="brand">
            <div className="brand-icon"><ShieldCheck size={16} color="white" /></div>
            <span className="brand-name">Suraksha<span>AI</span></span>
          </div>

          <div className="card">
            <div className="shield-wrap">
              <div className="shield-icon"><ShieldCheck size={26} /></div>
            </div>

            <div className="heading">
              <h1>Welcome back</h1>
              <p>Sign in to your SurakshaAI account</p>
            </div>

            {error && (
              <div className="error-box">
                <AlertCircle size={14} style={{ flexShrink: 0 }} />{error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <div className="field-row"><label className="label">Email</label></div>
                <div className={`input-wrap ${focused === 'email' ? 'focused' : ''}`}>
                  <span className="input-icon"><Mail size={14} /></span>
                  <input id="login-email" className="input-field" type="email" value={email}
                    onChange={e => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="you@example.com" autoComplete="email" required />
                </div>
              </div>

              <div className="field">
                <div className="field-row">
                  <label className="label">Password</label>
                  <Link href="#" className="forgot">Forgot password?</Link>
                </div>
                <div className={`input-wrap ${focused === 'pw' ? 'focused' : ''}`}>
                  <span className="input-icon"><Lock size={14} /></span>
                  <input id="login-password" className="input-field" type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} onFocus={() => setFocused('pw')} onBlur={() => setFocused(null)}
                    placeholder="••••••••" autoComplete="current-password" required style={{ paddingRight: 44 }} />
                  <button type="button" tabIndex={-1} className="eye-btn" onClick={() => setShowPassword(p => !p)}>
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button id="login-submit" type="submit" disabled={isLoading} className="btn-signin">
                <span className="btn-shine" />
                {isLoading ? <><div className="spinner" /><span>Signing in…</span></> : <><span>Sign In</span><ArrowRight size={15} /></>}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line" /><span className="divider-text">or</span><div className="divider-line" />
            </div>
            <Link href="/signup" className="btn-secondary">Create a new account <ArrowRight size={13} /></Link>

            <div className="trust-row">
              <div className="ti"><div className="td" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />256-bit SSL</div>
              <span className="sep">|</span>
              <div className="ti"><div className="td" style={{ background: '#38bdf8', boxShadow: '0 0 6px #38bdf8' }} />Zero-Log</div>
              <span className="sep">|</span>
              <div className="ti"><div className="td" style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }} />AI Protected</div>
            </div>
          </div>

          <div className="fp">
            Don&apos;t have an account?<Link href="/signup">Sign up free</Link>
          </div>
        </div>
      </div>
    </>
  )
}
