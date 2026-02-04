/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          bg: {
            primary: '#0a0a0a',
            secondary: '#1a1a1a',
            tertiary: '#2a2a2a',
          },
          text: {
            primary: '#ffffff',
            secondary: '#a3a3a3',
            tertiary: '#737373',
          },
          accent: {
            primary: '#14b8a6',      // Teal - primary actions
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
          },
          border: {
            primary: '#333333',
            focus: '#14b8a6',        // Focus states
          }
        },
      },
    },
    plugins: [],
  }