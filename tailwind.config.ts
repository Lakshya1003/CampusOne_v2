import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#0FB5A4', // Teal
          foreground: '#FFFFFF',
          hover: '#0DA091', // Slightly darker teal for hover
        },
        secondary: {
          DEFAULT: '#0B3D91', // Navy Blue
          foreground: '#FFFFFF',
          hover: '#09327A', // Slightly darker navy for hover
        },
        accent: {
          DEFAULT: '#BEE3F8', // Light Blue
          foreground: '#2D3748', // Dark Gray
        },
        card: {
          DEFAULT: '#FFFFFF', // White
          foreground: '#2D3748', // Dark Gray
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: '#10B981', // Emerald green
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        blue: {
          DEFAULT: '#1E88E5',
          light: '#BEE3F8',
          navy: '#0B3D91',
        },
        teal: {
          DEFAULT: '#0FB5A4',
        },
        gray: {
          dark: '#2D3748',
          soft: '#EDF2F7',
        },
      },
      borderRadius: {
        '2xl': '16px', // Cards
        xl: '12px', // Inputs
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Body
        heading: ['Poppins', 'Inter', 'sans-serif'], // Headline
      },
      boxShadow: {
        subtle: '0 6px 18px rgba(3,12,33,0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config
