import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Trash2,
    Edit2,
    SearchX,
    ChevronRight,
    Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRisk, setFilterRisk] = useState('All');

    const filtered = customers.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRisk = filterRisk === 'All' || c.churnRiskLevel === filterRisk;
        return matchesSearch && matchesRisk;
    });

    const getRiskBadge = (level) => {
        const styles = {
            High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        };
        return `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[level] || styles.Low}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border-b border-white/5">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 w-4 h-4 transition-colors" />
                    <input
                        type="text"
                        placeholder="Filter by name or email intelligence..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-2xl outline-none focus:border-primary-500/50 transition-all text-sm text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-900/50 border border-white/5 rounded-2xl p-1">
                        {['All', 'Low', 'Medium', 'High'].map((risk) => (
                            <button
                                key={risk}
                                onClick={() => setFilterRisk(risk)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${filterRisk === risk
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {risk}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            const headers = ['Name', 'Email', 'Plan', 'Spend ($)', 'Risk Level', 'Churn Prob (%)', 'CLV ($)'];
                            const csvContent = [
                                headers.join(','),
                                ...filtered.map(c => [
                                    `"${c.name}"`,
                                    `"${c.email}"`,
                                    `"${c.subscriptionPlan}"`,
                                    c.monthlySpend,
                                    `"${c.churnRiskLevel}"`,
                                    Math.round((c.churnProbability || 0) * 100),
                                    Math.round(c.CLV || 0)
                                ].join(','))
                            ].join('\n');

                            const blob = new Blob([csvContent], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `customer-intelligence-${new Date().toISOString().split('T')[0]}.csv`;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }}
                        className="p-3 bg-slate-900 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all"
                        title="Export current view as CSV"
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                            <th className="px-8 py-5">Node Identity</th>
                            <th className="px-8 py-5">System Tier</th>
                            <th className="px-8 py-5">Signal Strength</th>
                            <th className="px-8 py-5">Stability Vector</th>
                            <th className="px-8 py-5 text-right">Yield Value</th>
                            <th className="px-8 py-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence mode="popLayout">
                            {filtered.length > 0 ? (
                                filtered.map((customer, i) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={customer._id}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-primary-400 rounded-2xl flex items-center justify-center font-black text-lg shadow-xl">
                                                    {customer.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-base flex items-center gap-2">
                                                        {customer.name}
                                                        {customer.engagementScore > 80 && <Trophy className="w-3 h-3 text-amber-500" />}
                                                    </div>
                                                    <div className="text-xs text-slate-500 font-medium">{customer.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${customer.subscriptionPlan === 'Enterprise' ? 'bg-indigo-400' :
                                                    customer.subscriptionPlan === 'Pro' ? 'bg-primary-400' : 'bg-slate-400'
                                                    }`} />
                                                <span className="text-sm font-bold text-slate-300">{customer.subscriptionPlan}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1.5 min-w-[100px]">
                                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                                                    <span>Signal</span>
                                                    <span>{customer.engagementScore}%</span>
                                                </div>
                                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${customer.engagementScore}%` }}
                                                        className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={getRiskBadge(customer.churnRiskLevel)}>
                                                {customer.churnRiskLevel}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right font-mono font-black text-emerald-400">
                                            ${customer.CLV?.toLocaleString(undefined, { minimumFractionDigits: 0 }) || '0'}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                <button
                                                    onClick={() => onEdit(customer)}
                                                    className="p-2.5 bg-slate-800 text-slate-400 hover:text-primary-400 border border-white/5 rounded-xl transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(customer._id)}
                                                    className="p-2.5 bg-slate-800 text-slate-400 hover:text-rose-400 border border-white/5 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2.5 bg-slate-800 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-all">
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="p-6 bg-slate-900 rounded-full mb-6 border border-white/5">
                                                <SearchX size={48} className="text-slate-600" />
                                            </div>
                                            <p className="text-xl font-bold text-white">Signal Lost</p>
                                            <p className="text-sm text-slate-500 mt-2">The database returned no matching nodes for your query.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerTable;
