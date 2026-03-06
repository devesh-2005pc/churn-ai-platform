import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Mail, Lock, Loader2, ArrowRight, Activity } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-600/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/5 rounded-full blur-[150px] animate-pulse delay-1000" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass-card p-10 relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotateZ: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-flex items-center justify-center p-4 bg-primary-500/10 text-primary-400 rounded-3xl mb-6 border border-primary-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    >
                        <Activity size={40} />
                    </motion.div>
                    <h2 className="text-4xl font-black text-white leading-tight">Welcome Back</h2>
                    <p className="text-slate-400 mt-3 font-medium">Elevate your retention strategy</p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="mb-8 p-4 bg-red-500/10 text-red-400 rounded-2xl text-xs border border-red-500/20 flex items-center gap-3 backdrop-blur-sm"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-12"
                                    placeholder="name@company.ai"
                                    required
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors w-5 h-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-12"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full mt-4 !py-5"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                <span>Sign In to Terminal</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </motion.button>
                </form>

                <p className="text-center mt-10 text-slate-500 text-sm font-medium">
                    New to AI Predictor? <Link to="/register" className="text-primary-400 font-bold hover:text-primary-300 transition-colors underline-offset-4 hover:underline">Create Account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
