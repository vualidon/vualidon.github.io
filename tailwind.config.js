/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-blue': '#00f0ff',
                'neon-pink': '#ff00ff',
                'neon-purple': '#b026ff',
                'cyber-yellow': '#f7f01d',
                'cyber-black': '#0d0d0d',
                'cyber-dark': '#121212',
                'cyber-gray': '#1e1e1e',
            },
            fontFamily: {
                'cyber': ['Orbitron', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'glitch': 'glitch 1s linear infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glitch: {
                    '0%, 100%': { transform: 'translate(0)' },
                    '33%': { transform: 'translate(-5px, 2px)' },
                    '66%': { transform: 'translate(5px, -2px)' },
                },
                glow: {
                    '0%': { textShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' },
                    '100%': { textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff' },
                },
            },
        },
    },
    plugins: [],
}; 