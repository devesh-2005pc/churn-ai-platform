import React, { useState } from 'react';
import api from '../services/api';
import {
    FileText,
    Download,
    Printer,
    Share2,
    FileSpreadsheet,
    FileJson,
    PieChart,
    BarChart3,
    Calendar,
    ArrowRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const Reports = () => {
    const [loading, setLoading] = useState(false);

    const exportCSV = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/customers');

            const headers = ['Name', 'Email', 'Plan', 'Spend', 'Risk Level', 'Churn Prob'];
            const csvContent = [
                headers.join(','),
                ...data.map(c => [
                    c.name,
                    c.email,
                    c.subscriptionPlan,
                    c.monthlySpend,
                    c.churnRiskLevel,
                    Math.round((c.churnProbability || 0) * 100) + '%'
                ].join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            downloadFile(blob, `churn-report-${new Date().toISOString().split('T')[0]}.csv`);
        } catch (err) {
            alert('Export failed');
        } finally {
            setLoading(false);
        }
    };

    const exportJSON = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/customers');
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            downloadFile(blob, `churn-data-${new Date().toISOString().split('T')[0]}.json`);
        } catch (err) {
            alert('Export failed');
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const ReportCard = ({ title, description, icon: Icon, onExport, type, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 flex flex-col justify-between group overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 rounded-full blur-[50px] group-hover:bg-primary-600/10 transition-colors" />

            <div className="relative z-10">
                <div className="p-4 bg-slate-900 border border-white/5 text-primary-400 w-fit rounded-2xl mb-6 shadow-xl group-hover:border-primary-500/30 transition-colors">
                    <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{description}</p>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExport}
                className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all border border-white/5"
            >
                <Download size={16} className="text-primary-500" />
                <span>Export {type} Resource</span>
            </motion.button>
        </motion.div>
    );

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Intelligence Vault</h1>
                    <p className="text-slate-400 mt-1 font-medium italic opacity-80 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Generate cryptographically secure behavioral analysis exports
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-slate-900 border border-white/10 p-2 rounded-xl flex items-center gap-4 px-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Storage Status</span>
                        <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-primary-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ReportCard
                    title="Customer Node Audit"
                    description="Comprehensive vector data including metadata, engagement strength, and churn risk levels."
                    icon={FileSpreadsheet}
                    type="CSV"
                    onExport={exportCSV}
                    delay={0.1}
                />
                <ReportCard
                    title="Risk Analysis PDF"
                    description="Expert-level summary of high-criticality segments with automated intervention recommendations."
                    icon={PieChart}
                    type="PDF"
                    onExport={() => alert('PDF Generation requires server-side logic. Standard CSV/JSON exports active.')}
                    delay={0.2}
                />
                <ReportCard
                    title="System Data (JSON)"
                    description="Raw behavioral object notation optimized for CRM integration and external modeling."
                    icon={FileJson}
                    type="JSON"
                    onExport={exportJSON}
                    delay={0.3}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card relative p-10 mt-12 overflow-hidden border-primary-500/20"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-3xl relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary-600 shadow-2xl shadow-primary-900/40 rounded-2xl text-white">
                            <Calendar size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight uppercase">Automated Protocols</h3>
                            <p className="text-primary-400 font-bold text-xs uppercase tracking-widest">Enterprise Feature Active</p>
                        </div>
                    </div>

                    <p className="text-slate-400 text-lg leading-relaxed mb-10">
                        Synchronize your executive team with weekly intelligence audits. Our neural engine will compile risk vectors and deliver them directly to verified endpoints every Monday at 08:00 UTC.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-500 transition-all shadow-xl shadow-primary-900/40 flex items-center justify-center gap-3 uppercase text-[12px] tracking-widest"
                        >
                            <Calendar size={18} />
                            Enable Auto-Sync
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-slate-900 border border-white/5 text-slate-300 font-black rounded-2xl hover:text-white hover:border-white/10 transition-all flex items-center justify-center gap-3 uppercase text-[12px] tracking-widest"
                        >
                            Configure Recipients
                            <ArrowRight size={18} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Reports;
