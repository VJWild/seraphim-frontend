import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

// ⚠️ NOTA PARA TU PROYECTO LOCAL (PHPStorm):
// Descomenta la siguiente línea para usar tu contexto real:
// import { useAuth } from '../context/AuthContext';

// ⚠️ Y BORRA esta función simulada. Solo está aquí para que el Canvas pueda compilar la vista:
const useAuth = () => {
    return {
        login: async (email, password) => new Promise(resolve => setTimeout(resolve, 1500)),
        register: async (data) => new Promise(resolve => setTimeout(resolve, 1500))
    };
};

/* ==========================================================================
   🧩 COMPONENTES DE UI LOCALES
   ========================================================================== */

const FloatingInput = ({ id, type, label, isDarkMode, required, isHidden = false, value, onChange }) => {
    return (
        <div className={`relative group transition-all duration-500 ease-in-out overflow-visible ${
            isHidden ? 'max-h-0 opacity-0 mb-0 invisible' : 'max-h-[70px] opacity-100 mb-8 visible'
        }`}>
            {/* Cambio estético: Bordes rojos/salmón en modo oscuro usando la clase correcta (con guiones) */}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors ${
                    isDarkMode
                        ? 'border-seraphim-primary-dark/50 text-white focus:border-seraphim-primary-dark'
                        : 'border-slate-300 text-slate-900 focus:border-seraphim-primary'
                }`}
                placeholder=" "
                required={required}
                disabled={isHidden}
            />
            <label
                htmlFor={id}
                className={`absolute text-sm font-medium duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-0 cursor-text 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-6
        ${isDarkMode
                    ? 'text-slate-400 peer-focus:text-seraphim-primary-dark'
                    : 'text-slate-500 peer-focus:text-seraphim-primary'
                }`}
            >
                {label}
            </label>
        </div>
    );
};

const AuthContainer = ({ isDarkMode, onBack, title, subtitle, icon: Icon, children }) => {
    return (
        <div className={`backdrop-blur-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 sm:p-10 rounded-3xl max-w-md w-full relative z-10 transition-colors duration-300 ${
            /* Cambio estético: El contenedor en modo oscuro ahora tiene un sutil borde salmón/rojo transparente */
            isDarkMode ? 'bg-slate-900/80 border-seraphim-primary-dark/30' : 'bg-white/70 border-white/60'
        }`}>
            {onBack && (
                <button
                    onClick={onBack}
                    type="button"
                    className={`absolute top-6 left-6 p-2 rounded-full transition-colors ${
                        isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-seraphim-primary-dark' : 'text-slate-500 hover:bg-white/80 hover:text-seraphim-primary'
                    }`}
                    aria-label="Volver"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            )}
            <div className="text-center mb-10 mt-2">
                {Icon && <Icon className={`w-14 h-14 mx-auto mb-3 drop-shadow-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-seraphim-primary-dark' : 'text-seraphim-primary'
                }`} strokeWidth={1.5} />}

                <h2 className={`text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                    {title}
                </h2>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                    {subtitle}
                </p>
            </div>
            {children}
        </div>
    );
};

/* ==========================================================================
   📄 VISTA PRINCIPAL DE AUTENTICACIÓN
   ========================================================================== */

export default function AuthView({ isDarkMode }) {
    const navigate = useNavigate();
    const { login, register } = useAuth();

    // Estados de UI
    const [isLoginView, setIsLoginView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Estados de los campos
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // Función que maneja el envío del formulario al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            if (isLoginView) {
                await login(email, password);
                navigate('/dashboard'); // Redirección tras Login
            } else {
                if (password !== passwordConfirmation) {
                    setErrorMsg('Las contraseñas no coinciden.');
                    setIsLoading(false);
                    return;
                }
                await register({ email, password, password_confirmation: passwordConfirmation });
                navigate('/onboarding'); // Redirección tras Registro
            }
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'Ha ocurrido un error en el servidor. Intenta de nuevo.';
            setErrorMsg(serverMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const containerProps = {
        isDarkMode,
        onBack: () => navigate('/'),
        icon: UserCircle,
        title: isLoginView ? 'Bienvenido de vuelta' : 'Crea tu bitácora',
        subtitle: isLoginView ? 'Ingresa para acceder a tus datos vitales' : 'Tu ángel guardián te espera'
    };

    return (
        <div className="flex justify-center items-center w-full">
            <AuthContainer {...containerProps}>

                {/* Caja de Errores - Adaptada al modo oscuro con alert-dark */}
                {errorMsg && (
                    <div className={`mb-6 p-3 rounded-xl flex items-start gap-3 animate-fade-in-down border ${
                        isDarkMode
                            ? 'bg-seraphim-alert-dark/10 border-seraphim-alert-dark/20 text-seraphim-alert-dark'
                            : 'bg-seraphim-alert/10 border-seraphim-alert/20 text-seraphim-alert'
                    }`}>
                        <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isDarkMode ? 'text-seraphim-alert-dark' : 'text-seraphim-alert'}`} />
                        <p className="text-sm font-medium">{errorMsg}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <FloatingInput
                        id="email"
                        type="email"
                        label="Correo Electrónico"
                        isDarkMode={isDarkMode}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <FloatingInput
                        id="password"
                        type="password"
                        label="Contraseña"
                        isDarkMode={isDarkMode}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <FloatingInput
                        id="password_confirmation"
                        type="password"
                        label="Confirmar Contraseña"
                        isDarkMode={isDarkMode}
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required={!isLoginView}
                        isHidden={isLoginView}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`group relative overflow-hidden rounded-xl border-2 px-4 py-3.5 font-bold transition-colors w-full flex items-center justify-center gap-2 shadow-md mt-6 ${
                            isDarkMode
                                /* Cambio estético: Ahora usa seraphim-primary-dark */
                                ? 'border-seraphim-primary-dark bg-slate-800/40 text-seraphim-primary-dark hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                                : 'border-seraphim-primary bg-white/40 text-seraphim-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                    >
                        {!isLoading && (
                            <div className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${
                                isDarkMode ? 'bg-seraphim-primary-dark' : 'bg-seraphim-primary'
                            }`}></div>
                        )}
                        <span className="relative z-10 flex items-center gap-2">
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isLoading
                                ? 'Procesando...'
                                : (isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta')
                            }
            </span>
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {isLoginView ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoginView(!isLoginView);
                                setErrorMsg(''); // Limpiamos errores al cambiar de vista
                            }}
                            className={`font-bold transition-colors hover:underline outline-none ${
                                isDarkMode ? 'text-seraphim-primary-dark hover:text-white' : 'text-seraphim-primary hover:text-seraphim-alert'
                            }`}
                        >
                            {isLoginView ? 'Regístrate aquí' : 'Inicia Sesión'}
                        </button>
                    </p>
                </div>
            </AuthContainer>
        </div>
    );
}