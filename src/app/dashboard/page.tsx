'use client';

import { AppSidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
    ShieldAlert,
    ShieldCheck,
    AlertTriangle,
    Activity,
    TrendingUp,
    Globe,
    Lock,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const chartData = [
    { name: '00:00', value: 400 },
    { name: '04:00', value: 300 },
    { name: '08:00', value: 600 },
    { name: '12:00', value: 800 },
    { name: '16:00', value: 500 },
    { name: '20:00', value: 900 },
    { name: '23:59', value: 700 },
];

const alertData = [
    { id: 1, type: 'Phishing', severity: 'High', source: 'SMS (+91 98XXX)', time: '2 mins ago', status: 'Blocked' },
    { id: 2, type: 'Malware', severity: 'Critical', source: 'bit.ly/unsafe-link', time: '15 mins ago', status: 'Quarantined' },
    { id: 3, type: 'Insecure Pass', severity: 'Medium', source: 'Instagram Account', time: '1 hour ago', status: 'Warning' },
    { id: 4, type: 'SSL Expiry', severity: 'Low', source: 'personal-blog.in', time: '3 hours ago', status: 'Active' },
];

export default function DashboardPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-background">
                <Header />
                <main className="p-6 space-y-8 animate-in fade-in duration-700">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Security Matrix</h2>
                            <p className="text-white/40 font-medium tracking-wide uppercase text-xs mt-1">Status: Active • Defense Level 4</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-4 py-2 rounded-xl glass border-white/5 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-bold text-white/70 uppercase tracking-tighter">Neural Engine Live</span>
                            </div>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="glass-card border-primary/20 bg-primary/5 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-1 text-primary text-xs font-black">
                                    <TrendingUp className="w-3 h-3" /> +12%
                                </div>
                            </div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Defense Score</p>
                            <h3 className="text-4xl font-black text-white">98.4<span className="text-lg text-white/20">/100</span></h3>
                        </div>

                        <div className="glass-card border-red-500/20 bg-red-500/5 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <div className="text-red-400 text-xs font-black">
                                    -4% Improvement
                                </div>
                            </div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Threats Blocked</p>
                            <h3 className="text-4xl font-black text-white">1,284</h3>
                        </div>

                        <div className="glass-card border-secondary/20 bg-secondary/5 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div className="text-secondary text-xs font-black">
                                    Active Scan
                                </div>
                            </div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Scanned Links</p>
                            <h3 className="text-4xl font-black text-white">45,802</h3>
                        </div>

                        <div className="glass-card border-white/10 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-white/5 text-white/70">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div className="text-white/30 text-xs font-bold uppercase">
                                    Global
                                </div>
                            </div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Global Alerts</p>
                            <h3 className="text-4xl font-black text-white">8.2M</h3>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 glass-card !p-8 border-white/5">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Neural Threat Detection Rate
                                </h3>
                                <select className="bg-white/5 border-white/10 rounded-lg text-xs font-bold p-2 text-white/50 outline-none">
                                    <option>Last 24 Hours</option>
                                    <option>Last 7 Days</option>
                                </select>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'rgba(10, 20, 40, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ color: 'hsl(var(--primary))' }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="glass-card !p-8 border-white/5">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-secondary" />
                                Security Distribution
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Mobile Security', value: 85, color: 'bg-primary' },
                                    { label: 'Cloud Identity', value: 62, color: 'bg-secondary' },
                                    { label: 'Network Firewall', value: 94, color: 'bg-primary' },
                                    { label: 'Browser Safety', value: 45, color: 'bg-red-500' },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                            <span className="text-white/40">{item.label}</span>
                                            <span className="text-white/70">{item.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <div className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <p className="text-xs font-medium text-primary leading-relaxed uppercase tracking-tighter">
                                    Tip: Your Browser Safety score is low. Try enabling "Quantum Link Protection" in settings.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Alert Table Section */}
                    <div className="glass-card !p-0 overflow-hidden border-white/5">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                Live Incident Response Log
                            </h3>
                            <Button variant="ghost" className="text-xs font-bold text-primary hover:bg-primary/10">VIEW ALL LOGS</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-white/30">
                                    <tr>
                                        <th className="px-8 py-4">Threat Type</th>
                                        <th className="px-8 py-4">Severity</th>
                                        <th className="px-8 py-4">Source/Vector</th>
                                        <th className="px-8 py-4">Timestamp</th>
                                        <th className="px-8 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {alertData.map((alert) => (
                                        <tr key={alert.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-bold text-white uppercase tracking-tight">{alert.type}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${alert.severity === 'Critical' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                    alert.severity === 'High' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                                                        alert.severity === 'Medium' ? 'bg-primary/10 border-primary/20 text-primary' :
                                                            'bg-green-500/10 border-green-500/20 text-green-500'
                                                    }`}>
                                                    {alert.severity}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-medium text-white/50">{alert.source}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-bold text-white/30 uppercase">{alert.time}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-white/70 font-bold text-xs uppercase tracking-tighter">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${alert.status === 'Blocked' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                    {alert.status}
                                                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
