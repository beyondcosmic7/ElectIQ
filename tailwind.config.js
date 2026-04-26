/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: { DEFAULT: '#FF9933', light: '#FFB366', dark: '#E67A00' },
        green: { DEFAULT: '#138808', light: '#1DB954', dark: '#0D6B06' },
        navy: { DEFAULT: '#000080', light: '#1A1A8E' },
        cream: { DEFAULT: '#FFF8F0', warm: '#FFF3E4' },
        ink: { DEFAULT: '#1A1A2E', light: '#2D2D44', muted: '#6B6B80' },
        paper: '#FBF7F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        brutal: '12px',
      },
      boxShadow: {
        brutal: '4px 4px 0px #1A1A2E',
        'brutal-sm': '2px 2px 0px #1A1A2E',
        'brutal-lg': '6px 6px 0px #1A1A2E',
        'brutal-saffron': '4px 4px 0px #E67A00',
        'brutal-green': '4px 4px 0px #0D6B06',
      },
    },
  },
  plugins: [],
}
