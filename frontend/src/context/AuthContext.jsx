import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        setUser(data.user);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
    };

    const register = async (userData) => {
        try {
            console.log('Attempting registration with:', userData);
            await api.post('/auth/register', userData);
        } catch (err) {
            console.error('Registration API Error:', err.response?.data || err.message);
            throw err;
        }
    };

    const updateProfile = async (updates) => {
        try {
            const { data } = await api.put('/auth/update', updates);
            setUser(data.user);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } catch (err) {
            console.error('Profile Update Error:', err.response?.data || err.message);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, updateProfile, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
