import React, { useState } from 'react';
import {
    Settings as SettingsIcon,
    User,
    Bell,
    Shield,
    Database,
    Mail,
    Save,
    Globe,
    Sliders,
    CheckCircle2,
    Cpu,
    Key,
    Webhook,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user, updateProfile } = useAuth();
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('Profile');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        companyId: user?.companyId || '',
        threshold: 75,
        alertsEnabled: true
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateProfile({
                name: formData.name,
                companyId: formData.companyId
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const NavItem = ({ icon: Icon, label, active, onClick }) => (
        <motion.button
            whileHover={{ x: 5 }}
            onClick={onClick}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all w-full text-left relative overflow-hidden group ${active
                ? 'bg-primary-600 text-white shadow-xl shadow-primary-900/40'
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                }`}
        >
            {active && (
                <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-primary-600 -z-10"
                />
            )}
            <Icon size={20} className={active ? 'text-white' : 'text-slate-600 group-hover:text-primary-400'} />
            <span className="font-bold text-sm tracking-tight uppercase">{label}</span>
        </motion.button>
    );

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Command Center</h1>
                    <p className="text-slate-400 mt-1 font-medium opacity-80 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-primary-500" />
                        Configure neural parameters and system-wide protocols
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-0.5">System Synchronized</span>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Settings Nav */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 space-y-3"
                >
                    {[
                        { icon: User, label: 'Profile' },
                        { icon: Bell, label: 'Alerts' },
                        { icon: Key, label: 'Security' },
                        { icon: Database, label: 'Database' },
                        { icon: Webhook, label: 'Integrations' }
                    ].map((item) => (
                        <NavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.label}
                            onClick={() => setActiveTab(item.label)}
                        />
                    ))}
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-3 space-y-8"
                >
                    <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-[100px] -z-10" />

                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                            <div className="p-3 bg-primary-600 shadow-xl shadow-primary-900/40 rounded-2xl text-white">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Neural Thresholds</h3>
                                <p className="text-xs text-slate-500 font-medium tracking-wide">Adjust sensitivity of the AI Churn Predictor</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="max-w-md">
                                    <p className="font-bold text-white text-base">Critical Risk Sensitivity</p>
                                    <p className="text-sm text-slate-500 mt-1">Specify the probability floor at which the system initiates immediate intervention protocols.</p>
                                </div>
                                <div className="flex items-center gap-6 bg-slate-950 p-4 rounded-2xl border border-white/5 min-w-[200px] justify-between">
                                    <span className="text-xl font-black text-primary-400 font-mono">{formData.threshold}<small className="text-[10px]">%</small></span>
                                    <input
                                        type="range"
                                        className="w-32 accent-primary-500 bg-slate-800 rounded-full h-1"
                                        value={formData.threshold}
                                        onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="max-w-md">
                                    <p className="font-bold text-white text-base">Automated Alert Dispatch</p>
                                    <p className="text-sm text-slate-500 mt-1">Enable real-time Nodemailer transmission for high-criticality events.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer scale-110">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.alertsEnabled}
                                        onChange={() => setFormData({ ...formData, alertsEnabled: !formData.alertsEnabled })}
                                    />
                                    <div className="w-14 h-7 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 after:shadow-lg peer-checked:after:bg-white"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                            <div className="p-3 bg-indigo-600 shadow-xl shadow-indigo-900/40 rounded-2xl text-white">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Node Sync Connectivity</h3>
                                <p className="text-xs text-slate-500 font-medium tracking-wide">Manage your primary data pipeline clusters</p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl mb-10 relative group">
                            <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/[0.02] transition-colors rounded-3xl" />
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-primary-500 shadow-xl">
                                        <Database size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-white text-sm tracking-tight uppercase">MongoDB Nexus Cluster</p>
                                        <p className="text-xs font-mono text-emerald-500 flex items-center gap-1.5 mt-1">
                                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                                            CONNECTED: ATLAS_REGION_US_EAST
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="text-[10px] font-black text-primary-500 hover:text-primary-400 uppercase tracking-widest bg-primary-500/5 px-4 py-2 rounded-xl border border-primary-500/10"
                                >
                                    Force Recalibration
                                </motion.button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-500 mb-3 px-1 uppercase tracking-widest">Enterprise Identity</label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-primary-500/50 text-white transition-all text-sm font-bold shadow-inner"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-black text-slate-500 mb-3 px-1 uppercase tracking-widest">Company / Team Identifier</label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl outline-none focus:border-primary-500/50 text-white transition-all text-sm font-bold shadow-inner"
                                    value={formData.companyId}
                                    onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-950/50 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-3 px-4 mb-4 sm:mb-0">
                            <AnimatePresence>
                                {saved && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-widest"
                                    >
                                        <div className="p-1.5 bg-emerald-500/20 rounded-full">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        System Updated
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {!saved && <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Unsaved modifications detected</div>}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37, 99, 235, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl uppercase text-[12px] tracking-widest disabled:opacity-50"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                            {loading ? 'Processing System Update...' : 'Commit Changes'}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Settings;
