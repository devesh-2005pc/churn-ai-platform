import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, User, Mail, Lock, Building, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyId: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 glass-card overflow-hidden perspective-1000"
            >
                {/* Left Side - Promo */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary-600/20 to-transparent border-r border-white/5">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-xs font-bold mb-6 border border-primary-500/20">
                            <ShieldCheck size={14} />
                            <span>Enterprise Ready v2.0</span>
                        </div>
                        <h1 className="text-5xl font-black text-white leading-tight mb-6">
                            Predict. <br />
                            Retain. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">Grow.</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Join 500+ companies using AI to eliminate churn and maximize LTV.
                        </p>

                        <div className="space-y-4">
                            {[
                                "99.2% Prediction Accuracy",
                                "Real-time Behavior Sync",
                                "Automated Retention Plays"
                            ].map((text, i) => (
                                <motion.div
                                    key={text}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex items-center gap-3 text-slate-300 font-medium"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    {text}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 lg:p-12 bg-slate-900/40">
                    <div className="text-center lg:text-left mb-8">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                            className="inline-block p-3 bg-primary-600/20 text-primary-400 rounded-2xl mb-4 lg:hidden"
                        >
                            <TrendingUp size={32} />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white leading-tight">Get Started</h2>
                        <p className="text-slate-400 mt-2 text-sm">Create your workspace in seconds</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-2xl text-xs border border-red-500/20 flex items-center gap-3"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors w-5 h-5" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors w-5 h-5" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder="Work Email"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors w-5 h-5" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder="Create Password"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                                <div className="relative group">
                                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors w-5 h-5" />
                                    <input
                                        type="text"
                                        value={formData.companyId}
                                        onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder="Company / Team ID"
                                        required
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full mt-6"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-8 text-slate-500 text-sm">
                        Already have an account? <Link to="/login" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">Sign In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
