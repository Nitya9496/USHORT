import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07070b',
        surface: {
          DEFAULT: '#0d0d14',
          subtle: '#12121e',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        neon: {
          cyan: '#00f0ff',
          pink: '#ff007f',
          purple: '#9d4edd',
          indigo: '#6366f1',
          lime: '#10b981',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(0, 240, 255, 0.55)',
        'glow-purple': '0 0 25px -4px rgba(157, 78, 221, 0.55)',
        'glow-pink': '0 0 25px -4px rgba(255, 0, 127, 0.55)',
        'glass-edge': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.55)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(20px)' },
          '50%': { opacity: '0.9', filter: 'blur(28px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
