import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, HeartPulse, UserCircle } from 'lucide-react';

export default function HomeView({ isDarkMode }) {
    const navigate = useNavigate();

    return (
        <>
            <div className={`backdrop-blur-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-10 rounded-3xl max-w-md w-full text-center relative z-10 transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/70 border-white/60'
            }`}>
                <div className={`w-24 h-24 backdrop-blur-sm border shadow-inner rounded-full flex items-center justify-center mx-auto mb-6 relative transition-colors duration-300 ${
                    isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/50 border-white/60'
                }`}>
                    <ShieldAlert className="w-12 h-12 text-seraphim-primary drop-shadow-sm" strokeWidth={1.5} />
                    <div className={`absolute -bottom-1 -right-1 w-8 h-8 text-white bg-seraphim-alert gota-sangre shadow-lg border-2 transition-colors duration-300 ${
                        isDarkMode ? 'border-slate-800' : 'border-white'
                    }`}>
                        <span className="text-[9px] font-bold tracking-wider">SOS</span>
                    </div>
                </div>

                <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    Seraphim
                </h1>
                <p className={`mb-8 font-medium transition-colors duration-300 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Hablamos por ti cuando tú no puedes.
                </p>

                <div className="flex flex-col space-y-4">
                    <button onClick={() => navigate('/login')} className={`group relative overflow-hidden rounded-xl border-2 border-seraphim-primary px-4 py-3.5 font-bold text-seraphim-primary transition-colors hover:text-white w-full flex items-center justify-center gap-2 shadow-sm ${
                        isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
                    }`}>
                        <div className="absolute inset-0 -translate-x-full bg-seraphim-primary transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                        <UserCircle className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Acceder a mi Panel</span>
                    </button>

                    <button onClick={() => navigate('/sos/demo')} className={`group relative overflow-hidden rounded-xl border-2 border-seraphim-alert px-4 py-3.5 font-bold text-seraphim-alert transition-colors hover:text-white w-full flex items-center justify-center gap-2 shadow-sm ${
                        isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
                    }`}>
                        <div className="absolute inset-0 -translate-x-full bg-seraphim-alert transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                        <HeartPulse className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Simular Escaneo SOS</span>
                    </button>
                </div>
            </div>

            <div className={`mt-8 backdrop-blur-md px-5 py-2 rounded-full border shadow-sm relative z-10 transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white/60 border-white/50'
            }`}>
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Plataforma Segura • Fase 3 Iniciada
                </p>
            </div>
        </>
    );
}