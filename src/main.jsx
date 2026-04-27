import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // <--- ¡Esta es la línea que te falta!
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'; // Tu nuevo contexto

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
);