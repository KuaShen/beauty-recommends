import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  '#FFF5F7',
          100: '#FFE8ED',
          200: '#FFD1DC',
          300: '#FFA7BB',
          400: '#F57E9A',
          500: '#E86584',
          600: '#D44A6B',
          700: '#B83855',
          800: '#9A2F47',
          900: '#802A3D',
        },
        lavender: {
          50:  '#F8F5FA',
          100: '#F0EAF4',
          200: '#E1D5EA',
          300: '#CBB5D8',
          400: '#B28FC4',
          500: '#9B73AF',
          600: '#835A96',
          700: '#6C497C',
          800: '#5A3D66',
          900: '#4C3456',
        },
        cream: {
          50:  '#FFFCF8',
          100: '#FFF8F0',
          200: '#FFF0E0',
          300: '#FFE5CC',
          400: '#FFD6B3',
          500: '#F5C69A',
        },
        gold: {
          50:  '#FDFAF5',
          100: '#F9F0E0',
          200: '#F0DDB8',
          300: '#E5C894',
          400: '#D9B87A',
          500: '#C9A96E',
          600: '#B89460',
          700: '#9E7A50',
          800: '#846644',
          900: '#6E553A',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #FFD1DC 0%, #E1D5EA 100%)',
        'gradient-gold': 'linear-gradient(135deg, #F9F0E0 0%, #E5C894 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFF8F0 0%, #FFE8ED 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.06), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(232, 160, 180, 0.15)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
