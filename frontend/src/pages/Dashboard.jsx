import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Users,
    AlertTriangle,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Activity,
    Shield,
    Zap
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, icon: Icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{
            scale: 1.02,
            rotateX: -5,
            rotateY: 5,
            transition: { duration: 0.2 }
        }}
        className="glass-card kpi-card group cursor-pointer perspective-1000"
    >
        <div className="flex justify-between w-full mb-6 relative z-10">
            <div className={`p-4 rounded-2xl bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={28} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'} border border-current/10`}>
                    {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(trend)}%
                </div>
            )}
        </div>
        <div className="w-full text-left relative z-10">
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{title}</p>
            <h3 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl">
                {value}
            </h3>
        </div>
        {/* Decorative background element */}
        <div className={`absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-${color}-500/5 rounded-full blur-3xl group-hover:bg-${color}-500/10 transition-colors duration-500`} />
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCustomers: '0',
        highRisk: '0',
        avgChurn: '0%',
        monthlyRevenue: '$0'
    });

    const [chartData, setChartData] = useState([
        { name: 'Mon', churn: 12, rev: 400 },
        { name: 'Tue', churn: 19, rev: 300 },
        { name: 'Wed', churn: 15, rev: 500 },
        { name: 'Thu', churn: 22, rev: 200 },
        { name: 'Fri', churn: 30, rev: 600 },
        { name: 'Sat', churn: 25, rev: 400 },
        { name: 'Sun', churn: 28, rev: 700 },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/customers');
                const total = data.length;
                const high = data.filter(c => c.churnRiskLevel === 'High').length;
                const avgChurn = total > 0
                    ? (data.reduce((acc, c) => acc + (c.churnProbability || 0), 0) / total) * 100
                    : 0;
                const revenue = data.reduce((acc, c) => acc + (c.monthlySpend || 0), 0);

                setStats({
                    totalCustomers: total.toLocaleString(),
                    highRisk: high.toString(),
                    avgChurn: avgChurn.toFixed(1) + '%',
                    monthlyRevenue: '$' + (revenue / 1000).toFixed(1) + 'k'
                });
            } catch (err) {
                console.error('Stats fetch failed:', err);
            }
        };
        fetchStats();
    }, []);

    const COLORS = ['#10b981', '#f59e0b', '#ef4444'];
    const pieData = [
        { name: 'Healthy', value: 400 },
        { name: 'Fluctuating', value: 300 },
        { name: 'Critical', value: 100 },
    ];

    return (
        <div className="space-y-10">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Command Center</h1>
                    <p className="text-slate-400 mt-1 font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        AI core is processing behavior patterns in real-time
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-slate-900 border border-white/5 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
                        Today
                    </button>
                    <button className="px-5 py-2.5 bg-primary-600 rounded-xl text-sm font-bold text-white hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/20">
                        Export Report
                    </button>
                </div>
            </motion.div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Engines" value={stats.totalCustomers} icon={Users} trend={12.4} color="blue" delay={0.1} />
                <KPICard title="Risk Anomalies" value={stats.highRisk} icon={AlertTriangle} trend={-5.2} color="amber" delay={0.2} />
                <KPICard title="Retentivity Index" value={stats.avgChurn} icon={Shield} trend={3.1} color="emerald" delay={0.3} />
                <KPICard title="Value Stream" value={stats.monthlyRevenue} icon={DollarSign} trend={8.7} color="indigo" delay={0.4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 glass-card p-8 relative overflow-hidden group"
                >
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Predictive Analytics Hub</h3>
                            <p className="text-sm text-slate-500 font-medium">Correlation between Revenue & Churn Probability</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-white/5">
                                <span className="w-2 h-2 rounded-full bg-primary-500" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</span>
                            </div>
                            <button className="p-2 text-slate-500 hover:text-white transition-colors"><MoreVertical size={20} /></button>
                        </div>
                    </div>

                    <div className="h-[360px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="rev"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                    isAnimationActive={true}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="churn"
                                    stroke="#f43f5e"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#f43f5e', strokeWidth: 0 }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                    isAnimationActive={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Risk Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card p-8 flex flex-col items-center justify-between"
                >
                    <div className="w-full mb-6">
                        <h3 className="text-xl font-bold text-white tracking-tight">Stability Profile</h3>
                        <p className="text-sm text-slate-500 font-medium">Customer base health distribution</p>
                    </div>

                    <div className="h-[240px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={8}
                                    dataKey="value"
                                    cornerRadius={10}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-white tracking-tighter">84%</span>
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Growth score</span>
                        </div>
                    </div>

                    <div className="w-full space-y-4 mt-6">
                        {pieData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentcolor]" style={{ backgroundColor: COLORS[index] }}></div>
                                    <span className="text-sm font-bold text-slate-300">{entry.name}</span>
                                </div>
                                <span className="text-xs font-black text-white bg-white/5 px-3 py-1 rounded-lg">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
