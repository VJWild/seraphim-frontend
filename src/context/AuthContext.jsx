import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


import api from '../services/api';

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// ==========================================================

// Creamos el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Al cargar la app, verificamos si hay un token válido guardado
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    // Pide a Laravel los datos del usuario dueño de este token
                    const response = await api.get('/user');
                    setUser(response.data);
                } catch (error) {
                    console.error("Token inválido o expirado");
                    localStorage.removeItem('auth_token');
                    setUser(null);
                }
            }
            setLoading(false); // Terminamos de cargar
        };

        checkAuth();
    }, []);

    // Función para Iniciar Sesión
    const login = async (email, password) => {
        const response = await api.post('/login', { email, password });

        // Guardamos el token que nos da Laravel
        localStorage.setItem('auth_token', response.data.access_token);
        setUser(response.data.user);

        return response.data;
    };

    // Función para Registrarse
    const register = async (userData) => {
        const response = await api.post('/register', userData);

        // Guardamos el token del nuevo usuario
        localStorage.setItem('auth_token', response.data.access_token);
        setUser(response.data.user);

        return response.data;
    };

    // Función para Cerrar Sesión
    const logout = async () => {
        try {
            // Le avisamos a Laravel que invalide el token
            await api.post('/logout');
        } catch (error) {
            console.error("Error al cerrar sesión en el servidor", error);
        } finally {
            // Sin importar lo que responda Laravel, borramos los datos locales
            localStorage.removeItem('auth_token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {/* Solo renderizamos la app cuando terminamos de verificar el token inicial */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar este contexto fácilmente en cualquier componente
export const useAuth = () => {
    return useContext(AuthContext);
};