/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        // Light theme (default)
        primary: {
          DEFAULT: "#4338ca", // Indigo-700
          dark: "#3730a3",
          light: "#6366f1",
        },
        secondary: {
          DEFAULT: "#0d9488", // Teal-600
          dark: "#0f766e",
          light: "#14b8a6",
        },
        accent: {
          DEFAULT: "#f59e0b", // Amber-500
          dark: "#d97706",
          light: "#fbbf24",
        },
        dark: {
          DEFAULT: "#111827", // Gray-900
          darker: "#030712", // Gray-950
          light: "#1f2937", // Gray-800
        },
        light: {
          DEFAULT: "#f3f4f6", // Gray-100
          dark: "#e5e7eb", // Gray-200
          lighter: "#f9fafb", // Gray-50
        },
        muted: "#6b7280", // Gray-500
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #4338ca, #3730a3)',
        'gradient-secondary': 'linear-gradient(to right, #0d9488, #0f766e)',
        'gradient-dark': 'linear-gradient(to right, #111827, #030712)',
        'gradient-accent': 'linear-gradient(to right, #f59e0b, #d97706)',
        'hero-pattern': 'linear-gradient(rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.9)), url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070")',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} 