import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowLeft } from 'lucide-react';

export default function SOSView({ isDarkMode }) {
    const navigate = useNavigate();

    return (
        <div className={`backdrop-blur-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-10 rounded-3xl max-w-md w-full text-center relative z-10 transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/70 border-white/60'
        }`}>
            <HeartPulse className="w-16 h-16 text-seraphim-alert mx-auto mb-4 animate-pulse drop-shadow-lg" />
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Perfil de Emergencia</h2>
            <p className={`mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Esta es la vista que verá el paramédico al escanear el QR.</p>

            <button onClick={() => navigate('/')} className={`flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}>
                <ArrowLeft className="w-4 h-4" /> Terminar Simulación
            </button>
        </div>
    );
}