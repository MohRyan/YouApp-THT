import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-tr': 'radial-gradient(circle at top right, var(--tw-gradient-stops) 50%, transparent 70%)',
      },
      colors: {
        primary: '#09141A',
        'gradient-start': '#1F4247',
        'gradient-end': '#0D1D23',
      },
      animation: {
        fadeIn: 'fadeIn 8s ease-out',
        fadeRegis: 'fadeRegis 8s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '50%': { opacity: '1', transform: 'translateY(0)' },
          '90%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { display: 'hidden' },
        },
        fadeRegis: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '50%': { opacity: '0', transform: 'translateY(0)' },
          '90%': { opacity: '0', transform: 'translateY(0)' },
          '92%': { opacity: '1', transform: 'translateY(50px)' },
          '100%': { display: 'hidden' },
        },
      }
    },
  },
  plugins: [],
}
export default config
