
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 90% 50%)',
        accent: 'hsl(275 85% 60%)',
        background: 'hsl(240 18% 12%)',
        surface: 'hsl(240 22% 16%)',
        foreground: 'hsl(0 0% 95%)',
        muted: 'hsl(240 5% 64%)',
        border: 'hsl(240 22% 20%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0,0%,0%,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 240ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 240ms cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
