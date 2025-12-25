import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Chrome Palette
        chrome: {
          light: '#E3E3E3',
          DEFAULT: '#C0C0C3',
          dark: '#A8A9AD',
          steel: '#4B505A',
        },
        // Neon Palette
        neon: {
          cyan: '#04D9FF',
          blue: '#1F51FF',
          purple: '#8A00C4',
          pink: '#FB48C4',
          orange: '#FF5C00',
          green: '#2CFF05',
          yellow: '#FFFF00',
        },
        // Background System
        bg: {
          deepest: '#0B192A',
          primary: '#1E1E1E',
          charcoal: '#232729',
        },
        // Surface Elevations
        surface: {
          1: '#2E2E2E',
          2: '#383838',
          3: '#424242',
        },
        // Text Hierarchy
        text: {
          primary: '#FAFAFA',
          secondary: '#B0B0B0',
          tertiary: '#808080',
        },
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      backgroundImage: {
        'chrome-gradient': 'linear-gradient(135deg, #A8A9AD 0%, #B4B5B8 20%, #C0C0C3 40%, #CBCCCD 60%, #D7D7D8 80%, #E3E3E3 100%)',
        'chrome-reflective': 'linear-gradient(180deg, #4B505A 0%, #B0C4DE 25%, #D1E1F6 50%, #CCCCCC 75%, #D8D8D8 100%)',
        'chrome-flow': 'linear-gradient(90deg, #999 5%, #fff 10%, #ccc 30%, #ddd 50%, #ccc 70%, #fff 80%, #999 95%)',
        'neon-glow': 'linear-gradient(135deg, #04D9FF 0%, #8A00C4 100%)',
        'laser-grid': `
          linear-gradient(rgba(4, 217, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(4, 217, 255, 0.1) 1px, transparent 1px)
        `,
      },
      animation: {
        'shine-sweep': 'shine-sweep 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'grid-scroll': 'grid-scroll 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'shine-sweep': {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(4, 217, 255, 0.4)',
          },
          '50%': {
            opacity: '0.7',
            boxShadow: '0 0 40px rgba(4, 217, 255, 0.6)',
          },
        },
        'grid-scroll': {
          '0%': { transform: 'rotateX(60deg) translateZ(-500px) translateY(0)' },
          '100%': { transform: 'rotateX(60deg) translateZ(-500px) translateY(100px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(4, 217, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(4, 217, 255, 0.8)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(4, 217, 255, 0.5), 0 0 30px rgba(4, 217, 255, 0.3)',
        'neon-purple': '0 0 15px rgba(138, 0, 196, 0.5), 0 0 30px rgba(138, 0, 196, 0.3)',
        'neon-pink': '0 0 15px rgba(251, 72, 196, 0.5), 0 0 30px rgba(251, 72, 196, 0.3)',
        'chrome': '0 2px 5px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
    },
  },
  plugins: [],
};

export default config;
