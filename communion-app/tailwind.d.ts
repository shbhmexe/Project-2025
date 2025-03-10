// tailwind.d.ts
import 'tailwindcss/tailwind.css'

declare module 'tailwindcss/tailwind.css' {
  export default any
}

declare module 'tailwindcss' {
  export interface TailwindColors {
    primary: string
    secondary: string
    accent: string
    dark: string
    light: string
  }
} 