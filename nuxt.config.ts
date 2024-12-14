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
  ],

  googleFonts: {
    families: {
      'Golos Text': true,
    },
  },
  colorMode: {
    preference: 'auto',
  },
  devServer: {
    host: '0.0.0.0',
    port: 3100,
  },
  css: ['~/assets/css/fonts.css'],
})
