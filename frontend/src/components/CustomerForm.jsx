import React, { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, Binary, Activity, Layers, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subscriptionPlan: 'Basic',
        monthlySpend: 0,
        usageFrequency: 0,
        supportTickets: 0,
        lastLoginDays: 0,
        subscriptionLength: 0,
        engagementScore: 50
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: '',
                email: '',
                subscriptionPlan: 'Basic',
                monthlySpend: 0,
                usageFrequency: 0,
                supportTickets: 0,
                lastLoginDays: 0,
                subscriptionLength: 0,
                engagementScore: 50
            });
        }
    }, [initialData, isOpen]);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header Decoration */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-indigo-500 to-emerald-500" />

                        <div className="p-8 md:p-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
                                        <Sparkles className="text-primary-400" />
                                        {initialData ? 'Refine Intelligence' : 'Register Node'}
                                    </h2>
                                    <p className="text-slate-500 text-sm font-medium mt-1">
                                        Input customer vector data for AI behavioral analysis
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Primary Identifiers */}
                                    <div className="space-y-5">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Binary size={12} className="text-primary-500" />
                                            Core Identifiers
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1">Node Identity Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. Alex Rivera"
                                                    className="w-full px-5 py-3.5 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-primary-500/50 text-white transition-all text-sm"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1">Signal Endpoint (Email)</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="alex@enterprise.ai"
                                                    className="w-full px-5 py-3.5 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-primary-500/50 text-white transition-all text-sm"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1">System Tier</label>
                                                <select
                                                    className="w-full px-5 py-3.5 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-primary-500/50 text-white transition-all text-sm appearance-none cursor-pointer"
                                                    value={formData.subscriptionPlan}
                                                    onChange={e => setFormData({ ...formData, subscriptionPlan: e.target.value })}
                                                >
                                                    <option>Basic</option>
                                                    <option>Pro</option>
                                                    <option>Enterprise</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Behavioral Signals */}
                                    <div className="space-y-5">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Activity size={12} className="text-emerald-500" />
                                            Behavioral Vectors
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1">Yield ($)</label>
                                                <input
                                                    type="number"
                                                    className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 text-white transition-all text-sm"
                                                    value={formData.monthlySpend}
                                                    onChange={e => setFormData({ ...formData, monthlySpend: Number(e.target.value) })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1">Freq (Day/Mo)</label>
                                                <input
                                                    type="number"
                                                    max="30"
                                                    className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 text-white transition-all text-sm"
                                                    value={formData.usageFrequency}
                                                    onChange={e => setFormData({ ...formData, usageFrequency: Number(e.target.value) })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1">Issues</label>
                                                <input
                                                    type="number"
                                                    className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-rose-500/50 text-white transition-all text-sm"
                                                    value={formData.supportTickets}
                                                    onChange={e => setFormData({ ...formData, supportTickets: Number(e.target.value) })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1">Signal %</label>
                                                <input
                                                    type="number"
                                                    max="100"
                                                    className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-primary-500/50 text-white transition-all text-sm"
                                                    value={formData.engagementScore}
                                                    onChange={e => setFormData({ ...formData, engagementScore: Number(e.target.value) })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1 flex items-center gap-1">
                                                    <Calendar size={10} /> Tenure (Mo)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 text-white transition-all text-sm"
                                                    value={formData.subscriptionLength}
                                                    onChange={e => setFormData({ ...formData, subscriptionLength: Number(e.target.value) })}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-slate-400 mb-2 px-1 flex items-center gap-1">
                                                    <Clock size={10} /> Idle (Days)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-amber-500/50 text-white transition-all text-sm"
                                                    value={formData.lastLoginDays}
                                                    onChange={e => setFormData({ ...formData, lastLoginDays: Number(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={loading}
                                    className="w-full py-5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-black rounded-2xl hover:from-primary-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-900/40 mt-4 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <Layers size={20} />
                                            <span>SYNCHRONIZE DATA & INITIATE AI PREDICTION</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CustomerForm;
