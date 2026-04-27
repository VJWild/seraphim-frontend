import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle, ChevronDown, MapPin } from 'lucide-react';

// ⚠️ NOTA PARA TU PROYECTO LOCAL:
// Descomenta tu instancia de Axios para la conexión real
// import api from '../services/api';

// ⚠️ SIMULACIÓN PARA EL CANVAS (Borrar en tu proyecto)
const api = {
    post: async (url, data) => new Promise((resolve) => setTimeout(() => resolve({ data: { message: 'ok' } }), 1500))
};

/* ==========================================================================
   🧩 COMPONENTES DE UI PREMIUM LOCALES
   ========================================================================== */

const FloatingInput = ({ id, type, label, isDarkMode, required, value, onChange, placeholder = " " }) => (
    <div className="relative group transition-all duration-500 ease-in-out w-full mb-6">
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
            placeholder={placeholder}
            required={required}
        />
        <label
            htmlFor={id}
            className={`absolute text-sm font-medium duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-0 cursor-text 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-6
      ${type === 'date' ? 'scale-75 -translate-y-6 peer-placeholder-shown:scale-75 peer-placeholder-shown:-translate-y-6' : '' /* Mantiene el label arriba para inputs de fecha */}
      ${isDarkMode ? 'text-slate-400 peer-focus:text-seraphim-primary-dark' : 'text-slate-500 peer-focus:text-seraphim-primary'}`}
        >
            {label}
        </label>
    </div>
);

