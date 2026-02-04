/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // InkFlow custom dark theme colors
          bg: {
            primary: '#0a0a0a',      // Pure black background
            secondary: '#1a1a1a',    // Elevated surfaces
            tertiary: '#2a2a2a',     // Card backgrounds
          },
          text: {
            primary: '#ffffff',      // Primary text
            secondary: '#a3a3a3',    // Secondary text
            tertiary: '#737373',     // Disabled/muted text
          },
          accent: {
            primary: '#3b82f6',      // Blue - primary actions
            success: '#10b981',      // Green - success states
            warning: '#f59e0b',      // Amber - warnings
            danger: '#ef4444',       // Red - destructive actions
          },
          border: {
            primary: '#333333',      // Default borders
            focus: '#3b82f6',        // Focus states
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }