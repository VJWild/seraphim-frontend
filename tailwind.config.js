/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Habilita el modo oscuro manual con la clase 'dark'
    theme: {
        extend: {
            fontFamily: {
                // Establecemos Poppins como la fuente principal
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                seraphim: {
                    light: '#FEF8F7',      // Fondo modo claro (Blanco hueso/salmón)
                    dark: '#1C1514',       // Fondo modo oscuro
                    primary: '#FF6B6B',    // Salmón de marca
                    primaryDark: '#FF8A8A',// Salmón para modo oscuro
                    alert: '#DC2626',      // Rojo profundo de emergencia
                    alertDark: '#EF4444',  // Rojo vibrante modo oscuro
                }
            }
        },
    },
    plugins: [],
}