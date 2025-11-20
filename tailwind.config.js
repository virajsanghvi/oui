/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{ts,tsx,css}", "./stories/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'severity-low': 'hsl(var(--severity-low))',
        'severity-med': 'hsl(var(--severity-med))',
        'severity-high': 'hsl(var(--severity-high))',
        'severity-critical': 'hsl(var(--severity-critical))'
      }
    }
  },
}