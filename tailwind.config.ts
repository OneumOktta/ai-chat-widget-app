import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      Roboto: 'Roboto, sans-serif',
    },
    extend: {
      colors: {
        paleViolet: '#C8A6FF',
        softViolet: '#8D59DF',
        darkViolet: '#3F00A3',
        greyLight: '#495057',
        greyDark: '#333333',
        lightPink: '#FF6CAB',
        lightBlue: '#7366FF',
        light: {
          background: '#E2E3E5',
          text: '#404040',
          panels: '#FAFAFA',
        },

        dark: {
          background: '#363636',
          text: '#FAFAFA',
          panels: '#282828',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(45deg, #FF6CAB, #7366FF)',
        'primary-gradient-alt': 'linear-gradient(225deg, #FF6CAB, #7366FF)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },

    plugins: [],
  },
}

export default config
