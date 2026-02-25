'use client';

import { AppSidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import {
    BarChart2,
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
    Link2,
    KeyRound,
    Clock,
    TrendingUp,
    TrendingDown,
    FileText,
    Download,
    CheckCircle2,
    XCircle,
    Activity,
} from 'lucide-react';

const summaryCards = [
    { label: 'URLs Scanned', value: '48', change: '+12 this week', trend: 'up', icon: Link2, color: '#38bdf8' },
    { label: 'Threats Blocked', value: '7', change: '+2 this week', trend: 'up', icon: ShieldAlert, color: '#f87171' },
    { label: 'Safe URLs', value: '41', change: '85% safe rate', trend: 'up', icon: ShieldCheck, color: '#4ade80' },
    { label: 'Password Checks', value: '23', change: '+5 this week', trend: 'up', icon: KeyRound, color: '#a78bfa' },
];

const recentScans = [
    { url: 'https://hdfc-alert-kyc.in', result: 'Malicious', risk: 'Critical', time: '2 mins ago', category: 'Phishing' },
    { url: 'https://google.com', result: 'Safe', risk: 'None', time: '15 mins ago', category: 'Search' },
    { url: 'https://sbi-login-verify.net', result: 'Malicious', risk: 'High', time: '1 hour ago', category: 'Banking Fraud' },
    { url: 'https://github.com', result: 'Safe', risk: 'None', time: '2 hours ago', category: 'Developer' },
    { url: 'https://free-iphone-winner.xyz', result: 'Malicious', risk: 'Critical', time: '3 hours ago', category: 'Scam' },
    { url: 'https://youtube.com', result: 'Safe', risk: 'None', time: '4 hours ago', category: 'Media' },
    { url: 'https://paytm-cashback-offer.tk', result: 'Suspicious', risk: 'Medium', time: '5 hours ago', category: 'Suspicious' },
    { url: 'https://stackoverflow.com', result: 'Safe', risk: 'None', time: '6 hours ago', category: 'Developer' },
];

const threatCategories = [
    { label: 'Phishing', count: 3, pct: 43, color: '#f87171' },
    { label: 'Banking Fraud', count: 2, pct: 29, color: '#fb923c' },
    { label: 'Scam Site', count: 1, pct: 14, color: '#facc15' },
    { label: 'Malware', count: 1, pct: 14, color: '#a78bfa' },
];

const weeklyActivity = [
    { day: 'Mon', scans: 8, threats: 1 },
    { day: 'Tue', scans: 12, threats: 2 },
    { day: 'Wed', scans: 6, threats: 0 },
    { day: 'Thu', scans: 15, threats: 3 },
    { day: 'Fri', scans: 4, threats: 0 },
    { day: 'Sat', scans: 2, threats: 1 },
    { day: 'Sun', scans: 1, threats: 0 },
];

const maxScans = Math.max(...weeklyActivity.map(d => d.scans));

function RiskBadge({ risk }: { risk: string }) {
    const map: Record<string, { bg: string; text: string }> = {
        Critical: { bg: 'rgba(239,68,68,0.15)', text: '#f87171' },
        High: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c' },
        Medium: { bg: 'rgba(250,204,21,0.12)', text: '#facc15' },
        None: { bg: 'rgba(74,222,128,0.12)', text: '#4ade80' },
    };
    const s = map[risk] ?? map['None'];
    return (
        <span style={{ background: s.bg, color: s.text, padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
            {risk === 'None' ? 'Clean' : risk}
        </span>
    );
}

function ResultIcon({ result }: { result: string }) {
    if (result === 'Safe') return <CheckCircle2 size={15} style={{ color: '#4ade80' }} />;
    if (result === 'Malicious') return <XCircle size={15} style={{ color: '#f87171' }} />;
    return <AlertTriangle size={15} style={{ color: '#facc15' }} />;
}

export default function ReportsPage() {
    return (
        <AuthGuard>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Header />
                    <main style={{ background: '#06090f', minHeight: '100vh', padding: '28px 32px', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>

                        {/* ── Page header ── */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <BarChart2 size={18} style={{ color: '#38bdf8' }} />
                                    </div>
                                    <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f0f6ff', letterSpacing: '-0.4px', margin: 0 }}>
                                        Security Reports
                                    </h1>
                                </div>
                                <p style={{ fontSize: 13, color: 'rgba(148,180,220,0.5)', margin: 0 }}>
                                    Your complete cybersecurity activity overview
                                </p>
                            </div>
                            <button style={{
                                display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px',
                                borderRadius: 10, border: '1px solid rgba(56,189,248,0.25)',
                                background: 'rgba(56,189,248,0.08)', color: '#38bdf8',
                                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                            }}>
                                <Download size={14} /> Export Report
                            </button>
                        </div>

                        {/* ── Summary cards ── */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
                            {summaryCards.map(card => (
                                <div key={card.label} style={{
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: 14, padding: '18px 20px', position: 'relative', overflow: 'hidden',
                                }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${card.color}60, ${card.color}20)` }} />
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${card.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <card.icon size={16} style={{ color: card.color }} />
                                        </div>
                                        {card.trend === 'up'
                                            ? <TrendingUp size={14} style={{ color: '#4ade80', opacity: 0.6 }} />
                                            : <TrendingDown size={14} style={{ color: '#f87171', opacity: 0.6 }} />
                                        }
                                    </div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: '#f0f6ff', lineHeight: 1, marginBottom: 4 }}>{card.value}</div>
                                    <div style={{ fontSize: 12, color: 'rgba(148,180,220,0.5)', marginBottom: 2 }}>{card.label}</div>
                                    <div style={{ fontSize: 11, color: card.color, opacity: 0.7, fontWeight: 600 }}>{card.change}</div>
                                </div>
                            ))}
                        </div>

                        {/* ── Middle row: Weekly bar chart + Threat breakdown ── */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 24 }}>

                            {/* Weekly activity bars */}
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <Activity size={15} style={{ color: '#38bdf8' }} />
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#e2eeff' }}>Weekly Scan Activity</span>
                                </div>
                                <p style={{ fontSize: 12, color: 'rgba(148,180,220,0.4)', marginBottom: 20 }}>Scans and threats detected per day</p>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120, paddingBottom: 4 }}>
                                    {weeklyActivity.map(d => (
                                        <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                                {/* Threat bar (red, small) */}
                                                {d.threats > 0 && (
                                                    <div style={{ width: '70%', height: d.threats * 12, background: 'rgba(248,113,113,0.7)', borderRadius: 4, minHeight: 4 }} />
                                                )}
                                                {/* Scan bar (blue) */}
                                                <div style={{
                                                    width: '100%',
                                                    height: Math.max(8, (d.scans / maxScans) * 90),
                                                    background: 'linear-gradient(to top, rgba(37,99,235,0.8), rgba(56,189,248,0.6))',
                                                    borderRadius: '5px 5px 3px 3px',
                                                }} />
                                            </div>
                                            <span style={{ fontSize: 10, color: 'rgba(148,180,220,0.4)', fontWeight: 600 }}>{d.day}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: 2, background: '#38bdf8' }} />
                                        <span style={{ fontSize: 11, color: 'rgba(148,180,220,0.5)' }}>Scans</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: 2, background: '#f87171' }} />
                                        <span style={{ fontSize: 11, color: 'rgba(148,180,220,0.5)' }}>Threats</span>
                                    </div>
                                </div>
                            </div>

                            {/* Threat category breakdown */}
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <ShieldAlert size={15} style={{ color: '#f87171' }} />
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#e2eeff' }}>Threat Breakdown</span>
                                </div>
                                <p style={{ fontSize: 12, color: 'rgba(148,180,220,0.4)', marginBottom: 20 }}>By category this month</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {threatCategories.map(t => (
                                        <div key={t.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                                <span style={{ fontSize: 12, color: 'rgba(200,220,255,0.7)', fontWeight: 600 }}>{t.label}</span>
                                                <span style={{ fontSize: 12, color: t.color, fontWeight: 700 }}>{t.count}</span>
                                            </div>
                                            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: 4, opacity: 0.8 }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 20, padding: '12px', borderRadius: 10, background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.15)' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#f87171', marginBottom: 2 }}>⚠ HIGH ALERT</div>
                                    <div style={{ fontSize: 11, color: 'rgba(200,180,180,0.6)' }}>Phishing attacks up 35% vs last month</div>
                                </div>
                            </div>
                        </div>

                        {/* ── Recent scan history table ── */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
                            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FileText size={15} style={{ color: '#38bdf8' }} />
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#e2eeff' }}>Recent URL Scans</span>
                                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(148,180,220,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Clock size={11} /> Last 24 hours
                                </span>
                            </div>

                            {/* Table header */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 110px 120px', padding: '10px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                {['URL', 'Category', 'Result', 'Risk Level', 'Time'].map(h => (
                                    <span key={h} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(148,180,220,0.35)' }}>{h}</span>
                                ))}
                            </div>

                            {/* Table rows */}
                            {recentScans.map((row, i) => (
                                <div key={i} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 110px 90px 110px 120px',
                                    padding: '13px 24px',
                                    borderBottom: i < recentScans.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                    alignItems: 'center',
                                    transition: 'background 0.15s',
                                }}>
                                    <span style={{
                                        fontSize: 12.5, fontWeight: 500,
                                        color: row.result === 'Safe' ? 'rgba(200,225,255,0.7)' : row.result === 'Malicious' ? '#fca5a5' : '#fde68a',
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12,
                                    }}>
                                        {row.url}
                                    </span>
                                    <span style={{ fontSize: 11, color: 'rgba(148,180,220,0.45)', fontWeight: 500 }}>{row.category}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: row.result === 'Safe' ? '#4ade80' : row.result === 'Malicious' ? '#f87171' : '#facc15' }}>
                                        <ResultIcon result={row.result} />{row.result}
                                    </span>
                                    <span><RiskBadge risk={row.risk} /></span>
                                    <span style={{ fontSize: 11, color: 'rgba(148,180,220,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Clock size={10} />{row.time}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthGuard>
    );
}
