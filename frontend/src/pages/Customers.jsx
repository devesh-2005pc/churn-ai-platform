import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CustomerTable from '../components/CustomerTable';
import CustomerForm from '../components/CustomerForm';
import { motion } from 'framer-motion';
import { Users, UserPlus, ShieldCheck, Mail } from 'lucide-react';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const { data } = await api.get('/customers');
            setCustomers(data);
        } catch (err) {
            console.error('Error fetching customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAdd = () => {
        setEditingCustomer(null);
        setIsFormOpen(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await api.delete(`/customers/${id}`);
                fetchCustomers();
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editingCustomer) {
                await api.put(`/customers/${editingCustomer._id}`, formData);
            } else {
                await api.post('/customers', formData);
            }
            setIsFormOpen(false);
            fetchCustomers();
        } catch (err) {
            alert('Save failed');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Intelligence Database</h1>
                    <p className="text-slate-400 mt-1 font-medium">Manage customer profiles and analyze individual risk vectors</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl hover:bg-primary-500 transition-all font-bold shadow-lg shadow-primary-900/30"
                >
                    <UserPlus size={20} />
                    <span>Engage New Customer</span>
                </motion.button>
            </motion.div>

            {/* Quick Stats Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Profiles', value: customers.length, icon: Users, color: 'blue' },
                    { label: 'Verified Status', value: '100%', icon: ShieldCheck, color: 'emerald' },
                    { label: 'Last Campaign', value: '2h ago', icon: Mail, color: 'indigo' }
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors"
                    >
                        <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="glass-card p-2">
                    <CustomerTable
                        customers={customers}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </motion.div>

            <CustomerForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingCustomer}
            />
        </div>
    );
};

export default Customers;
