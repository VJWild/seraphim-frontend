import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

import LandingView from './pages/LandingView';

import AuthView from './pages/AuthView';
import SOSView from './pages/SOSView';
import OnboardingView from './pages/OnboardingView';


// Componente interno para poder usar el hook useLocation de Riak' Router
function AppLayout({ isDarkMode, toggleTheme }) {
    const location = useLocation();

    // Verificamos si estamos en la Landing Page
    const isLandingPage = location.pathname === '/';

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden">

            {/* Toggle Modo Oscuro Global: Solo se muestra si NO estamos en el Landing */}
            {!isLandingPage && (
                <button
                    onClick={toggleTheme}
                    className={`absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                        isDarkMode
                            ? 'bg-slate-800/60 border-slate-700/50 text-slate-200 hover:bg-slate-700/60'
                            : 'bg-white/60 border-white/50 text-slate-800 hover:bg-white/80'
                    }`}
                    aria-label="Alternar tema"
                >
                    {isDarkMode ? <Sun className="w-5 h-5 text-seraphim-primary" /> : <Moon className="w-5 h-5 text-slate-700" />}
                </button>
            )}

            {/* Fondos decorativos Globales (Visibles en todas las pantallas) */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-seraphim-primary/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-seraphim-alert/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* Router de Vistas */}
            <Routes>
                {/* Le pasamos el toggleTheme a la LandingView para que use su propio botón en la Navbar */}
                <Route path="/" element={<LandingView isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                <Route path="/login" element={<AuthView isDarkMode={isDarkMode} />} />
                <Route path="/sos/demo" element={<SOSView isDarkMode={isDarkMode} />} />
                <Route path="/sos/:slug" element={<SOSView isDarkMode={isDarkMode} />} />
                <Route path="/onboarding" element={<OnboardingView isDarkMode={isDarkMode} />} />
                <Route path="/dashboard" element={<h1 className="text-slate-800 dark:text-white relative z-10 font-bold text-2xl">Dashboard (En construcción)</h1>} />
            </Routes>

        </div>
    );
}

export default function App() {
    // Estado global para el Modo Oscuro
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Efecto para aplicar la clase 'dark' al HTML
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <Router>
            {/* Renderizamos el Layout interno pasándole las funciones del tema */}
            <AppLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </Router>
    );
}