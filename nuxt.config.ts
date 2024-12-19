export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.MAIN_BACKEND_URL,
    },
  },

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    display: 'swap',
    families: {
      Roboto: true,
    },
  },
  colorMode: {
    preference: 'auto',
  },
  nitro: {
    routeRules: {
      '/proxy/**': { proxy: 'https://chat-api.esoraine.online/api/v1/**' },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 3100,
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
