'use client'

import { useState } from 'react'
import {
  CheckCircle,
  FileClock,
  KeyRound,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
} from 'lucide-react'

import { AppSidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AuthGuard } from '@/components/auth-guard'
import { useAuth } from '@/lib/auth-context'

/* ── helper: get initials from name ── */
function getInitials(name: string) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function SettingsPage() {
  const { user } = useAuth()

  /* Profile form state — pre-filled from auth */
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState('')
  const [savedProfile, setSavedProfile] = useState(false)

  /* Password form state */
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCur, setShowCur] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showCon, setShowCon] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  /* 2FA toggle */
  const [is2fa, setIs2fa] = useState(false)

  /* ── Save profile ── */
  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSavedProfile(true)
    setTimeout(() => setSavedProfile(false), 2500)
  }

  /* ── Change password ── */
  function handleChangePw(e: React.FormEvent) {
    e.preventDefault()
    setPwError('')
    if (newPw.length < 6) { setPwError('New password must be at least 6 characters.'); return }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return }

    /* Update in localStorage accounts list */
    try {
      const accounts = JSON.parse(localStorage.getItem('suraksha_accounts') || '[]')
      const idx = accounts.findIndex((a: any) => a.email === user?.email)
      if (idx === -1 || accounts[idx].password !== currentPw) {
        setPwError('Current password is incorrect.'); return
      }
      accounts[idx].password = newPw
      localStorage.setItem('suraksha_accounts', JSON.stringify(accounts))
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
      setPwSaved(true)
      setTimeout(() => setPwSaved(false), 2500)
    } catch {
      setPwError('Something went wrong. Please try again.')
    }
  }

  const initials = getInitials(user?.name ?? 'U')

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main
            style={{
              background: '#06090f',
              minHeight: '100vh',
              padding: '28px 32px',
              fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
            }}
          >
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

              {/* ── Page heading ── */}
              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f6ff', letterSpacing: '-0.4px', margin: '0 0 4px' }}>
                  Profile &amp; Security
                </h1>
                <p style={{ fontSize: 13, color: 'rgba(148,180,220,0.5)', margin: 0 }}>
                  Manage your account credentials and preferences
                </p>
              </div>

              {/* ═══════════════════════════════════
                  PROFILE CARD
              ═══════════════════════════════════ */}
              <form onSubmit={handleSaveProfile}>
                <div style={card}>
                  {/* Top accent bar */}
                  <div style={{ position: 'absolute', inset: '0 0 auto', height: 2, background: 'linear-gradient(90deg, #2563eb80, #38bdf880, transparent)', borderRadius: '14px 14px 0 0' }} />

                  {/* Avatar + name row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 }}>
                    <div style={{
                      width: 68, height: 68, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24, fontWeight: 800, color: 'white',
                      boxShadow: '0 0 0 3px rgba(56,189,248,0.2), 0 0 20px rgba(37,99,235,0.3)',
                      flexShrink: 0,
                    }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#f0f6ff', marginBottom: 3 }}>
                        {user?.name ?? '—'}
                      </div>
                      <div style={{ fontSize: 12.5, color: 'rgba(148,180,220,0.5)', marginBottom: 6 }}>
                        {user?.email ?? '—'}
                      </div>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: 11, fontWeight: 700, color: '#4ade80',
                        background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)',
                        borderRadius: 20, padding: '2px 10px',
                      }}>
                        <CheckCircle size={10} /> Active Account
                      </div>
                    </div>
                  </div>

                  {/* Card section title */}
                  <div style={sectionTitle}>
                    <User size={14} style={{ color: '#38bdf8' }} /> Profile Details
                  </div>

                  {/* Fields grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <Field label="Full Name" icon={<User size={13} />}>
                      <input
                        style={inputStyle}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </Field>
                    <Field label="Email Address" icon={<Mail size={13} />}>
                      <input
                        style={{ ...inputStyle, color: 'rgba(160,200,255,0.5)', cursor: 'not-allowed' }}
                        value={email}
                        readOnly
                        title="Email cannot be changed"
                      />
                    </Field>
                    <Field label="Phone Number" icon={<User size={13} />}>
                      <input
                        style={inputStyle}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        type="tel"
                      />
                    </Field>
                    <Field label="Role" icon={<ShieldCheck size={13} />}>
                      <input style={{ ...inputStyle, cursor: 'not-allowed', color: 'rgba(160,200,255,0.4)' }} value="User" readOnly />
                    </Field>
                  </div>

                  {/* Save button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'center' }}>
                    {savedProfile && (
                      <span style={{ fontSize: 12, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <CheckCircle size={13} /> Saved!
                      </span>
                    )}
                    <button type="submit" style={primaryBtn}>
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              </form>

              {/* ═══════════════════════════════════
                  SECURITY CARD
              ═══════════════════════════════════ */}
              <form onSubmit={handleChangePw}>
                <div style={{ ...card, marginTop: 16 }}>
                  <div style={{ position: 'absolute', inset: '0 0 auto', height: 2, background: 'linear-gradient(90deg, #a78bfa80, #f87171a0, transparent)', borderRadius: '14px 14px 0 0' }} />

                  <div style={sectionTitle}>
                    <Lock size={14} style={{ color: '#a78bfa' }} /> Security Settings
                  </div>

                  {/* Change Password fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                    <PasswordField label="Current Password" value={currentPw} onChange={setCurrentPw} show={showCur} onToggle={() => setShowCur(p => !p)} placeholder="Enter current password" />
                    <PasswordField label="New Password" value={newPw} onChange={setNewPw} show={showNew} onToggle={() => setShowNew(p => !p)} placeholder="At least 6 characters" />
                    <PasswordField label="Confirm Password" value={confirmPw} onChange={setConfirmPw} show={showCon} onToggle={() => setShowCon(p => !p)} placeholder="Repeat new password" />
                  </div>

                  {/* Error / success messages */}
                  {pwError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 12.5, fontWeight: 500, marginBottom: 14 }}>
                      <AlertCircle size={13} /> {pwError}
                    </div>
                  )}
                  {pwSaved && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80', fontSize: 12.5, fontWeight: 500, marginBottom: 14 }}>
                      <CheckCircle size={13} /> Password changed successfully!
                    </div>
                  )}

                  {/* 2FA toggle row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px', borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                    marginBottom: 20,
                  }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#e2eeff', marginBottom: 3 }}>
                        Two-Factor Authentication (2FA)
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(148,180,220,0.45)' }}>
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    {/* Toggle */}
                    <button
                      type="button"
                      onClick={() => setIs2fa(p => !p)}
                      style={{
                        width: 44, height: 24, borderRadius: 12, border: 'none',
                        background: is2fa ? 'linear-gradient(90deg, #2563eb, #0ea5e9)' : 'rgba(255,255,255,0.1)',
                        cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                        boxShadow: is2fa ? '0 0 10px rgba(37,99,235,0.4)' : 'none',
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: 3, left: is2fa ? 23 : 3,
                        width: 18, height: 18, borderRadius: '50%', background: 'white',
                        transition: 'left 0.2s',
                      }} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" style={{ ...primaryBtn, background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                      <KeyRound size={14} /> Update Password
                    </button>
                  </div>
                </div>
              </form>

              {/* ═══════════════════════════════════
                  ACTIVITY CARD
              ═══════════════════════════════════ */}
              <div style={{ ...card, marginTop: 16 }}>
                <div style={{ position: 'absolute', inset: '0 0 auto', height: 2, background: 'linear-gradient(90deg, #4ade8080, transparent)', borderRadius: '14px 14px 0 0' }} />
                <div style={sectionTitle}>
                  <FileClock size={14} style={{ color: '#4ade80' }} /> Recent Activity
                </div>
                {[
                  { action: 'Signed in', detail: 'Chrome • macOS • Delhi, IN', time: 'Just now', dot: '#4ade80' },
                  { action: 'URL Scanned', detail: 'https://sbi-login-verify.net', time: '1 hour ago', dot: '#f87171' },
                  { action: 'Password Checked', detail: 'Strength: Strong', time: '2 hours ago', dot: '#38bdf8' },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.dot, boxShadow: `0 0 6px ${row.dot}`, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#e2eeff', marginBottom: 2 }}>{row.action}</div>
                        <div style={{ fontSize: 11.5, color: 'rgba(148,180,220,0.4)' }}>{row.detail}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: 'rgba(148,180,220,0.3)', whiteSpace: 'nowrap' }}>{row.time}</span>
                  </div>
                ))}
              </div>

            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}

/* ── Sub-components ── */
function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(148,180,220,0.45)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7 }}>
        {icon} {label}
      </label>
      {children}
    </div>
  )
}

function PasswordField({ label, value, onChange, show, onToggle, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; placeholder: string;
}) {
  return (
    <Field label={label} icon={<Lock size={13} />}>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, paddingRight: 42 }}
        />
        <button type="button" onClick={onToggle} style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(148,180,220,0.35)',
          display: 'flex', alignItems: 'center',
        }}>
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </Field>
  )
}

/* ── Shared styles ── */
const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '24px 26px',
  position: 'relative',
  overflow: 'hidden',
}

const sectionTitle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 7,
  fontSize: 13, fontWeight: 700, color: '#e2eeff',
  marginBottom: 18,
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10, padding: '11px 14px',
  fontSize: 13.5, color: '#e2eeff',
  fontFamily: 'inherit', outline: 'none',
  boxSizing: 'border-box',
}

const primaryBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 7,
  padding: '10px 20px', borderRadius: 10, border: 'none',
  background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
  color: 'white', fontSize: 13.5, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit',
  boxShadow: '0 0 16px rgba(37,99,235,0.4)',
}
