/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
  	container: {
  		center: true,
  		padding: '1rem'
  	},
  	screens: {
  		xs: '450px',
  		sm: '575px',
  		md: '768px',
  		lg: '992px',
  		xl: '1200px',
  		'2xl': '1400px'
  	},
  	extend: {
  		animation: {
  			marquee: 'marquee 12s linear 2',
  			fadeOut: 'fadeOut 0.8s ease-out forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			marquee: {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			fadeOut: {
  				'0%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				}
  			},
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'hsl(var(--card-foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': 'hsl(var(--muted-foreground))',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-foreground': 'hsl(var(--accent-foreground))',
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-foreground': 'hsl(var(--primary-foreground))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-foreground': 'hsl(var(--secondary-foreground))',
  			current: 'currentColor',
  			transparent: 'transparent',
  			white: '#FFFFFF',
  			black: '#121723',
  			dark: '#1D2430',
  			yellow: '#FBB040',
  			'body-color': '#788293',
  			'body-color-dark': '#959CB1',
  			'gray-dark': '#1E232E',
  			'gray-light': '#F0F2F9',
  			stroke: '#E3E8EF',
  			'stroke-dark': '#353943',
  			'bg-color-dark': '#171C28',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			signUp: '0px 5px 10px rgba(4, 10, 34, 0.2)',
  			one: '0px 2px 3px rgba(7, 7, 77, 0.05)',
  			two: '0px 5px 10px rgba(6, 8, 15, 0.1)',
  			three: '0px 5px 15px rgba(6, 8, 15, 0.05)',
  			sticky: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)',
  			'sticky-dark': 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)',
  			'feature-2': '0px 10px 40px rgba(48, 86, 211, 0.12)',
  			submit: '0px 5px 20px rgba(4, 10, 34, 0.1)',
  			'submit-dark': '0px 5px 20px rgba(4, 10, 34, 0.1)',
  			btn: '0px 1px 2px rgba(4, 10, 34, 0.15)',
  			'btn-hover': '0px 1px 2px rgba(0, 0, 0, 0.15)',
  			'btn-light': '0px 1px 2px rgba(0, 0, 0, 0.1)'
  		},
  		dropShadow: {
  			three: '0px 5px 15px rgba(6, 8, 15, 0.05)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-neon": {
          textShadow:
            "0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14",
        },
        ".text-shadow-neon-hover:hover": {
          textShadow:
            "0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14, 0 0 40px #39ff14",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
