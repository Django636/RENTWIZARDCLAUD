import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfb',
          100: '#ccf9f1',
          200: '#99f3e6',
          300: '#66edda',
          400: '#33e8ce',
          500: '#00e0c7',
          600: '#00b8a0',
          700: '#008f7f',
          800: '#00665f',
          900: '#003d3f',
        },
        error: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffcccc',
          300: '#ffb3b3',
          400: '#ff8080',
          500: '#ff4d4d',
          600: '#ff3333',
          700: '#cc2121',
          800: '#991818',
          900: '#661010',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#f1f5f9',
            a: {
              color: '#00e0c7',
              '&:hover': {
                color: '#00b8a0',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;