// Componente para Google Maps Autocomplete
const GooglePlacesInput = ({ id, label, isDarkMode, required, value, onChange, onPlaceSelected }) => {
    const inputRef = useRef(null);

    // Inicialización de Google Places API
    useEffect(() => {
        // Verifica si el script de Google Maps está cargado en el entorno
        if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['geocode', 'establishment'],
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                // Actualizamos el valor visible en el input
                onChange({ target: { value: inputRef.current.value } });

                // Si el lugar tiene coordenadas (geolocalización exitosa)
                if (place.geometry && place.geometry.location) {
                    onPlaceSelected({
                        address: place.formatted_address || inputRef.current.value,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    });
                }
            });
        }
    }, [onPlaceSelected, onChange]);

    return (
        <div className="relative group transition-all duration-500 ease-in-out w-full mb-6">
            <input
                ref={inputRef}
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                className={`block py-2.5 px-0 pl-7 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors ${
                    isDarkMode
                        ? 'border-seraphim-primary-dark/50 text-white focus:border-seraphim-primary-dark'
                        : 'border-slate-300 text-slate-900 focus:border-seraphim-primary'
                }`}
                placeholder=" "
                required={required}
            />
            <MapPin className={`absolute left-0 top-3 w-5 h-5 transition-colors ${
                isDarkMode ? 'text-slate-400 group-focus-within:text-seraphim-primary-dark' : 'text-slate-500 group-focus-within:text-seraphim-primary'
            }`} />
            <label
                htmlFor={id}
                className={`absolute text-sm font-medium duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-7 cursor-text 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-6
        ${isDarkMode ? 'text-slate-400 peer-focus:text-seraphim-primary-dark' : 'text-slate-500 peer-focus:text-seraphim-primary'}`}
            >
                {label}
            </label>
            <p className={`text-[10px] mt-1 italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Comienza a escribir y selecciona tu dirección de la lista.
            </p>
        </div>
    );
};

// Nuevo Selector Estilo SaaS Premium
const PremiumSelect = ({ label, value, onChange, options, isDarkMode, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    // Cierra el menú si se hace clic afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || '';

    return (
        <div className="relative group transition-all duration-500 ease-in-out w-full mb-6" ref={selectRef}>
            <div
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 cursor-pointer flex justify-between items-center transition-colors ${
                    isDarkMode
                        ? `text-white ${isOpen ? 'border-seraphim-primary-dark' : 'border-seraphim-primary-dark/50 hover:border-seraphim-primary-dark/80'}`
                        : `text-slate-900 ${isOpen ? 'border-seraphim-primary' : 'border-slate-300 hover:border-seraphim-primary/50'}`
                }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`${!value ? 'opacity-0' : 'opacity-100'}`}>{selectedLabel || 'Placeholder'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isDarkMode ? (isOpen ? 'text-seraphim-primary-dark' : 'text-slate-400') : (isOpen ? 'text-seraphim-primary' : 'text-slate-500')}`} />
            </div>

            <label
                className={`absolute text-sm font-medium duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-0 pointer-events-none
        ${!value && !isOpen ? 'scale-100 translate-y-0' : 'scale-75 -translate-y-6'}
        ${isDarkMode ? (isOpen ? 'text-seraphim-primary-dark' : 'text-slate-400') : (isOpen ? 'text-seraphim-primary' : 'text-slate-500')}`}
            >
                {label} {required && '*'}
            </label>

            {/* Menú Desplegable Premium */}
            {isOpen && (
                <ul className={`absolute w-full mt-2 z-50 max-h-56 overflow-y-auto rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border backdrop-blur-xl transition-all animate-fade-in-down ${
                    isDarkMode ? 'bg-slate-800/95 border-slate-700 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-700'
                }`}>
                    {options.map(opt => (
                        <li
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setIsOpen(false); }}
                            className={`px-4 py-3 text-sm cursor-pointer transition-colors border-b last:border-b-0 ${
                                isDarkMode ? 'border-slate-700/50 hover:bg-slate-700/50' : 'border-slate-100 hover:bg-slate-50'
                            } ${value === opt.value ? (isDarkMode ? 'bg-seraphim-primary-dark/20 text-seraphim-primary-dark font-medium' : 'bg-seraphim-primary/10 text-seraphim-primary font-medium') : ''}`}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

/* ==========================================================================
   📄 VISTA DE ONBOARDING
   ========================================================================== */

export default function OnboardingView({ isDarkMode }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Estados Paso 1
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [docType, setDocType] = useState('V');
    const [docNumber, setDocNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState(''); // Uso nativo de <input type="date">
    const [gender, setGender] = useState('');

    // Estados Paso 2
    const [bloodType, setBloodType] = useState('');
    const [addressText, setAddressText] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const handleNextStep = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !docNumber || !phoneNumber || !birthDate || !gender) {
            setErrorMsg('Por favor completa todos los campos para continuar.');
            return;
        }
        setErrorMsg('');
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bloodType || !addressText) {
            setErrorMsg('Por favor completa los campos médicos y de ubicación.');
            return;
        }

        setErrorMsg('');
        setIsLoading(true);

        // Ensamblamos la data exactamente como la espera Laravel
        const payload = {
            full_name: `${firstName.trim()} ${lastName.trim()}`,
            id_number: `${docType}-${docNumber.trim()}`,
            birth_date: birthDate,
            gender: gender,
            phone_number: phoneNumber,
            blood_type: bloodType,
            address_text: addressText,
            latitude: latitude,
            longitude: longitude
        };

        try {
            await api.post('/profile', payload);
            navigate('/dashboard');
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'Hubo un problema al crear tu perfil. Intenta de nuevo.';
            setErrorMsg(serverMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full relative z-10 py-10">
            <div className={`backdrop-blur-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 sm:p-10 rounded-3xl max-w-lg w-full transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900/80 border-seraphim-primary-dark/30' : 'bg-white/70 border-white/60'
            }`}>

                {/* Encabezado e Indicador de Pasos */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${step === 1 ? (isDarkMode ? 'bg-seraphim-primary-dark text-slate-900' : 'bg-seraphim-primary text-white') : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-500')}`}>
                            <User className="w-5 h-5" />
                        </div>
                        <div className={`h-1 w-12 rounded-full transition-colors duration-500 ${step === 2 ? (isDarkMode ? 'bg-seraphim-primary-dark' : 'bg-seraphim-primary') : (isDarkMode ? 'bg-slate-800' : 'bg-slate-200')}`}></div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${step === 2 ? (isDarkMode ? 'bg-seraphim-alert-dark text-white' : 'bg-seraphim-alert text-white') : (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-500')}`}>
                            <Activity className="w-5 h-5" />
                        </div>
                    </div>

                    <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {step === 1 ? 'Tu Identidad' : 'Datos Vitales'}
                    </h2>
                    <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {step === 1 ? 'Paso 1: Información básica para tu credencial.' : 'Paso 2: Lo que los paramédicos necesitan saber.'}
                    </p>
                </div>

                {/* Caja de Errores */}
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

                {/* Formulario Dinámico */}
                <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>

                    {/* PASO 1 */}
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <div className="grid grid-cols-2 gap-4">
                                <FloatingInput id="first_name" type="text" label="Nombres" isDarkMode={isDarkMode} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                <FloatingInput id="last_name" type="text" label="Apellidos" isDarkMode={isDarkMode} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>

                            {/* Cédula Combinada */}
                            <div className="flex gap-4">
                                <div className="w-24 shrink-0">
                                    <PremiumSelect
                                        label="Tipo"
                                        isDarkMode={isDarkMode}
                                        value={docType}
                                        onChange={setDocType}
                                        options={[{value: 'V', label: 'V'}, {value: 'E', label: 'E'}, {value: 'J', label: 'J'}, {value: 'P', label: 'P'}]}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <FloatingInput id="doc_number" type="tel" label="Número de Identidad" isDarkMode={isDarkMode} value={docNumber} onChange={(e) => setDocNumber(e.target.value.replace(/\D/g, ''))} required />
                                </div>
                            </div>

                            {/* Teléfono */}
                            <FloatingInput id="phone_number" type="tel" label="Número de Teléfono (Ej: 0414...)" isDarkMode={isDarkMode} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} required />

                            {/* Selector de Fecha Nativo (iOS / Android Style) */}
                            <div className="flex gap-4">
                                <div className="w-2/3">
                                    <FloatingInput
                                        id="birth_date"
                                        type="date"
                                        label="Fecha de Nacimiento"
                                        isDarkMode={isDarkMode}
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-1/3">
                                    <PremiumSelect
                                        label="Género"
                                        isDarkMode={isDarkMode}
                                        value={gender}
                                        onChange={setGender}
                                        options={[{value: 'M', label: 'Masculino'}, {value: 'F', label: 'Femenino'}, {value: 'Otro', label: 'Otro'}]}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className={`mt-2 group relative overflow-hidden rounded-xl border-2 px-4 py-3.5 font-bold transition-colors w-full flex items-center justify-center gap-2 shadow-md ${
                                isDarkMode
                                    ? 'border-seraphim-primary-dark bg-slate-800/40 text-seraphim-primary-dark hover:text-white'
                                    : 'border-seraphim-primary bg-white/40 text-seraphim-primary hover:text-white'
                            }`}>
                                <div className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${isDarkMode ? 'bg-seraphim-primary-dark' : 'bg-seraphim-primary'}`}></div>
                                <span className="relative z-10 flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></span>
                            </button>
                        </div>
                    )}

                    {/* PASO 2 */}
                    {step === 2 && (
                        <div className="animate-fade-in">
                            <PremiumSelect
                                label="Tipo de Sangre"
                                isDarkMode={isDarkMode}
                                value={bloodType}
                                onChange={setBloodType}
                                options={[
                                    {value: 'A+', label: 'A Positivo (A+)'}, {value: 'A-', label: 'A Negativo (A-)'},
                                    {value: 'B+', label: 'B Positivo (B+)'}, {value: 'B-', label: 'B Negativo (B-)'},
                                    {value: 'AB+', label: 'AB Positivo (AB+)'}, {value: 'AB-', label: 'AB Negativo (AB-)'},
                                    {value: 'O+', label: 'O Positivo (O+)'}, {value: 'O-', label: 'O Negativo (O-)'}
                                ]}
                                required
                            />

                            {/* Nuevo Input de Google Maps Autocomplete */}
                            <GooglePlacesInput
                                id="address_text"
                                label="Dirección de Residencia Exacta"
                                isDarkMode={isDarkMode}
                                value={addressText}
                                onChange={(e) => setAddressText(e.target.value)}
                                onPlaceSelected={(place) => {
                                    setAddressText(place.address);
                                    setLatitude(place.lat);
                                    setLongitude(place.lng);
                                }}
                                required
                            />

                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => setStep(1)} className={`w-1/3 rounded-xl border-2 px-4 py-3.5 font-bold transition-colors flex items-center justify-center shadow-sm ${
                                    isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500' : 'border-slate-300 text-slate-600 hover:bg-white'
                                }`}>
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <button type="submit" disabled={isLoading} className={`w-2/3 group relative overflow-hidden rounded-xl border-2 px-4 py-3.5 font-bold transition-colors flex items-center justify-center gap-2 shadow-md ${
                                    isDarkMode
                                        ? 'border-seraphim-alert-dark bg-slate-800/40 text-seraphim-alert-dark hover:text-white disabled:opacity-50'
                                        : 'border-seraphim-alert bg-white/40 text-seraphim-alert hover:text-white disabled:opacity-50'
                                }`}>
                                    {!isLoading && <div className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${isDarkMode ? 'bg-seraphim-alert-dark' : 'bg-seraphim-alert'}`}></div>}
                                    <span className="relative z-10 flex items-center gap-2">
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                                        {isLoading ? 'Guardando...' : 'Crear Perfil Vital'}
                                        {!isLoading && <CheckCircle2 className="w-5 h-5" />}
                  </span>
                                </button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}