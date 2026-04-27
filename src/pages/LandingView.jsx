import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, HeartPulse, QrCode, Smartphone, ArrowRight, ShieldCheck, Activity, Sparkles, User, Mail, MessageCircle, Sun, Moon, Users } from 'lucide-react';

export default function LandingView({ isDarkMode: propIsDarkMode, toggleTheme }) {
    const navigate = useNavigate();

    // Estado local para garantizar que el botón funcione incluso si no se pasa la función por props
    const [localIsDark, setLocalIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    // Sincronizar el estado local con las props si estas existen
    useEffect(() => {
        if (propIsDarkMode !== undefined) {
            setLocalIsDark(propIsDarkMode);
        }
    }, [propIsDarkMode]);

    // Usamos el estado sincronizado para renderizar
    const isDarkMode = typeof toggleTheme === 'function' ? propIsDarkMode : localIsDark;

    // Lógica robusta del botón de tema
    const handleToggleTheme = () => {
        if (typeof toggleTheme === 'function') {
            // Si el componente padre (App.jsx) pasa la función, la usamos
            toggleTheme();
        } else {
            // Si no, forzamos el cambio de clase en el HTML localmente (Igual que en App.jsx)
            const newMode = !localIsDark;
            setLocalIsDark(newMode);
            const root = document.documentElement;

            if (newMode) {
                root.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                root.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    };

    return (
        <div className={`w-full min-h-screen relative font-sans overflow-x-hidden transition-colors duration-500 ${
            isDarkMode ? 'bg-[#0f0c0b]' : 'bg-[#fcfaf9]'
        }`}>

            {/* --- ESTILOS LOCALES PARA ANIMACIONES (Slider Infinito) --- */}
            <style>
                {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
            </style>

            {/* --- NAVEGACIÓN TIPO PÍLDORA (Floating Navbar) --- */}
            <header className="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 transition-all duration-500">
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center backdrop-blur-xl rounded-[2.5rem] border shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-500 relative z-20 ${
                    isDarkMode ? 'bg-slate-900/40 border-slate-700/50' : 'bg-white/20 border-white/60'
                }`}>

                    {/* Logo */}
                    <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                            isDarkMode ? 'bg-seraphim-primary-dark shadow-seraphim-primary-dark/20' : 'bg-seraphim-primary shadow-seraphim-primary/30'
                        }`}>
                            <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                        </div>
                        <span className={`hidden sm:block text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Seraphim
            </span>
                    </div>

                    {/* Enlaces Desktop */}
                    <nav className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                        <a href="#inicio" className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 hover:after:w-full after:transition-all ${
                            isDarkMode ? 'hover:text-seraphim-primary-dark after:bg-seraphim-primary-dark' : 'hover:text-seraphim-primary after:bg-seraphim-primary'
                        }`}>Inicio</a>
                        <a href="#nosotros" className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 hover:after:w-full after:transition-all ${
                            isDarkMode ? 'hover:text-seraphim-primary-dark after:bg-seraphim-primary-dark' : 'hover:text-seraphim-primary after:bg-seraphim-primary'
                        }`}>Propósito</a>
                        <a href="#servicios" className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 hover:after:w-full after:transition-all ${
                            isDarkMode ? 'hover:text-seraphim-primary-dark after:bg-seraphim-primary-dark' : 'hover:text-seraphim-primary after:bg-seraphim-primary'
                        }`}>Servicios</a>
                    </nav>

                    {/* Botones Derecha */}
                    <div className="flex items-center gap-3 sm:gap-4">

                        {/* Toggle Tema Oscuro/Claro (Con la estética del botón global) */}
                        <button
                            onClick={handleToggleTheme}
                            className={`p-2.5 rounded-full backdrop-blur-md border shadow-sm transition-transform hover:scale-110 active:scale-95 flex items-center justify-center ${
                                isDarkMode
                                    ? 'bg-slate-800/60 border-slate-700/50 text-slate-200 hover:bg-slate-700/60'
                                    : 'bg-white/60 border-white/50 text-slate-800 hover:bg-white/80'
                            }`}
                            aria-label="Alternar tema"
                        >
                            {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-seraphim-primary" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
                        </button>

                        <button
                            onClick={() => navigate('/login')}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md hover:-translate-y-0.5 active:scale-95 ${
                                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
                            }`}
                        >
                            <User className="w-3.5 h-3.5" /> Ingresar
                        </button>
                    </div>
                </div>
            </header>

            {/* --- HERO SECTION (Inicio) --- */}
            <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 sm:pb-24 px-4 sm:px-6 text-center overflow-hidden">
                {/* Fondo animado SVG */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: isDarkMode ? '#FF8A8A' : '#FF6B6B', stopOpacity: isDarkMode ? 0.15 : 0.2 }} />
                                <stop offset="100%" style={{ stopColor: isDarkMode ? '#EF4444' : '#DC2626', stopOpacity: 0.05 }} />
                            </linearGradient>
                        </defs>
                        <circle cx="10" cy="80" r="30" fill="url(#grad1)" />
                        <circle cx="90" cy="20" r="25" fill="none" stroke={isDarkMode ? '#FF8A8A' : '#FF6B6B'} strokeWidth="0.05" opacity="0.3" />
                        <path d="M-10,85 Q25,45 50,85 T110,75" fill="none" stroke={isDarkMode ? '#334155' : '#cbd5e1'} strokeWidth="0.1" />
                        <path d="M-10,92 Q25,62 50,92 T110,82" fill="none" stroke={isDarkMode ? '#334155' : '#cbd5e1'} strokeWidth="0.1" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full mt-10 sm:mt-16">
                    {/* Título Gigante */}
                    <h1 className="tracking-tighter mb-6 leading-tight text-center">
            <span className={`block text-2xl sm:text-4xl md:text-5xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              Protección Vital Activa
            </span>
                        <span className={`text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r leading-[0.85] py-2 ${
                            isDarkMode ? 'from-seraphim-primary-dark to-seraphim-alert-dark' : 'from-seraphim-primary to-seraphim-alert'
                        }`}>
              Seraphim
            </span>
                    </h1>

                    <p className={`text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-10 max-w-2xl mx-auto px-4 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                        Tu bitácora de emergencia siempre contigo. Un código QR inteligente que brinda acceso instantáneo a tu perfil médico y contacta a tu familia en segundos.
                    </p>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-20 sm:mb-28 w-full sm:w-auto px-6">
                        <button
                            onClick={() => navigate('/login')}
                            className={`group px-10 py-4 sm:py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-white shadow-[0_20px_40px_-10px_rgba(255,107,107,0.4)] ${
                                isDarkMode ? 'bg-seraphim-primary-dark hover:bg-seraphim-alert-dark' : 'bg-seraphim-primary hover:bg-seraphim-alert'
                            }`}
                        >
                            Comenzar <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/sos/demo')}
                            className={`border px-10 py-4 sm:py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:shadow-lg flex items-center justify-center gap-2 ${
                                isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            <HeartPulse className={`w-4 h-4 ${isDarkMode ? 'text-seraphim-alert-dark' : 'text-seraphim-alert'}`} /> Simular
                        </button>
                    </div>

                    <div className="flex items-center gap-4 justify-center mb-8 px-6 w-full">
                        <div className={`h-px w-8 sm:w-12 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                        <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Características Principales
            </span>
                        <div className={`h-px w-8 sm:w-12 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                    </div>

                    {/* Slider Horizontal Infinito (Marquee) */}
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] mr-[50vw] overflow-hidden group cursor-grab active:cursor-grabbing">
                        <div className="animate-marquee">

                            {/* --- PRIMER SET DE TARJETAS --- */}
                            <div className="flex gap-6 sm:gap-8 px-3 sm:px-4">
                                {/* Card 1 */}
                                <div className={`w-[300px] sm:w-[450px] md:w-[550px] aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 relative ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
                                }`}>
                                    <div className={`absolute inset-0 transition-colors ${isDarkMode ? 'bg-slate-800/50 group-hover:bg-seraphim-primary-dark/10' : 'bg-slate-50/50 group-hover:bg-seraphim-primary/5'}`}></div>
                                    <QrCode className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 transition-all relative z-10 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Escaneo Universal</span>
                                </div>

                                {/* Card 2 */}
                                <div className={`w-[300px] sm:w-[450px] md:w-[550px] aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 relative ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
                                }`}>
                                    <div className={`absolute inset-0 transition-colors ${isDarkMode ? 'bg-slate-800/50 group-hover:bg-seraphim-alert-dark/10' : 'bg-slate-50/50 group-hover:bg-seraphim-alert/5'}`}></div>
                                    <Activity className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 transition-all relative z-10 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Perfil Médico Inmediato</span>
                                </div>

                                {/* Card 3 */}
                                <div className={`w-[300px] sm:w-[450px] md:w-[550px] aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 relative ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
                                }`}>
                                    <div className={`absolute inset-0 transition-colors ${isDarkMode ? 'bg-slate-800/50 group-hover:bg-emerald-500/10' : 'bg-slate-50/50 group-hover:bg-emerald-500/5'}`}></div>
                                    <Users className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 transition-all relative z-10 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Contactos de Emergencia</span>
                                </div>
                            </div>

                            {/* --- SEGUNDO SET DE TARJETAS (Duplicado para efecto infinito) --- */}
                            <div className="flex gap-6 sm:gap-8 px-3 sm:px-4">
                                <div className={`w-[300px] sm:w-[450px] md:w-[550px] aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 relative ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
                                }`}>
                                    <div className={`absolute inset-0 transition-colors ${isDarkMode ? 'bg-slate-800/50 group-hover:bg-seraphim-primary-dark/10' : 'bg-slate-50/50 group-hover:bg-seraphim-primary/5'}`}></div>
                                    <QrCode className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 transition-all relative z-10 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Escaneo Universal</span>
                                </div>

                                <div className={`w-[300px] sm:w-[450px] md:w-[550px] aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 relative ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
                                }`}>
                                    <div className={`absolute inset-0 transition-colors ${isDarkMode ? 'bg-slate-800/50 group-hover:bg-seraphim-alert-dark/10' : 'bg-slate-50/50 group-hover:bg-seraphim-alert/5'}`}></div>
                                    <Activity className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 transition-all relative z-10 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Perfil Médico Inmediato</span>
                                </div>

                                <div className={`w-[300px] sm:w-[450px] md:w-[550px] aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] border shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 relative ${
                                    isDarkMode ? 'bg-slate-900 border-slate-800 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
                                }`}>
                                    <div className={`absolute inset-0 transition-colors ${isDarkMode ? 'bg-slate-800/50 group-hover:bg-emerald-500/10' : 'bg-slate-50/50 group-hover:bg-emerald-500/5'}`}></div>
                                    <Users className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 transition-all relative z-10 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                                    <span className={`font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Contactos de Emergencia</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* --- NOSOTROS (Misión) --- */}
            <section id="nosotros" className={`relative z-10 py-24 sm:py-32 px-4 sm:px-6 border-t ${
                isDarkMode ? 'bg-[#151110] border-slate-800/50' : 'bg-white border-slate-100'
            }`}>
                <div className="max-w-4xl mx-auto text-center">
                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border animate-bounce-slow ${
                        isDarkMode ? 'bg-seraphim-primary-dark/10 text-seraphim-primary-dark border-seraphim-primary-dark/20' : 'bg-seraphim-primary/10 text-seraphim-primary border-seraphim-primary/20'
                    }`}>
                        <Sparkles className="w-10 h-10" />
                    </div>
                    <h2 className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-10 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Misión & Propósito
                    </h2>
                    <div className={`space-y-8 text-base sm:text-xl font-medium leading-relaxed max-w-3xl mx-auto px-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                        <p>En <span className={`font-bold ${isDarkMode ? 'text-seraphim-primary-dark' : 'text-seraphim-primary'}`}>Seraphim</span>, transformamos la complejidad médica en simplicidad. Creemos que cada persona merece una herramienta que hable por ellos cuando más lo necesitan.</p>
                        <p>Nuestra misión es empoderar a las personas proporcionando un pasaporte de salud escalable, seguro y vital, que centralice toda la información crítica a un escaneo de distancia.</p>
                    </div>
                </div>
            </section>

            {/* --- SERVICIOS (Características Grid) --- */}
            <section id="servicios" className={`relative z-10 py-24 sm:py-32 px-4 sm:px-6 border-t ${
                isDarkMode ? 'bg-[#0f0c0b] border-slate-800/50' : 'bg-slate-50 border-slate-100'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Nuestras Soluciones</h2>
                        <p className={`max-w-2xl mx-auto font-medium text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Todo lo que los paramédicos y familiares necesitan saber, integrado en una sola plataforma portátil.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className={`p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border group flex flex-col items-center text-center ${
                            isDarkMode ? 'bg-[#151110] border-slate-800' : 'bg-white border-slate-200'
                        }`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform ${
                                isDarkMode ? 'bg-seraphim-primary-dark/10 text-seraphim-primary-dark' : 'bg-seraphim-primary/10 text-seraphim-primary'
                            }`}><QrCode className="w-8 h-8" /></div>
                            <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Código QR Universal</h3>
                            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Formato optimizado de 3x3 cm listo para adherirse a tu Cédula. Funciona con la cámara nativa de cualquier smartphone.</p>
                        </div>

                        <div className={`p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border group flex flex-col items-center text-center ${
                            isDarkMode ? 'bg-[#151110] border-slate-800' : 'bg-white border-slate-200'
                        }`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform ${
                                isDarkMode ? 'bg-seraphim-alert-dark/10 text-seraphim-alert-dark' : 'bg-seraphim-alert/10 text-seraphim-alert'
                            }`}><Activity className="w-8 h-8" /></div>
                            <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Control Vital</h3>
                            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Muestra tipo de sangre, alergias, condiciones base y medicamentos para evitar negligencias en emergencias.</p>
                        </div>

                        <div className={`p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border group flex flex-col items-center text-center ${
                            isDarkMode ? 'bg-[#151110] border-slate-800' : 'bg-white border-slate-200'
                        }`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform ${
                                isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'
                            }`}><Users className="w-8 h-8" /></div>
                            <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Contactos Integrados</h3>
                            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Muestra al paramédico a quién llamar de inmediato, permitiendo notificaciones por WhatsApp en segundos.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- CONTACTO --- */}
            <section id="contacto" className={`relative z-10 py-24 sm:py-32 px-4 sm:px-6 border-t ${
                isDarkMode ? 'bg-[#151110] border-slate-800/50' : 'bg-white border-slate-200'
            }`}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`text-4xl sm:text-5xl font-black tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Conecta con Nosotros</h2>
                    <p className={`text-lg mb-12 max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        ¿Tienes dudas o necesitas ayuda con tu perfil? Estamos a un clic de distancia.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-center gap-4 sm:gap-5 px-2">

                        {/* Botón Email */}
                        <a href="mailto:soporte@seraphim.app" className={`group relative overflow-hidden flex items-center justify-center gap-3 p-4 sm:px-8 sm:py-5 rounded-2xl sm:rounded-[1.5rem] border-2 font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all ${
                            isDarkMode ? 'border-seraphim-primary-dark text-seraphim-primary-dark hover:text-white' : 'border-seraphim-primary text-seraphim-primary hover:text-white'
                        }`}>
                            <div className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0 ${isDarkMode ? 'bg-seraphim-primary-dark' : 'bg-seraphim-primary'}`}></div>
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" /> <span className="relative z-10">Correo</span>
                        </a>

                        {/* Botón WhatsApp */}
                        <a href="https://wa.me/" className="group relative overflow-hidden flex items-center justify-center gap-3 p-4 sm:px-8 sm:py-5 rounded-2xl sm:rounded-[1.5rem] border-2 border-emerald-500 text-emerald-500 font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all hover:text-white">
                            <div className="absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0 bg-emerald-500"></div>
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" /> <span className="relative z-10">WhatsApp</span>
                        </a>

                        {/* Botón Instagram - Reparado con SVG directo para evitar crash de versión en lucide-react */}
                        <a href="#" className="group relative overflow-hidden flex items-center justify-center gap-3 p-4 sm:px-8 sm:py-5 rounded-2xl sm:rounded-[1.5rem] border-2 border-pink-500 text-pink-500 font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all hover:text-white">
                            <div className="absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0 bg-pink-500"></div>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                            </svg>
                            <span className="relative z-10">Instagram</span>
                        </a>

                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className={`pt-20 sm:pt-32 pb-12 px-6 text-center border-t-8 relative z-10 ${
                isDarkMode ? 'bg-black border-seraphim-primary-dark' : 'bg-slate-950 border-seraphim-primary'
            }`}>
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-12 sm:gap-20 mb-20 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white border ${
                                    isDarkMode ? 'bg-seraphim-primary-dark/20 border-seraphim-primary-dark/30' : 'bg-white/10 border-white/10'
                                }`}><ShieldAlert className="w-6 h-6" /></div>
                                <span className="font-black text-2xl text-white tracking-tighter uppercase">SERAPHIM</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
                                El pasaporte médico definitivo. Seguridad, inmediatez y tecnología al servicio de tu vida.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end md:col-span-1">
                            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Soporte Legal</h4>
                            <nav className="flex flex-col gap-4 text-sm font-bold text-slate-500 items-center md:items-end">
                                <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
                                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                            </nav>
                        </div>
                    </div>

                    <div className="h-px w-full bg-slate-900 mb-12"></div>

                    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10">
                        <p className="text-sm font-bold text-slate-600 order-2 md:order-1">&copy; {new Date().getFullYear()} Seraphim App. Derechos Reservados.</p>
                        <div className="flex flex-col items-center md:items-end gap-3 order-1 md:order-2">
              <span className="flex items-center gap-2 text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
                <ShieldCheck className="w-3 h-3" /> Datos Encriptados
              </span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}