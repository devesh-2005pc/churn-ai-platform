import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

    // Axios Interceptor for Authorization Header
    axios.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Global 401 Handler
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logout();
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        setUser(data.user);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
    };

    const register = async (userData) => {
        try {
            console.log('Attempting registration with:', userData);
            await axios.post('http://localhost:5000/api/auth/register', userData);
        } catch (err) {
            console.error('Registration API Error:', err.response?.data || err.message);
            throw err;
        }
    };

    const updateProfile = async (updates) => {
        try {
            const { data } = await axios.put('http://localhost:5000/api/auth/update', updates);
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
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, updateProfile, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
