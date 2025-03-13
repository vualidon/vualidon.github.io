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
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100%',
                        color: '#fff',
                        h1: {
                            color: '#00f0ff',
                        },
                        h2: {
                            color: '#00f0ff',
                        },
                        h3: {
                            color: '#00f0ff',
                        },
                        strong: {
                            color: '#fff',
                        },
                        a: {
                            color: '#b026ff',
                            '&:hover': {
                                color: '#00f0ff',
                            },
                        },
                        code: {
                            color: '#f7f01d',
                            backgroundColor: '#121212',
                            padding: '0.25rem',
                            borderRadius: '0.25rem',
                        },
                        pre: {
                            backgroundColor: '#121212',
                            color: '#fff',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                        },
                        blockquote: {
                            borderLeftColor: '#00f0ff',
                            color: '#fff',
                            backgroundColor: 'rgba(0, 240, 255, 0.05)',
                            borderRadius: '0.25rem',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}; 