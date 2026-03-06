import React, { useState } from 'react';
import axios from 'axios';
import {
    Zap,
    Search,
    BrainCircuit,
    AlertCircle,
    ChevronRight,
    CheckCircle2,
    Terminal,
    RefreshCcw,
    Loader2,
    Activity,
    Cpu,
    Fingerprint,
    ShieldAlert,
    Clock,
    Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Predictions = () => {
    const [formData, setFormData] = useState({
        monthlySpend: 100,
        usageFrequency: 15,
        supportTickets: 2,
        lastLoginDays: 5,
        subscriptionLength: 12,
        engagementScore: 70
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:8000/predict', formData);
            setResult(data);
        } catch (err) {
            console.error('ML Prediction Error:', err);
            // Fallback for demo if service is down, but ideally user ensures it's up
            alert('ML Service not connected. Ensure Python API is running on port 8000.');
        } finally {
            setLoading(false);
        }
    };

    const Slider = ({ label, name, min, max, unit, icon: Icon }) => (
        <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                    {Icon && <Icon size={14} className="text-primary-500" />}
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-0.5">{label}</label>
                </div>
                <motion.span
                    key={formData[name]}
                    initial={{ scale: 1.1, color: '#60a5fa' }}
                    animate={{ scale: 1, color: '#94a3b8' }}
                    className="text-xs font-black font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5"
                >
                    {formData[name]}{unit}
                </motion.span>
            </div>
            <div className="relative h-6 flex items-center group">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={formData[name]}
                    onChange={(e) => setFormData({ ...formData, [name]: Number(e.target.value) })}
                    className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary-500 group-hover:h-1.5 transition-all outline-none"
                />
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Neural Engine <span className="text-primary-500">v1.2</span></h1>
                    <p className="text-slate-400 mt-1 font-medium flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-primary-500" />
                        Direct interface with the Random Forest behavioral classifier
                    </p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Model Ready</span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Input Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 md:p-10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-[100px] -z-10 group-hover:bg-primary-600/10 transition-colors duration-700" />

                    <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                        <div className="p-3 bg-primary-600 shadow-xl shadow-primary-900/40 text-white rounded-2xl">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Signal Injection</h3>
                            <p className="text-xs text-slate-500 font-medium">Manipulate behavioral vectors for what-if analysis</p>
                        </div>
                    </div>

                    <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <Slider label="Monthly Yield" name="monthlySpend" min={20} max={500} unit="$" icon={Activity} />
                        <Slider label="System Freq." name="usageFrequency" min={1} max={30} unit=" d/m" icon={RefreshCcw} />
                        <Slider label="Friction Events" name="supportTickets" min={0} max={20} unit=" tickets" icon={ShieldAlert} />
                        <Slider label="Idle Latency" name="lastLoginDays" min={0} max={60} unit=" days" icon={Clock} />
                        <Slider label="Tenure Vector" name="subscriptionLength" min={1} max={48} unit=" months" icon={Calendar} />
                        <Slider label="Signal Quality" name="engagementScore" min={0} max={100} unit="%" icon={Fingerprint} />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 py-5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-black rounded-[1.5rem] hover:from-primary-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-3 mt-4 shadow-2xl shadow-primary-900/40 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    <BrainCircuit size={22} />
                                    <span>SYNTHESIZE PREDICTION</span>
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Prediction Output */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`glass-card p-8 md:p-10 relative overflow-hidden transition-all duration-700 ${!result ? 'opacity-40 grayscale blur-[2px]' : 'border-primary-500/30'}`}
                    >
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <Terminal size={20} className="text-primary-400" />
                                Model Synthesis
                            </h3>
                            {result && (
                                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${result.risk_level === 'High' ? 'bg-rose-500/20 text-rose-400 border-rose-500/20' :
                                        result.risk_level === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' :
                                            'bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                                    } shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                                    {result.risk_level} Criticality
                                </div>
                            )}
                        </div>

                        {result ? (
                            <div className="space-y-10 relative z-10">
                                <div className="flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Instability Probability</p>
                                        <div className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                            {Math.round(result.probability * 100)}<span className="text-primary-500">%</span>
                                        </div>
                                    </div>
                                    <div className="w-24 h-24 relative">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                            <motion.circle
                                                initial={{ strokeDasharray: "0 251" }}
                                                animate={{ strokeDasharray: `${result.probability * 251} 251` }}
                                                cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                                                className={result.risk_level === 'High' ? 'text-rose-500' : result.risk_level === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Activity className={result.risk_level === 'High' ? 'text-rose-500' : 'text-emerald-500'} size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <AlertCircle size={14} className="text-primary-500" />
                                        Inference Insights
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl space-y-2">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Friction Analysis</span>
                                            <p className={`text-sm font-bold ${formData.supportTickets > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                {formData.supportTickets > 5 ? 'Critical Volume' : 'Stable Signals'}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl space-y-2">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Signal Health</span>
                                            <p className={`text-sm font-bold ${formData.engagementScore < 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                {formData.engagementScore < 30 ? 'Weak Connection' : 'High Integrity'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Counter-Measures</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {result.risk_level === 'High' ? (
                                            <>
                                                <div className="flex items-center gap-3 p-4 bg-rose-500/10 text-rose-400 rounded-2xl text-xs font-bold border border-rose-500/20">
                                                    <Zap size={16} />
                                                    <span>Incentive Override</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-4 bg-slate-950 border border-white/5 text-slate-300 rounded-2xl text-xs font-bold">
                                                    <Search size={16} />
                                                    <span>Node Health Audit</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="col-span-2 flex items-center gap-3 p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-xs font-bold border border-emerald-500/20">
                                                <CheckCircle2 size={16} />
                                                <span>Normal Operations Protocol Active</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-80 flex flex-col items-center justify-center text-slate-500 text-center px-12 group">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="p-8 bg-slate-900 rounded-full mb-6 border border-white/5"
                                >
                                    <BrainCircuit size={48} className="opacity-20 translate-z-10" />
                                </motion.div>
                                <p className="text-sm font-bold uppercase tracking-widest text-slate-600">Awaiting vector input...</p>
                            </div>
                        )}
                    </motion.div>

                    <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 relative group overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-20 h-20 bg-emerald-600/10 rounded-full blur-2xl group-hover:bg-emerald-600/20 transition-all" />
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <Terminal size={14} />
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Model_Logs.log</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase">Streaming</span>
                        </div>
                        <div className="font-mono text-[10px] leading-relaxed text-emerald-500/80">
                            {result ? (
                                <pre className="custom-scrollbar overflow-x-auto">
                                    {JSON.stringify({
                                        id: "RF_981X",
                                        ts: new Date().toISOString(),
                                        res: result.probability,
                                        vectors: formData
                                    }, null, 2)}
                                </pre>
                            ) : (
                                <div className="space-y-1">
                                    <p className="animate-pulse">{">"} SYSTEM_SLEEP_PROTOCOL_ACTIVE</p>
                                    <p>{">"} WAITING_FOR_SYNC_EVENT...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Predictions;
