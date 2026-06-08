import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#03060F',
          900: '#060C1A',
          800: '#0A1628',
          700: '#0F2040',
          600: '#162D58',
        },
        electric: {
          400: '#4D9FFF',
          500: '#2563EB',
          600: '#1D4ED8',
        },
        glow: '#60A5FA',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
        'orbit': 'orbit 20s linear infinite',
        'card-enter': 'cardEnter 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'skeleton': 'skeletonShimmer 2s ease-in-out infinite',
        'cart-pop': 'cartPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shine': 'shineSweep 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        cardEnter: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.92)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)',
        'radial-blue': 'radial-gradient(ellipse at center, rgba(37,99,235,0.25) 0%, transparent 70%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'shimmer-text': 'linear-gradient(90deg, #93C5FD 0%, #FFFFFF 40%, #60A5FA 60%, #93C5FD 100%)',
      },
    },
  },
  plugins: [],
}
export default config
