import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, BarChart3, TrendingUp,
    FileText, Settings, LogOut, Bell, User, Search,
    ChevronRight, Zap, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggle }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Customers', path: '/customers' },
        { icon: TrendingUp, label: 'Predictions', path: '/predictions' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <AnimatePresence mode="wait">
            {(isOpen || window.innerWidth > 1024) && (
                <motion.aside
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: -300 }}
                    className="w-72 bg-slate-900/50 backdrop-blur-3xl border-r border-white/5 h-screen flex flex-col fixed left-0 top-0 z-50 shadow-2xl"
                >
                    <div className="p-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <TrendingUp className="text-white w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-black text-white tracking-tighter">
                                Churn<span className="text-primary-400">AI</span>
                            </h1>
                        </motion.div>
                    </div>

                    <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
                        {menuItems.map((item, i) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`sidebar-link group ${isActive ? 'active' : ''}`}
                                    >
                                        <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-primary-500/20 text-primary-400' : 'group-hover:bg-white/5'}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="flex-1 font-semibold text-sm">{item.label}</span>
                                        {isActive && (
                                            <motion.div layoutId="activeInd" className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    <div className="p-6 border-t border-white/5 space-y-4">
                        <div className="p-4 bg-gradient-to-br from-primary-600/20 to-emerald-600/5 rounded-2xl border border-white/5 relative overflow-hidden group">
                            <Zap className="absolute top-[-10px] right-[-10px] w-16 h-16 text-primary-500/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                            <p className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-1">Scale Up</p>
                            <p className="text-xs text-slate-400 mb-3">Activate Enterprise AI engine</p>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('openUpgradeModal'))}
                                className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-primary-900/40"
                            >
                                Upgrade Plan
                            </button>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="sidebar-link w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-semibold text-sm">Sign Out</span>
                        </button>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};

const Navbar = ({ toggleSidebar }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-[#0f172a]/40 backdrop-blur-xl border-b border-white/5 fixed top-0 right-0 left-0 lg:left-72 z-40 flex items-center justify-between px-8">
            <div className="flex items-center gap-6">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-400 hover:text-white lg:hidden"
                >
                    <Menu size={24} />
                </button>
                <div className="hidden md:flex items-center bg-slate-900/50 border border-white/5 rounded-2xl px-4 py-2 w-96 group focus-within:border-primary-500/50 transition-all">
                    <Search className="text-slate-500 group-focus-within:text-primary-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search intelligence..."
                        className="bg-transparent border-none outline-none text-sm text-white ml-3 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden xl:flex items-center gap-3 p-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 pr-4">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                        <Zap size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">AI Core Online</span>
                </div>

                <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white leading-none mb-1">{user?.name || 'System Operator'}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user?.role || 'Admin'}</p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-11 h-11 bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 rounded-2xl flex items-center justify-center font-black text-primary-400 shadow-xl cursor-pointer"
                    >
                        {user?.name?.charAt(0) || 'S'}
                    </motion.div>
                </div>
            </div>
        </header>
    );
};

const UpgradeModal = ({ isOpen, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="max-w-xl w-full glass-card p-10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px] -z-10" />

                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>

                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 bg-primary-500/10 text-primary-400 rounded-3xl mb-6 border border-primary-500/20">
                            <Zap size={32} fill="currentColor" />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Neural Enterprise</h2>
                        <p className="text-slate-400 mt-2">Unlock hyper-scale churn intelligence</p>
                    </div>

                    <div className="space-y-4 mb-10">
                        {[
                            'Unlimited Customer Sync',
                            'Neural Prediction API Access',
                            'Custom LLM Integration',
                            '24/7 Priority Signal Support'
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <ChevronRight className="text-primary-500 w-5 h-5" />
                                <span className="text-sm font-bold text-slate-300">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-primary-900/40 hover:scale-[1.02] transition-transform uppercase tracking-widest text-sm">
                        Initialize Upgrade Flow
                    </button>
                    <p className="text-center text-[10px] text-slate-500 mt-6 uppercase tracking-widest font-bold">Standard Enterprise Billing Applies</p>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

    React.useEffect(() => {
        const handleOpen = () => setUpgradeModalOpen(true);
        window.addEventListener('openUpgradeModal', handleOpen);
        return () => window.removeEventListener('openUpgradeModal', handleOpen);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <UpgradeModal isOpen={upgradeModalOpen} onClose={() => setUpgradeModalOpen(false)} />
            <main className="lg:pl-72 pt-20 min-h-screen relative overflow-hidden">
                {/* Content background glows */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[150px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-8"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default Layout;
